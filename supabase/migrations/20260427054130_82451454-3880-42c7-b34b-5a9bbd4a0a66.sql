-- Add unique constraint required for ON CONFLICT in check_rate_limit function
-- First clean up potential duplicates
DELETE FROM public.rate_limits a
USING public.rate_limits b
WHERE a.id < b.id
  AND a.client_ip = b.client_ip
  AND a.function_name = b.function_name;

ALTER TABLE public.rate_limits
  ADD CONSTRAINT rate_limits_client_ip_function_name_key
  UNIQUE (client_ip, function_name);