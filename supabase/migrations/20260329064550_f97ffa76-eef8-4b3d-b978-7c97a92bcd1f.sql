DROP FUNCTION IF EXISTS public.check_rate_limit(text, text, integer, integer);

CREATE FUNCTION public.check_rate_limit(
  p_client_ip text,
  p_function_name text,
  p_max_requests integer,
  p_window_minutes integer
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_hashed_ip text;
  v_count integer;
  v_window_start timestamptz;
BEGIN
  v_hashed_ip := public.hash_ip(p_client_ip);
  v_window_start := now() - (p_window_minutes || ' minutes')::interval;

  DELETE FROM public.rate_limits WHERE window_start < v_window_start;

  SELECT COALESCE(SUM(request_count), 0) INTO v_count
  FROM public.rate_limits
  WHERE client_ip = v_hashed_ip
    AND function_name = p_function_name
    AND window_start >= v_window_start;

  IF v_count >= p_max_requests THEN
    RETURN false;
  END IF;

  INSERT INTO public.rate_limits (client_ip, function_name, request_count, window_start, window_end)
  VALUES (v_hashed_ip, p_function_name, 1, now(), now() + (p_window_minutes || ' minutes')::interval)
  ON CONFLICT (client_ip, function_name)
  DO UPDATE SET request_count = rate_limits.request_count + 1, window_start = now(), window_end = now() + (p_window_minutes || ' minutes')::interval;

  RETURN true;
END;
$$;