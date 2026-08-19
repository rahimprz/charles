import { SiteHeader } from '@/components/site-header'
import { NewsletterFooter } from '@/components/newsletter-footer'
import { ChevronRight, FileCheck } from 'lucide-react'
import Link from 'next/link'

export default function TermsPage() {
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
              <span className="text-ink font-semibold">Terms of Service</span>
            </nav>

            <div className="mt-4 flex items-center gap-2">
              <FileCheck className="size-4 text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                Author Terms & Conditions
              </span>
            </div>

            <h1 className="mt-2 font-serif text-3xl font-medium text-ink sm:text-4xl md:text-5xl">
              Terms of Service
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
                  1. Agreement to Terms
                </h2>
                <p className="mt-3">
                  By accessing and using this website (the &quot;Site&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this site.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-ink sm:text-2xl">
                  2. Copyright & Intellectual Property
                </h2>
                <p className="mt-3">
                  All literary works, character names (including James Jack, Mo, Mabel), excerpts, synopses, artwork, book cover images, and biographical materials displayed on this site are the exclusive intellectual property of <strong>Charles David Tebbs</strong> and protected under United States and international copyright laws.
                </p>
                <p className="mt-2 text-muted-foreground">
                  No part of this website or the novels may be reproduced, distributed, or transmitted in any form without prior written permission from the author.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-ink sm:text-2xl">
                  3. Book Purchases & Third-Party Platforms
                </h2>
                <p className="mt-3">
                  All book purchases for <em>The Trail Book #1</em>, <em>The Trail Unfolded Sequel #2</em>, and <em>The Trail Rendezvous</em> are transacted through third-party platforms such as Amazon.com. Pricing, fulfillment, returns, and digital rights management are governed by the merchant of record (e.g. Amazon Kindle Direct Publishing).
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-ink sm:text-2xl">
                  4. Reader Submissions & Feedback
                </h2>
                <p className="mt-3">
                  We welcome reviews and reader feedback. Any constructive criticism, kind words, or general communications submitted through our contact forms are treated with respect and gratitude.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-ink sm:text-2xl">
                  5. Contact Information
                </h2>
                <p className="mt-3">
                  For questions regarding these Terms, please reach out via our{' '}
                  <Link href="/contact" className="text-gold font-semibold underline">
                    Contact Form
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
