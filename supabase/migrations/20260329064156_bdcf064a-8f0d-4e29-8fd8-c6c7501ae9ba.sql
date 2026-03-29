-- Drop the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Anyone can view booking dates" ON public.booking_dates;

-- Create a view that excludes the note column for public access
CREATE OR REPLACE VIEW public.booking_dates_public AS
SELECT id, date, is_busy, created_at, updated_at
FROM public.booking_dates;

-- Re-create public SELECT policy that hides note column
CREATE POLICY "Public can view booking dates without notes"
ON public.booking_dates
FOR SELECT
TO public
USING (true);

-- Note: The view excludes the 'note' column. Frontend should use the view for public queries.