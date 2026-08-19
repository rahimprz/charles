import { SiteHeader } from '@/components/site-header'
import { NewsletterFooter } from '@/components/newsletter-footer'
import { ChevronRight, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-gold selection:text-primary-foreground">
      <SiteHeader />

      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-border/60 bg-parchment/60 py-10 sm:py-14">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-12">
            <nav className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <ChevronRight className="size-3" />
              <span className="text-ink font-semibold">Privacy Policy</span>
            </nav>

            <div className="mt-4 flex items-center gap-2">
              <ShieldCheck className="size-4 text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                Legal & Trust
              </span>
            </div>

            <h1 className="mt-2 font-serif text-3xl font-medium text-ink sm:text-4xl md:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-2 text-xs text-muted-foreground">
              Last updated: January 2025 • Charles David Tebbs Author Official Website
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 md:px-12">
            <div className="rounded-2xl border border-border bg-card p-8 sm:p-12 space-y-8 text-sm leading-relaxed text-foreground/85">
              <div>
                <h2 className="font-serif text-xl font-bold text-ink sm:text-2xl">
                  1. Information We Collect
                </h2>
                <p className="mt-3">
                  This website is the official author portal for Charles David Tebbs (&quot;David&quot;). We only collect information that you voluntarily provide to us when you:
                </p>
                <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Subscribe to David&apos;s author newsletter (email address).</li>
                  <li>Submit reader feedback, questions, or review inquiries via our contact forms (name, email address, optional website URL, and message contents).</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-ink sm:text-2xl">
                  2. How We Use Your Information
                </h2>
                <p className="mt-3">
                  We use your information exclusively to:
                </p>
                <ul className="mt-2 list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Send newsletter updates regarding new book releases, excerpts, and author announcements.</li>
                  <li>Respond directly to reader inquiries and feedback.</li>
                  <li>We never sell, rent, or trade your personal data to third parties.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-ink sm:text-2xl">
                  3. External Links & Amazon Affiliate / Bookstore Links
                </h2>
                <p className="mt-3">
                  Our website contains links to Amazon.com and authorized retailers for book purchases. When clicking on an external link to purchase <em>The Trail Book #1</em> or sequels, you are subject to the privacy policies and terms of Amazon or the respective retailer.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-ink sm:text-2xl">
                  4. Your Rights & Unsubscribing
                </h2>
                <p className="mt-3">
                  You may unsubscribe from the author newsletter or request deletion of any correspondence at any time by contacting us through the <Link href="/contact" className="text-gold underline">contact page</Link>.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-ink sm:text-2xl">
                  5. Contact Information
                </h2>
                <p className="mt-3">
                  If you have any questions about this Privacy Policy, please contact Charles David Tebbs at{' '}
                  <Link href="/contact" className="text-gold font-semibold underline">
                    our Contact Page
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <NewsletterFooter />
    </div>
  )
}
