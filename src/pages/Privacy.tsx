import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LineChart, ArrowLeft } from 'lucide-react';

export default function Privacy() {
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
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: December 28, 2025</p>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section>
              <p className="text-muted-foreground leading-relaxed">
                At StockMaster AI, we take your privacy seriously. This Privacy Policy explains how 
                we collect, use, disclose, and safeguard your information when you use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-medium mb-2">Account Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you create an account, we collect:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>Email address</li>
                <li>Username (optional)</li>
                <li>Profile picture (optional)</li>
                <li>Trading preferences and goals</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">Usage Data</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We automatically collect certain information when you use our Service:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                <li>Lesson progress and quiz scores</li>
                <li>Paper trading activity and portfolio data</li>
                <li>Chart scans and analysis history</li>
                <li>Device information and browser type</li>
                <li>IP address and approximate location</li>
                <li>Pages visited and time spent on the Service</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">Payment Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                Payment processing is handled by Stripe. We do not store your full credit card 
                information on our servers. We only receive confirmation of payment and basic 
                transaction details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the collected information to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide and maintain our Service</li>
                <li>Personalize your learning experience</li>
                <li>Track your progress and award achievements</li>
                <li>Process payments and manage subscriptions</li>
                <li>Send notifications (if opted in)</li>
                <li>Analyze usage patterns to improve the Service</li>
                <li>Respond to your inquiries and provide support</li>
                <li>Detect and prevent fraud or abuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Data Sharing</h2>
              <div className="bg-success/10 border border-success/50 rounded-lg p-4 mb-4">
                <p className="text-success font-medium">✓ We do not sell your personal data</p>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Supabase:</strong> Our database and authentication provider</li>
                <li><strong>Stripe:</strong> Payment processing</li>
                <li><strong>Finnhub:</strong> Market data provider</li>
                <li><strong>OpenAI:</strong> AI-powered chart analysis</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                These third parties are contractually obligated to protect your data and use it 
                only for the purposes we specify.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
                <li>All data is encrypted in transit using TLS/SSL</li>
                <li>Data at rest is encrypted using AES-256</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and authentication for our team</li>
                <li>Secure, SOC 2 compliant hosting infrastructure</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Your Rights (GDPR)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you are in the European Economic Area, you have the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your data</li>
                <li><strong>Right to Portability:</strong> Export your data in a common format</li>
                <li><strong>Right to Object:</strong> Opt out of certain data processing</li>
                <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                To exercise these rights, go to Settings {">"} Account or contact us at{" "}
                <a href="mailto:privacy@stockmaster.ai" className="text-primary hover:underline">
                  privacy@stockmaster.ai
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Essential cookies:</strong> Required for the Service to function</li>
                <li><strong>Authentication cookies:</strong> Keep you logged in</li>
                <li><strong>Preference cookies:</strong> Remember your settings (theme, language)</li>
                <li><strong>Analytics cookies:</strong> Understand how users interact with our Service (opt-out available)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                You can control cookies through your browser settings. Disabling essential cookies 
                may affect the functionality of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal data for as long as your account is active or as needed to 
                provide you with the Service. If you delete your account, we will delete your personal 
                data within 30 days, except for data we are required to retain for legal or business 
                purposes (such as payment records for tax compliance).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Service is not intended for children under 13 years of age. We do not knowingly 
                collect personal information from children under 13. If you are a parent or guardian 
                and believe your child has provided us with personal information, please contact us 
                immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in countries other than your 
                country of residence. We ensure appropriate safeguards are in place to protect your 
                data in compliance with applicable data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the "Last updated" date. 
                You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, 
                please contact us at:
              </p>
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Email:</strong>{" "}
                  <a 
                    href="mailto:privacy@stockmaster.ai" 
                    className="text-primary hover:underline"
                  >
                    privacy@stockmaster.ai
                  </a>
                </p>
                <p>
                  <strong>Data Protection Officer:</strong>{" "}
                  <a 
                    href="mailto:dpo@stockmaster.ai" 
                    className="text-primary hover:underline"
                  >
                    dpo@stockmaster.ai
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 StockMaster AI. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/privacy" className="text-foreground font-medium">Privacy</Link>
            <Link to="/help" className="hover:text-foreground">Help</Link>
            <Link to="/about" className="hover:text-foreground">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
