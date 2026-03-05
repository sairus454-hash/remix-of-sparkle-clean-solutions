-- Create rate_limits table for persistent rate limiting across edge function instances
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  function_name text NOT NULL,
  client_ip text NOT NULL,
  request_count integer NOT NULL DEFAULT 1,
  window_start timestamptz NOT NULL DEFAULT now(),
  window_end timestamptz NOT NULL
);

-- Index for fast lookups
CREATE INDEX idx_rate_limits_lookup ON public.rate_limits (function_name, client_ip, window_end);

-- Auto-cleanup: delete expired entries
CREATE OR REPLACE FUNCTION public.cleanup_expired_rate_limits()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.rate_limits WHERE window_end < now();
$$;

-- Rate limit check function: returns true if allowed, false if blocked
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_function_name text,
  p_client_ip text,
  p_max_requests integer,
  p_window_minutes integer
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count integer;
  v_window_start timestamptz;
BEGIN
  -- Cleanup old entries periodically (1% chance per call)
  IF random() < 0.01 THEN
    PERFORM public.cleanup_expired_rate_limits();
  END IF;

  v_window_start := date_trunc('minute', now());

  -- Upsert rate limit record
  INSERT INTO public.rate_limits (function_name, client_ip, request_count, window_start, window_end)
  VALUES (p_function_name, p_client_ip, 1, v_window_start, v_window_start + (p_window_minutes || ' minutes')::interval)
  ON CONFLICT DO NOTHING;

  -- Update if exists and still in window
  UPDATE public.rate_limits
  SET request_count = request_count + 1
  WHERE function_name = p_function_name
    AND client_ip = p_client_ip
    AND window_end > now()
  RETURNING request_count INTO v_count;

  IF v_count IS NULL THEN
    -- No active window, create new
    INSERT INTO public.rate_limits (function_name, client_ip, request_count, window_start, window_end)
    VALUES (p_function_name, p_client_ip, 1, now(), now() + (p_window_minutes || ' minutes')::interval);
    v_count := 1;
  END IF;

  RETURN v_count <= p_max_requests;
END;
$$;

-- Enable RLS but no policies = no direct client access (only via security definer functions)
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;