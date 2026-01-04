import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Search, ArrowLeft, ExternalLink, MessageCircle, Mail } from 'lucide-react';

const helpCategories = [
  {
    icon: '🎓',
    title: 'Getting Started',
    description: 'First steps with StockMaster',
    articles: 8,
  },
  {
    icon: '🔍',
    title: 'AI Scanner',
    description: 'How to use the chart scanner',
    articles: 12,
  },
  {
    icon: '📚',
    title: 'Learning System',
    description: 'Lessons, quizzes and progression',
    articles: 6,
  },
  {
    icon: '💼',
    title: 'Paper Trading',
    description: 'Trading simulator guide',
    articles: 10,
  },
  {
    icon: '💳',
    title: 'Billing & Subscription',
    description: 'Plans, payments and invoices',
    articles: 7,
  },
  {
    icon: '🔒',
    title: 'Account & Security',
    description: 'Manage your account',
    articles: 5,
  },
];

const faqData = {
  general: [
    {
      q: 'Is StockMaster free to use?',
      a: "Yes! We offer a generous free plan with 5 chart scans per month and access to all Beginner lessons. To unlock all features, explore our paid plans starting at $4.99/week.",
    },
    {
      q: 'Can I trade with real money on StockMaster?',
      a: "No, StockMaster is an educational platform with a paper trading simulator. We guide you toward real brokers via our 'Go Real' section when you're ready.",
    },
    {
      q: 'How does the AI Scanner work?',
      a: 'Upload a screenshot of any stock chart, and our AI analyzes technical patterns, detects the ticker symbol, fetches live data, and provides an educational recommendation with a confidence score.',
    },
    {
      q: 'What markets does StockMaster cover?',
      a: 'We focus exclusively on US stock markets (NYSE, NASDAQ) to provide maximum depth and quality of analysis. We do not cover crypto, forex, or international markets.',
    },
  ],
  scanner: [
    {
      q: 'What image formats are accepted?',
      a: 'We accept PNG, JPG, and JPEG files up to 10MB. Make sure your chart is clear and readable for the best analysis results.',
    },
    {
      q: "Why isn't my ticker being detected?",
      a: "If the ticker symbol isn't visible on the chart image, you can enter it manually in the provided field. This improves the quality and accuracy of the analysis.",
    },
    {
      q: 'What does the confidence score mean?',
      a: "It's a reliability measure from 0-100%. Above 80% means very reliable analysis. Below 50% typically indicates the image needs to be clearer or higher quality.",
    },
    {
      q: 'How many scans can I do per month?',
      a: 'Free users get 5 scans per month. Starter plan gets 30 scans, Pro gets 100 scans, and Elite gets unlimited scans. Scans reset on the 1st of each month.',
    },
  ],
  learning: [
    {
      q: 'How do I unlock Intermediate and Advanced lessons?',
      a: 'Complete all Beginner lessons and accumulate 500 XP to unlock Intermediate. Reach 2000 XP to unlock Advanced lessons.',
    },
    {
      q: 'What happens if I fail a quiz?',
      a: "You can retry immediately. You need a score of at least 70% to pass and earn the XP reward. There's no penalty for failing.",
    },
    {
      q: 'How is XP calculated?',
      a: 'You earn XP by completing lessons (10-50 XP each), passing quizzes (bonus for high scores), maintaining streaks (daily bonus), and earning badges (varies by achievement).',
    },
    {
      q: 'What are the level requirements?',
      a: 'Beginner: 0-499 XP, Intermediate: 500-1999 XP, Advanced: 2000+ XP. Your level determines which lessons you can access and unlocks certain features.',
    },
  ],
  trading: [
    {
      q: 'How does paper trading work?',
      a: "You start with $100,000 in virtual money. You can buy and sell real stocks at live prices, but no real money is involved. It's a risk-free way to practice trading strategies.",
    },
    {
      q: 'Are the stock prices real?',
      a: 'Yes! We use live market data from Finnhub. Prices are real but delayed by 15 minutes for free users. Premium users get real-time quotes.',
    },
    {
      q: 'Can I reset my portfolio?',
      a: "Yes, you can reset your portfolio to $100,000 in Settings > Trading > Reset Portfolio. This will delete all your trade history and can't be undone.",
    },
    {
      q: 'What order types are supported?',
      a: 'We support Market orders, Limit orders, Stop-Loss orders, and Trailing Stop orders. More advanced order types may be added in the future.',
    },
  ],
  billing: [
    {
      q: 'How do I cancel my subscription?',
      a: 'Go to Settings > Account > Manage Subscription. You can cancel anytime with no questions asked. Your access continues until the end of the billing period.',
    },
    {
      q: 'Do you offer refunds?',
      a: 'Yes! We offer a 7-day money-back guarantee on all paid plans, no questions asked. Contact support@stockmaster.ai to request a refund.',
    },
    {
      q: 'Is there a student discount?',
      a: 'Absolutely! Students get 50% off with a valid .edu email address. Contact support@stockmaster.ai with your student email to receive the discount code.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards (Visa, Mastercard, American Express) and debit cards through our secure Stripe payment processor.',
    },
  ],
};

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');

  const allFaqs = Object.entries(faqData).flatMap(([category, questions]) =>
    questions.map((q) => ({ ...q, category }))
  );

  const filteredFaqs = searchQuery
    ? allFaqs.filter(
        (faq) =>
          faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

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
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            How can we help you?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions or contact our support team
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="max-w-xl mx-auto text-left mt-4">
              {filteredFaqs.length > 0 ? (
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Found {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''}
                    </p>
                    <Accordion type="single" collapsible>
                      {filteredFaqs.slice(0, 5).map((faq, idx) => (
                        <AccordionItem key={idx} value={`search-${idx}`}>
                          <AccordionTrigger className="text-left">
                            {faq.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">
                      No results found for "{searchQuery}"
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Try different keywords or browse the categories below
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* Help Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {helpCategories.map((category) => (
              <Card
                key={category.title}
                className="hover:border-primary/50 transition-colors cursor-pointer group"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{category.icon}</span>
                    <div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {category.title}
                      </CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                      <p className="text-sm text-muted-foreground mt-2">
                        {category.articles} articles
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

          <Tabs defaultValue="general">
            <TabsList className="flex flex-wrap gap-2 h-auto mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="scanner">AI Scanner</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
              <TabsTrigger value="trading">Paper Trading</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>

            {Object.entries(faqData).map(([category, questions]) => (
              <TabsContent key={category} value={category}>
                <Card>
                  <CardContent className="pt-6">
                    <Accordion type="single" collapsible className="w-full">
                      {questions.map((faq, idx) => (
                        <AccordionItem key={idx} value={`${category}-${idx}`}>
                          <AccordionTrigger className="text-left font-medium">
                            {faq.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Contact Section */}
        <section>
          <Card className="bg-gradient-to-br from-primary/10 via-transparent to-primary/5">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Still need help?</CardTitle>
              <CardDescription className="text-base">
                Our support team is here to assist you!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 max-w-2xl mx-auto">
                <Button variant="outline" size="lg" className="h-auto py-4" asChild>
                  <a href="mailto:support@stockmaster.ai">
                    <Mail className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Email Support</div>
                      <div className="text-sm text-muted-foreground">
                        support@stockmaster.ai
                      </div>
                    </div>
                  </a>
                </Button>

                <Button variant="outline" size="lg" className="h-auto py-4" asChild>
                  <a href="https://discord.gg/stockmaster" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Discord Community</div>
                      <div className="text-sm text-muted-foreground">
                        Join our community
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Average response time: 24 hours
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 StockMaster AI. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/about" className="hover:text-foreground">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
