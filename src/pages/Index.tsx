import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/Footer';
import { LineChart, GraduationCap, ScanLine, TrendingUp, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="container py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <LineChart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">StockMaster</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="container py-20 text-center space-y-8">
          <div className="space-y-4 max-w-3xl mx-auto fade-in">
            <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight">
              Learn Stock Trading <br />
              <span className="text-primary">Like a Pro</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The gamified platform that takes you from beginner to confident trader with AI-powered analysis, 
              interactive lessons, and risk-free paper trading.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link to="/auth">
                <Button size="lg" className="gap-2">
                  Start Learning Free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="container py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 rounded-2xl border border-border slide-up">
              <div className="flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
                  <GraduationCap className="h-7 w-7 text-primary-foreground" />
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold">Gamified Learning</h3>
              <p className="text-muted-foreground">
                Bite-sized lessons with XP, badges, and streaks to keep you motivated on your journey.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl border border-border slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-info">
                  <ScanLine className="h-7 w-7 text-info-foreground" />
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold">AI Chart Scanner</h3>
              <p className="text-muted-foreground">
                Upload any chart and get instant AI analysis of patterns, trends, and key levels.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl border border-border slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-success">
                  <TrendingUp className="h-7 w-7 text-success-foreground" />
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold">Paper Trading</h3>
              <p className="text-muted-foreground">
                Practice with $100K virtual money. Learn from mistakes without real risk.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
