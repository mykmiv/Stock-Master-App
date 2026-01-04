-- Create enum for admin roles
CREATE TYPE public.admin_role AS ENUM ('owner', 'admin', 'moderator');

-- Table pour gérer les rôles admin
CREATE TABLE public.admin_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  role admin_role NOT NULL DEFAULT 'moderator',
  permissions JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID
);

-- Enable RLS
ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;

-- Function to check admin role (security definer to avoid recursive RLS)
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_roles
    WHERE user_id = _user_id
  )
$$;

-- Function to check if user is owner
CREATE OR REPLACE FUNCTION public.is_owner(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_roles
    WHERE user_id = _user_id AND role = 'owner'
  )
$$;

-- Admins can view admin roles
CREATE POLICY "Admins can view admin roles"
  ON public.admin_roles FOR SELECT
  USING (public.is_admin(auth.uid()));

-- Only owner can insert admin roles
CREATE POLICY "Only owner can insert admin roles"
  ON public.admin_roles FOR INSERT
  WITH CHECK (public.is_owner(auth.uid()));

-- Only owner can update admin roles
CREATE POLICY "Only owner can update admin roles"
  ON public.admin_roles FOR UPDATE
  USING (public.is_owner(auth.uid()));

-- Only owner can delete admin roles
CREATE POLICY "Only owner can delete admin roles"
  ON public.admin_roles FOR DELETE
  USING (public.is_owner(auth.uid()));

-- Table for educational videos
CREATE TABLE public.educational_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration_minutes INTEGER DEFAULT 5,
  level TEXT NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID
);

-- Enable RLS on educational_videos
ALTER TABLE public.educational_videos ENABLE ROW LEVEL SECURITY;

-- Everyone can view published videos
CREATE POLICY "Anyone can view published videos"
  ON public.educational_videos FOR SELECT
  USING (published = true OR public.is_admin(auth.uid()));

-- Only admins can insert videos
CREATE POLICY "Admins can insert videos"
  ON public.educational_videos FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

-- Only admins can update videos
CREATE POLICY "Admins can update videos"
  ON public.educational_videos FOR UPDATE
  USING (public.is_admin(auth.uid()));

-- Only admins can delete videos
CREATE POLICY "Admins can delete videos"
  ON public.educational_videos FOR DELETE
  USING (public.is_admin(auth.uid()));

-- Trigger for updated_at
CREATE TRIGGER update_educational_videos_updated_at
  BEFORE UPDATE ON public.educational_videos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();