CREATE POLICY "Only service_role can insert rate_limits"
ON public.rate_limits
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Only service_role can update rate_limits"
ON public.rate_limits
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);