
CREATE TABLE public.blog_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id integer NOT NULL,
  name text NOT NULL,
  text text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view blog comments" ON public.blog_comments
  FOR SELECT TO public USING (true);

CREATE POLICY "Anyone can insert blog comments" ON public.blog_comments
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Admins can manage blog comments" ON public.blog_comments
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
