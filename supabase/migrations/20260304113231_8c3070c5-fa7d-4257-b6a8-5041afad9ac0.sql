-- Fix admin policies: add WITH CHECK clause to booking_dates, prices, site_content

DROP POLICY IF EXISTS "Admins can manage booking dates" ON public.booking_dates;
CREATE POLICY "Admins can manage booking dates"
ON public.booking_dates FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can manage prices" ON public.prices;
CREATE POLICY "Admins can manage prices"
ON public.prices FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can manage site content" ON public.site_content;
CREATE POLICY "Admins can manage site content"
ON public.site_content FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));