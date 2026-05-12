
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Booking & quote status enums
CREATE TYPE public.booking_status AS ENUM (
  'New Booking','Deposit Paid','Pending Confirmation','Confirmed','Completed','Cancelled'
);
CREATE TYPE public.quote_status AS ENUM (
  'New Request','Needs Review','Quote Sent','Accepted','Declined','Completed'
);

-- Updated-at trigger fn
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- Bookings
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  package_slug TEXT NOT NULL,
  package_name TEXT NOT NULL,
  base_price INTEGER NOT NULL,
  vehicle_size TEXT NOT NULL,
  size_modifier INTEGER NOT NULL DEFAULT 0,
  condition TEXT NOT NULL,
  condition_modifier INTEGER NOT NULL DEFAULT 0,
  vehicle_year TEXT,
  vehicle_make TEXT,
  vehicle_model TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT,
  notes TEXT,
  preferred_date DATE,
  time_window TEXT,
  service_mode TEXT,
  estimated_total INTEGER NOT NULL,
  deposit_amount INTEGER NOT NULL,
  status public.booking_status NOT NULL DEFAULT 'New Booking',
  stripe_session_id TEXT,
  internal_notes TEXT
);
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER bookings_updated BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Anyone can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins view bookings" ON public.bookings
  FOR SELECT USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update bookings" ON public.bookings
  FOR UPDATE USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete bookings" ON public.bookings
  FOR DELETE USING (public.has_role(auth.uid(),'admin'));

-- Booking addons
CREATE TABLE public.booking_addons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  addon_key TEXT NOT NULL,
  addon_label TEXT NOT NULL,
  price INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.booking_addons ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_booking_addons_booking_id ON public.booking_addons(booking_id);

CREATE POLICY "Anyone can add addons" ON public.booking_addons
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins view addons" ON public.booking_addons
  FOR SELECT USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update addons" ON public.booking_addons
  FOR UPDATE USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete addons" ON public.booking_addons
  FOR DELETE USING (public.has_role(auth.uid(),'admin'));

-- Quote requests
CREATE TABLE public.quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  service_needed TEXT NOT NULL,
  asset_type TEXT,
  vehicle_year TEXT,
  vehicle_make TEXT,
  vehicle_model TEXT,
  length_ft TEXT,
  main_goal TEXT,
  timeline TEXT,
  notes TEXT,
  photo_urls TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  status public.quote_status NOT NULL DEFAULT 'New Request',
  internal_notes TEXT
);
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER quotes_updated BEFORE UPDATE ON public.quote_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Anyone can create quote requests" ON public.quote_requests
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins view quotes" ON public.quote_requests
  FOR SELECT USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update quotes" ON public.quote_requests
  FOR UPDATE USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete quotes" ON public.quote_requests
  FOR DELETE USING (public.has_role(auth.uid(),'admin'));

-- Payments
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  stripe_session_id TEXT,
  stripe_payment_intent TEXT,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'cad',
  status TEXT NOT NULL,
  raw JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_payments_booking_id ON public.payments(booking_id);

CREATE POLICY "Admins view payments" ON public.payments
  FOR SELECT USING (public.has_role(auth.uid(),'admin'));

-- Storage bucket for quote photos
INSERT INTO storage.buckets (id, name, public) VALUES ('quote-photos','quote-photos', true);
CREATE POLICY "Quote photos public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'quote-photos');
CREATE POLICY "Anyone can upload quote photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'quote-photos');
