-- Blog comments: stop exposing the whole table; visitors read only one article's comments through a narrow function
DROP POLICY IF EXISTS "Anyone can view blog comments" ON public.blog_comments;

CREATE OR REPLACE FUNCTION public.get_blog_comments(p_article_id integer)
RETURNS TABLE (id uuid, name text, text text, created_at timestamptz)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT c.id, c.name, c.text, c.created_at
  FROM public.blog_comments c
  WHERE p_article_id IS NOT NULL
    AND p_article_id BETWEEN 1 AND 100000
    AND c.article_id = p_article_id
  ORDER BY c.created_at DESC
  LIMIT 200
$$;

REVOKE ALL ON FUNCTION public.get_blog_comments(integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_blog_comments(integer) TO anon, authenticated, service_role;

-- Item clicks: accept only well-formed click records instead of anything
DROP POLICY IF EXISTS "Anyone can log item clicks" ON public.item_clicks;

CREATE POLICY "Anyone can log valid item clicks"
ON public.item_clicks
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(item_id) BETWEEN 1 AND 120
  AND length(item_name) BETWEEN 1 AND 200
  AND (item_category IS NULL OR length(item_category) <= 80)
  AND action IN ('open', 'add', 'remove')
  AND (price IS NULL OR (price >= 0 AND price <= 100000))
  AND (location IS NULL OR length(location) <= 80)
  AND (language IS NULL OR language IN ('pl', 'ru', 'en', 'uk'))
  AND (page_path IS NULL OR (length(page_path) <= 200 AND left(page_path, 1) = '/'))
);