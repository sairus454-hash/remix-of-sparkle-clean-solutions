
-- Revoke public INSERT on reviews - only service_role can insert now
DROP POLICY IF EXISTS "Anyone can submit reviews" ON public.reviews;

CREATE POLICY "Only service role can insert reviews"
ON public.reviews
FOR INSERT
TO service_role
WITH CHECK (true);

-- Add database constraints for defense-in-depth
ALTER TABLE public.reviews ADD CONSTRAINT reviews_name_length
  CHECK (length(name) >= 2 AND length(name) <= 100);

ALTER TABLE public.reviews ADD CONSTRAINT reviews_text_length
  CHECK (length(text) >= 10 AND length(text) <= 1000);

ALTER TABLE public.reviews ADD CONSTRAINT reviews_rating_range
  CHECK (rating >= 1 AND rating <= 5);
