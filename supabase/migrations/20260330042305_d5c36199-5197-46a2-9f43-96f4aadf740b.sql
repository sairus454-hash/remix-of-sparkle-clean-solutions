-- Add RESTRICTIVE policies to block authenticated non-admin users from INSERT/UPDATE on rate_limits
-- Only service_role should be able to insert/update rate_limits

CREATE POLICY "Deny non-service-role insert on rate_limits"
ON public.rate_limits
AS RESTRICTIVE
FOR INSERT
TO authenticated
WITH CHECK (false);

CREATE POLICY "Deny non-service-role update on rate_limits"
ON public.rate_limits
AS RESTRICTIVE
FOR UPDATE
TO authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "Deny non-service-role delete on rate_limits"
ON public.rate_limits
AS RESTRICTIVE
FOR DELETE
TO authenticated
USING (false);