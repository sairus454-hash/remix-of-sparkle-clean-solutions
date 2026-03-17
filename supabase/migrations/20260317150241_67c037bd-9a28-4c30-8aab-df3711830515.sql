-- Remove the overly permissive public INSERT policy on blog_comments
DROP POLICY IF EXISTS "Anyone can insert blog comments" ON public.blog_comments;

-- Only service_role (edge function) can insert comments
CREATE POLICY "Only service role can insert blog comments"
ON public.blog_comments
FOR INSERT
TO service_role
WITH CHECK (true);
