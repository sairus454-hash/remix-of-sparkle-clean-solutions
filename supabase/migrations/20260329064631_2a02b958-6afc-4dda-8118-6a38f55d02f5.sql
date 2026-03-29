-- Fix 1: Remove public SELECT on booking_dates base table (use view instead)
DROP POLICY IF EXISTS "Public can view booking dates without notes" ON public.booking_dates;

-- Fix 2: Add restrictive deny policy for non-admin authenticated users on rate_limits
CREATE POLICY "Deny non-admin select on rate_limits"
ON public.rate_limits
AS RESTRICTIVE
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));