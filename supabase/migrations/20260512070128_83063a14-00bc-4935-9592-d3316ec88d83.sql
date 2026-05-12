ALTER TABLE public.bookings 
  ADD COLUMN IF NOT EXISTS payment_type text NOT NULL DEFAULT 'deposit',
  ADD COLUMN IF NOT EXISTS subscription_id uuid;

CREATE INDEX IF NOT EXISTS idx_bookings_subscription_id ON public.bookings(subscription_id);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_type ON public.bookings(payment_type);