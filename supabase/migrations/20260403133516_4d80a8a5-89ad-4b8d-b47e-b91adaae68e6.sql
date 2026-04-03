-- Force RLS even for table owner on rate_limits
ALTER TABLE public.rate_limits FORCE ROW LEVEL SECURITY;

-- Explicitly deny anonymous access to rate_limits (defense in depth)
CREATE POLICY "Deny anon access to rate_limits"
ON public.rate_limits
FOR ALL
TO anon
USING (false)
WITH CHECK (false);