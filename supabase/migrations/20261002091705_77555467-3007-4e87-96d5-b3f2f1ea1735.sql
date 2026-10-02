CREATE TABLE public.page_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  page_path text NOT NULL,
  source text NOT NULL DEFAULT 'direct',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer_host text,
  language text,
  device text,
  is_landing boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.page_visits TO anon, authenticated;
GRANT SELECT, DELETE ON public.page_visits TO authenticated;
GRANT ALL ON public.page_visits TO service_role;
ALTER TABLE public.page_visits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can log page visits" ON public.page_visits FOR INSERT TO anon, authenticated WITH CHECK (length(page_path) <= 200 AND length(session_id) <= 64);
CREATE POLICY "Admins can view page visits" ON public.page_visits FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete page visits" ON public.page_visits FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE INDEX page_visits_created_at_idx ON public.page_visits (created_at DESC);