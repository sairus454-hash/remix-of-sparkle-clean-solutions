-- Create table for booking dates management
CREATE TABLE public.booking_dates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  is_busy boolean NOT NULL DEFAULT true,
  note text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.booking_dates ENABLE ROW LEVEL SECURITY;

-- Anyone can view dates (for the calendar)
CREATE POLICY "Anyone can view booking dates"
ON public.booking_dates
FOR SELECT
USING (true);

-- Only admins can manage dates
CREATE POLICY "Admins can manage booking dates"
ON public.booking_dates
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_booking_dates_updated_at
BEFORE UPDATE ON public.booking_dates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();