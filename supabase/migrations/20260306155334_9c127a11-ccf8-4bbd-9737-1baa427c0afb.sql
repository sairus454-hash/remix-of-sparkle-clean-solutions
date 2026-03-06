-- Add RLS policies for rate_limits table
-- Only admins can directly access rate_limits; edge functions use SECURITY DEFINER functions which bypass RLS

CREATE POLICY "Admins can manage rate limits"
ON public.rate_limits
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
