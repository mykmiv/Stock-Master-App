-- Create portfolio_snapshots table to track portfolio value over time
CREATE TABLE public.portfolio_snapshots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  portfolio_id UUID NOT NULL REFERENCES public.portfolios(id) ON DELETE CASCADE,
  total_value NUMERIC NOT NULL,
  cash_balance NUMERIC NOT NULL,
  invested_value NUMERIC NOT NULL,
  snapshot_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique constraint to allow only one snapshot per portfolio per day
CREATE UNIQUE INDEX idx_portfolio_snapshots_unique ON public.portfolio_snapshots(portfolio_id, snapshot_date);

-- Enable RLS
ALTER TABLE public.portfolio_snapshots ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own snapshots
CREATE POLICY "Users can view their own portfolio snapshots"
ON public.portfolio_snapshots
FOR SELECT
USING (
  portfolio_id IN (
    SELECT id FROM public.portfolios WHERE user_id = auth.uid()
  )
);

-- Create policy for users to insert their own snapshots
CREATE POLICY "Users can insert their own portfolio snapshots"
ON public.portfolio_snapshots
FOR INSERT
WITH CHECK (
  portfolio_id IN (
    SELECT id FROM public.portfolios WHERE user_id = auth.uid()
  )
);

-- Create policy for users to update their own snapshots (for upsert)
CREATE POLICY "Users can update their own portfolio snapshots"
ON public.portfolio_snapshots
FOR UPDATE
USING (
  portfolio_id IN (
    SELECT id FROM public.portfolios WHERE user_id = auth.uid()
  )
);