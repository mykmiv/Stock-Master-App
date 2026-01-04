-- Add RLS policies for admins to manage lessons
CREATE POLICY "Admins can insert lessons"
  ON public.lessons FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update lessons"
  ON public.lessons FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete lessons"
  ON public.lessons FOR DELETE
  USING (public.is_admin(auth.uid()));