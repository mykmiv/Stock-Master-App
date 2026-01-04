import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LineChart, ArrowLeft } from 'lucide-react';

export default function Terms() {
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

      <main className="container py-12 max-w-4xl">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: December 28, 2025</p>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using StockMaster AI ("the Service"), you agree to be bound by these 
                Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our 
                Service. We reserve the right to update these Terms at any time, and your continued 
                use of the Service constitutes acceptance of any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                StockMaster AI is an educational platform designed to help users learn about stock 
                market investing and trading. The Service includes:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                <li>Educational lessons and courses on stock trading</li>
                <li>AI-powered chart analysis tools</li>
                <li>Paper trading simulator with virtual money</li>
                <li>Progress tracking, badges, and gamification features</li>
                <li>Resources for transitioning to real trading</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              <h3 className="text-xl font-medium mb-2">Account Creation</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To access certain features of the Service, you must create an account. You agree to 
                provide accurate, current, and complete information during registration and to update 
                such information as necessary.
              </p>
              <h3 className="text-xl font-medium mb-2">Security Responsibilities</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You are responsible for maintaining the confidentiality of your account credentials 
                and for all activities that occur under your account. You agree to notify us immediately 
                of any unauthorized use of your account.
              </p>
              <h3 className="text-xl font-medium mb-2">Account Termination</h3>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to suspend or terminate your account at any time for violation of 
                these Terms or for any other reason at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Educational Purpose Disclaimer</h2>
              <div className="bg-warning/10 border border-warning/50 rounded-lg p-4 mb-4">
                <p className="text-warning font-medium">⚠️ Important Notice</p>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>StockMaster AI is for educational purposes only and does not constitute 
                financial advice.</strong> The information provided through our Service should not be 
                construed as personalized investment recommendations.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>All trading on our platform is simulated (paper trading) and does not involve real money</li>
                <li>Past performance of any trading strategy does not guarantee future results</li>
                <li>You should consult a licensed financial advisor before making real investment decisions</li>
                <li>We are not registered as a broker-dealer or investment advisor</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Subscription & Billing</h2>
              <h3 className="text-xl font-medium mb-2">Plans & Pricing</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We offer various subscription plans with different features and pricing. Current 
                pricing is available on our Pricing page. Prices are subject to change with notice.
              </p>
              <h3 className="text-xl font-medium mb-2">Cancellation Policy</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may cancel your subscription at any time through your account settings. Upon 
                cancellation, you will retain access to paid features until the end of your current 
                billing period.
              </p>
              <h3 className="text-xl font-medium mb-2">Refund Policy</h3>
              <p className="text-muted-foreground leading-relaxed">
                We offer a 7-day money-back guarantee on all paid plans. If you are not satisfied 
                with our Service, contact us within 7 days of your purchase for a full refund, 
                no questions asked.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. User Conduct</h2>
              <h3 className="text-xl font-medium mb-2">Prohibited Activities</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Use the Service for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Share your account credentials with others</li>
                <li>Scrape, copy, or redistribute our content without permission</li>
                <li>Use automated systems to access the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
              <h3 className="text-xl font-medium mb-2">Our Content</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All content on StockMaster AI, including text, graphics, logos, images, and software, 
                is the property of StockMaster AI or its content suppliers and is protected by 
                intellectual property laws.
              </p>
              <h3 className="text-xl font-medium mb-2">User Content</h3>
              <p className="text-muted-foreground leading-relaxed">
                Any content you submit to the Service remains your property. By submitting content, 
                you grant us a non-exclusive license to use, display, and distribute such content 
                in connection with the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, StockMaster AI shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages, including but not 
                limited to loss of profits, data, or other intangible losses, resulting from your 
                use of or inability to use the Service. Our total liability shall not exceed the 
                amount you paid us in the 12 months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may modify these Terms at any time by posting the revised Terms on this page. 
                Your continued use of the Service after any changes indicates your acceptance of 
                the new Terms. We encourage you to review these Terms periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="mt-4">
                <a 
                  href="mailto:legal@stockmaster.ai" 
                  className="text-primary hover:underline"
                >
                  legal@stockmaster.ai
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 StockMaster AI. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/terms" className="text-foreground font-medium">Terms</Link>
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/help" className="hover:text-foreground">Help</Link>
            <Link to="/about" className="hover:text-foreground">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
