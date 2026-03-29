-- Add a function to hash client IPs before storing them
CREATE OR REPLACE FUNCTION public.hash_ip(ip text)
RETURNS text
LANGUAGE sql
IMMUTABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT encode(sha256(convert_to(ip || 'masterclean_salt_2024', 'UTF8')), 'hex')
$$;

-- Update existing IPs to hashed versions
UPDATE public.rate_limits
SET client_ip = public.hash_ip(client_ip)
WHERE client_ip NOT LIKE 'hashed_%' AND length(client_ip) < 64;