-- Fix: recreate view with security_invoker to avoid SECURITY DEFINER issue
DROP VIEW IF EXISTS public.booking_dates_public;

CREATE VIEW public.booking_dates_public
WITH (security_invoker=on) AS
SELECT id, date, is_busy, created_at, updated_at
FROM public.booking_dates;