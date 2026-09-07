CREATE TABLE public.item_clicks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  item_id text NOT NULL,
  item_name text NOT NULL,
  item_category text,
  price numeric,
  action text NOT NULL DEFAULT 'open',
  location text,
  page_path text,
  language text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.item_clicks TO anon;
GRANT INSERT, SELECT ON public.item_clicks TO authenticated;
GRANT ALL ON public.item_clicks TO service_role;

ALTER TABLE public.item_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log item clicks"
  ON public.item_clicks FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view item clicks"
  ON public.item_clicks FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete item clicks"
  ON public.item_clicks FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_item_clicks_created_at ON public.item_clicks (created_at DESC);
CREATE INDEX idx_item_clicks_item ON public.item_clicks (item_id);