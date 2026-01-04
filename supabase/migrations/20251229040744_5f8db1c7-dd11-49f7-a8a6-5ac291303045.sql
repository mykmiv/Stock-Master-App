-- Enable required extensions for cron jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create monthly functions to replace weekly ones
CREATE OR REPLACE FUNCTION public.get_current_month_number()
 RETURNS integer
 LANGUAGE sql
 STABLE
AS $function$
  SELECT (EXTRACT(YEAR FROM CURRENT_DATE)::INTEGER * 12) + EXTRACT(MONTH FROM CURRENT_DATE)::INTEGER;
$function$;

CREATE OR REPLACE FUNCTION public.get_month_start_date()
 RETURNS date
 LANGUAGE sql
 STABLE
AS $function$
  SELECT DATE_TRUNC('month', CURRENT_DATE)::DATE;
$function$;