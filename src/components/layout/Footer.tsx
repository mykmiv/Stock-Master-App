import { Link } from 'react-router-dom';
import { LineChart, Twitter, MessageCircle, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-12">
      <div className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <LineChart className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">StockMaster</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Stock market education powered by AI.
            </p>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <a href="https://twitter.com/stockmaster" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <a href="https://discord.gg/stockmaster" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <a href="https://github.com/stockmaster" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/pricing" className="hover:text-foreground transition-colors">
                  Plans & Pricing
                </Link>
              </li>
              <li>
                <Link to="/scanner" className="hover:text-foreground transition-colors">
                  AI Scanner
                </Link>
              </li>
              <li>
                <Link to="/learn" className="hover:text-foreground transition-colors">
                  Learning Hub
                </Link>
              </li>
              <li>
                <Link to="/bridge" className="hover:text-foreground transition-colors">
                  Bridge to Real Trading
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/help" className="hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <a href="mailto:support@stockmaster.ai" className="hover:text-foreground transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="mt-8 pt-8 border-t border-border space-y-2">
          <p className="text-sm text-muted-foreground text-center">
            © 2025 StockMaster AI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground text-center max-w-2xl mx-auto">
            ⚠️ Disclaimer: StockMaster is for educational purposes only. Not financial advice. 
            Trading stocks involves risk. Consult a licensed financial advisor.
          </p>
        </div>
      </div>
    </footer>
  );
}
