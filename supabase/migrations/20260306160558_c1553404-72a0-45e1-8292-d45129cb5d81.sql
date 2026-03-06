
-- Add SELECT policy for admins to view rate limits for monitoring
CREATE POLICY "Admins can view rate limits"
ON public.rate_limits
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));
