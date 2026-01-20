import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, ArrowLeft, Target, Sparkles } from 'lucide-react';

const features = [
  {
    icon: '🤖',
    title: 'AI Scanner v2.0',
    description: 'Chart analysis with live data and automatic ticker recognition',
  },
  {
    icon: '🎓',
    title: 'Human-Reviewed Content',
    description: '50+ lessons verified by experienced traders',
  },
  {
    icon: '💰',
    title: 'Ethical Pricing',
    description: 'Transparent plans from $4.99/week, generous free tier, 7-day refund',
  },
  {
    icon: '📊',
    title: 'Stocks Focus',
    description: 'Maximum depth on the stock market (no crypto/forex)',
  },
  {
    icon: '🎮',
    title: 'Gamification',
    description: 'XP, badges, and levels to keep you motivated',
  },
];

const stats = [
  { value: '1,234', label: 'Active Users' },
  { value: '5,678', label: 'Charts Analyzed' },
  { value: '50+', label: 'Lessons Available' },
  { value: '4.8★', label: 'Average Rating' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <LineChart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">StockMaster</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-12 mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl mx-auto leading-tight">
            Stock education,{' '}
            <span className="text-primary">reimagined</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            StockMaster combines cutting-edge AI and proven pedagogy to help you
            master stock trading.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-gradient-to-br from-primary/10 via-transparent to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Target className="h-6 w-6 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Democratize stock market education with accessible AI tools,
                  structured learning paths, and a bridge to real trading. We believe
                  everyone deserves the knowledge to build wealth.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-bl from-primary/10 via-transparent to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Sparkles className="h-6 w-6 text-primary" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Become the #1 platform for learning stock trading, with 1 million
                  trained users by 2027. We aim to transform beginners into
                  confident, informed investors.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">What Makes Us Different</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine the best of AI technology with human expertise to create
              a unique learning experience.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <span className="text-5xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
            <CardContent className="py-12">
              <div className="grid gap-8 grid-cols-2 md:grid-cols-4 text-center">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm md:text-base text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold">Who We Are</h2>
            <p className="text-lg text-muted-foreground">
              StockMaster is built by passionate finance and tech enthusiasts who
              believe that stock market education should be accessible to everyone,
              not just Wall Street insiders.
            </p>
            <p className="text-muted-foreground italic">
              Currently a team of 1, but growing! 🚀
            </p>
            <div className="pt-4">
              <Button variant="outline" asChild>
                <a href="mailto:careers@stockmaster.ai">
                  Join Our Team
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <Card className="bg-primary text-primary-foreground text-center">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Your Trading Journey?
              </h2>
              <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
                Join thousands of learners who are mastering the stock market with
                StockMaster. Start for free today.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/auth">Get Started Free</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 StockMaster AI. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/help" className="hover:text-foreground">Help</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
