
-- 1) booking_addons: tighten INSERT
DROP POLICY IF EXISTS "Anyone can add addons" ON public.booking_addons;
CREATE POLICY "Add addons to recent bookings"
  ON public.booking_addons
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.bookings b
      WHERE b.id = booking_addons.booking_id
        AND b.created_at > now() - interval '15 minutes'
    )
  );

-- 2) payments: explicit admin-only write policies (service role bypasses RLS)
CREATE POLICY "Admins insert payments"
  ON public.payments
  FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins update payments"
  ON public.payments
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins delete payments"
  ON public.payments
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 3) quote-photos storage bucket policies
CREATE POLICY "Public read quote photos"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'quote-photos');

CREATE POLICY "Admins update quote photos"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'quote-photos' AND public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (bucket_id = 'quote-photos' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins delete quote photos"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'quote-photos' AND public.has_role(auth.uid(), 'admin'::public.app_role));

-- 4) Replace WITH CHECK (true) on public-facing INSERTs with basic validation
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;
CREATE POLICY "Anyone can create bookings"
  ON public.bookings
  FOR INSERT
  WITH CHECK (
    length(btrim(first_name)) > 0
    AND length(btrim(last_name)) > 0
    AND length(btrim(phone)) > 0
    AND length(btrim(email)) > 0
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(btrim(package_slug)) > 0
    AND base_price >= 0
    AND estimated_total >= 0
    AND deposit_amount >= 0
  );

DROP POLICY IF EXISTS "Anyone can create quote requests" ON public.quote_requests;
CREATE POLICY "Anyone can create quote requests"
  ON public.quote_requests
  FOR INSERT
  WITH CHECK (
    length(btrim(name)) > 0
    AND length(btrim(phone)) > 0
    AND length(btrim(email)) > 0
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(btrim(service_needed)) > 0
  );
