-- Create user experience levels enum
CREATE TYPE public.user_level AS ENUM ('beginner', 'intermediate', 'advanced');

-- Create order types enum
CREATE TYPE public.order_type AS ENUM ('market', 'limit', 'stop_loss', 'trailing_stop');

-- Create order status enum
CREATE TYPE public.order_status AS ENUM ('pending', 'executed', 'cancelled');

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  avatar_url TEXT,
  level user_level DEFAULT 'beginner',
  xp INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  last_activity_date DATE,
  onboarding_completed BOOLEAN DEFAULT false,
  readiness_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user badges table
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Create lessons table
CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  level user_level NOT NULL,
  order_index INTEGER NOT NULL,
  xp_reward INTEGER DEFAULT 10,
  duration_minutes INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user lesson progress table
CREATE TABLE public.user_lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  quiz_score INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, lesson_id)
);

-- Create virtual portfolios table
CREATE TABLE public.portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  cash_balance DECIMAL(12,2) DEFAULT 100000.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create stock holdings table
CREATE TABLE public.holdings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID NOT NULL REFERENCES public.portfolios(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  shares DECIMAL(12,4) NOT NULL,
  average_cost DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(portfolio_id, symbol)
);

-- Create trades history table
CREATE TABLE public.trades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID NOT NULL REFERENCES public.portfolios(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  order_type order_type NOT NULL,
  side TEXT NOT NULL CHECK (side IN ('buy', 'sell')),
  shares DECIMAL(12,4) NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  total_value DECIMAL(12,2) NOT NULL,
  status order_status DEFAULT 'executed',
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create watchlists table
CREATE TABLE public.watchlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'My Watchlist',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create watchlist items table
CREATE TABLE public.watchlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  watchlist_id UUID NOT NULL REFERENCES public.watchlists(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(watchlist_id, symbol)
);

-- Create chart analyses table for AI scanner results
CREATE TABLE public.chart_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT,
  analysis_result JSONB,
  patterns_found TEXT[],
  trend TEXT,
  support_levels DECIMAL[],
  resistance_levels DECIMAL[],
  recommendation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watchlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watchlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chart_analyses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_badges
CREATE POLICY "Users can view own badges" ON public.user_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own badges" ON public.user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for lessons (public read)
CREATE POLICY "Anyone can view lessons" ON public.lessons FOR SELECT USING (true);

-- RLS Policies for user_lesson_progress
CREATE POLICY "Users can view own progress" ON public.user_lesson_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON public.user_lesson_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.user_lesson_progress FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for portfolios
CREATE POLICY "Users can view own portfolio" ON public.portfolios FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own portfolio" ON public.portfolios FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own portfolio" ON public.portfolios FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for holdings
CREATE POLICY "Users can view own holdings" ON public.holdings FOR SELECT 
  USING (portfolio_id IN (SELECT id FROM public.portfolios WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert own holdings" ON public.holdings FOR INSERT 
  WITH CHECK (portfolio_id IN (SELECT id FROM public.portfolios WHERE user_id = auth.uid()));
CREATE POLICY "Users can update own holdings" ON public.holdings FOR UPDATE 
  USING (portfolio_id IN (SELECT id FROM public.portfolios WHERE user_id = auth.uid()));
CREATE POLICY "Users can delete own holdings" ON public.holdings FOR DELETE 
  USING (portfolio_id IN (SELECT id FROM public.portfolios WHERE user_id = auth.uid()));

-- RLS Policies for trades
CREATE POLICY "Users can view own trades" ON public.trades FOR SELECT 
  USING (portfolio_id IN (SELECT id FROM public.portfolios WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert own trades" ON public.trades FOR INSERT 
  WITH CHECK (portfolio_id IN (SELECT id FROM public.portfolios WHERE user_id = auth.uid()));

-- RLS Policies for watchlists
CREATE POLICY "Users can view own watchlists" ON public.watchlists FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own watchlists" ON public.watchlists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own watchlists" ON public.watchlists FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own watchlists" ON public.watchlists FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for watchlist_items
CREATE POLICY "Users can view own watchlist items" ON public.watchlist_items FOR SELECT 
  USING (watchlist_id IN (SELECT id FROM public.watchlists WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert own watchlist items" ON public.watchlist_items FOR INSERT 
  WITH CHECK (watchlist_id IN (SELECT id FROM public.watchlists WHERE user_id = auth.uid()));
CREATE POLICY "Users can delete own watchlist items" ON public.watchlist_items FOR DELETE 
  USING (watchlist_id IN (SELECT id FROM public.watchlists WHERE user_id = auth.uid()));

-- RLS Policies for chart_analyses
CREATE POLICY "Users can view own analyses" ON public.chart_analyses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own analyses" ON public.chart_analyses FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (user_id, username)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'username');
  
  -- Create portfolio with starting capital
  INSERT INTO public.portfolios (user_id)
  VALUES (NEW.id);
  
  -- Create default watchlist
  INSERT INTO public.watchlists (user_id, name)
  VALUES (NEW.id, 'My Watchlist');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_portfolios_updated_at BEFORE UPDATE ON public.portfolios FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_holdings_updated_at BEFORE UPDATE ON public.holdings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert placeholder lessons
INSERT INTO public.lessons (title, description, content, level, order_index, xp_reward, duration_minutes) VALUES
-- Beginner lessons
('What is the Stock Market?', 'Understanding the basics of stock markets and how they work', 'The stock market is a collection of exchanges where stocks are bought and sold. Learn the fundamentals of how companies raise capital and how investors participate.', 'beginner', 1, 15, 5),
('Understanding Stock Prices', 'Learn how stock prices are determined and what influences them', 'Stock prices are determined by supply and demand. When more people want to buy a stock than sell it, the price goes up, and vice versa.', 'beginner', 2, 15, 5),
('Types of Stocks', 'Explore different categories of stocks and their characteristics', 'Stocks can be classified into various categories: growth stocks, value stocks, dividend stocks, blue-chip stocks, and more.', 'beginner', 3, 15, 5),
('Reading Stock Quotes', 'Learn how to read and understand stock quotes and tickers', 'A stock quote provides key information about a stock including price, volume, market cap, P/E ratio, and more.', 'beginner', 4, 15, 5),
('Your First Investment', 'Step-by-step guide to making your first stock purchase', 'Learn the process of buying stocks, from choosing a broker to placing your first order.', 'beginner', 5, 20, 6),
-- Intermediate lessons
('Technical Analysis Basics', 'Introduction to reading charts and patterns', 'Technical analysis involves studying price charts and patterns to predict future price movements.', 'intermediate', 1, 25, 7),
('Support and Resistance', 'Understanding key price levels', 'Support and resistance levels are key concepts in technical analysis that help identify potential entry and exit points.', 'intermediate', 2, 25, 7),
('Moving Averages', 'Using moving averages for trend analysis', 'Moving averages smooth out price data to help identify trends and potential reversals.', 'intermediate', 3, 25, 7),
('Volume Analysis', 'Understanding trading volume and its significance', 'Volume is a key indicator that confirms price movements and indicates the strength of a trend.', 'intermediate', 4, 25, 7),
('Risk Management', 'Protecting your portfolio from losses', 'Learn essential risk management techniques including position sizing, stop losses, and diversification.', 'intermediate', 5, 30, 8),
-- Advanced lessons
('Chart Patterns', 'Master complex chart patterns', 'Learn to identify and trade head and shoulders, double tops/bottoms, triangles, and other patterns.', 'advanced', 1, 35, 8),
('Candlestick Patterns', 'Understanding Japanese candlestick signals', 'Japanese candlestick patterns provide powerful signals about potential price reversals and continuations.', 'advanced', 2, 35, 8),
('Options Basics', 'Introduction to stock options', 'Options give you the right, but not the obligation, to buy or sell stocks at a predetermined price.', 'advanced', 3, 40, 10),
('Building a Trading Strategy', 'Creating your own systematic approach', 'Learn how to develop, backtest, and implement a consistent trading strategy.', 'advanced', 4, 40, 10),
('Psychology of Trading', 'Mastering your emotions for better results', 'Trading psychology is often what separates successful traders from unsuccessful ones.', 'advanced', 5, 45, 10);