-- Add learning path columns to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS learning_path text,
ADD COLUMN IF NOT EXISTS learning_path_description text,
ADD COLUMN IF NOT EXISTS total_lessons_in_path integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS lessons_per_day integer DEFAULT 4,
ADD COLUMN IF NOT EXISTS estimated_completion_days integer,
ADD COLUMN IF NOT EXISTS started_learning_at timestamp with time zone;

-- Add personalized path columns to user_lesson_progress
ALTER TABLE public.user_lesson_progress 
ADD COLUMN IF NOT EXISTS order_in_path integer,
ADD COLUMN IF NOT EXISTS day_number integer,
ADD COLUMN IF NOT EXISTS position_in_day integer,
ADD COLUMN IF NOT EXISTS is_locked boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS unlocked_at timestamp with time zone;

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_user_lesson_progress_path ON public.user_lesson_progress(user_id, order_in_path);
CREATE INDEX IF NOT EXISTS idx_user_lesson_progress_day ON public.user_lesson_progress(user_id, day_number, position_in_day);
CREATE INDEX IF NOT EXISTS idx_profiles_learning_path ON public.profiles(learning_path);