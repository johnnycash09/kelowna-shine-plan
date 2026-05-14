CREATE TABLE public.magic_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token text NOT NULL UNIQUE,
  purpose text NOT NULL CHECK (purpose IN ('portal','maintenance_booking')),
  email text NOT NULL,
  subscription_id uuid,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_magic_links_token ON public.magic_links(token);
CREATE INDEX idx_magic_links_email ON public.magic_links(email);
ALTER TABLE public.magic_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage magic links" ON public.magic_links
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));