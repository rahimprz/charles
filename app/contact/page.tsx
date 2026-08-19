'use client'

import { SiteHeader } from '@/components/site-header'
import { NewsletterFooter } from '@/components/newsletter-footer'
import { useAuthorData } from '@/lib/author-context'
import { CheckCircle2, ChevronRight, Globe, Mail, MessageSquare, Send, Sparkles, User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function ContactPage() {
  const { data, addMessage } = useAuthorData()
  const { author, settings } = data

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return

    setLoading(true)
    setTimeout(() => {
      addMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        website: formData.website.trim(),
        subject: formData.subject.trim() || 'Reader Feedback & Review',
        message: formData.message.trim(),
      })
      setLoading(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', website: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 7000)
    }, 450)
  }

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
              <span className="text-ink font-semibold">Contact</span>
            </nav>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold sm:text-xs">
                Author Correspondence
              </span>
              <span className="inline-block size-1 rotate-45 bg-gold" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
                Reviews & Inquiries
              </span>
            </div>

            <h1 className="mt-2 font-serif text-3xl font-medium text-ink sm:text-4xl md:text-5xl lg:text-6xl">
              Contact Charles David Tebbs
            </h1>
            <p className="mt-2 max-w-2xl text-base text-foreground/80 sm:text-lg">
              Send your thoughts, questions, or reviews directly to David.
            </p>
          </div>
        </section>

        {/* Main Contact Form Section */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-6 md:px-12">
            <div className="overflow-hidden rounded-2xl border border-border bg-parchment shadow-2xl">
              <div className="grid lg:grid-cols-12">
                {/* Left: Author Note */}
                <div className="bg-ink p-8 text-primary-foreground sm:p-12 lg:col-span-5 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-gold">
                      <Sparkles className="size-3.5" />
                      <span>Direct Author Inbox</span>
                    </div>

                    <h2 className="font-serif text-2xl font-medium text-white sm:text-3xl">
                      A Personal Note from David
                    </h2>

                    <div className="rounded-xl border border-gold/30 bg-stone-900/80 p-6">
                      <p className="font-serif text-base italic leading-relaxed text-gold-light sm:text-lg">
                        &ldquo;{author.contactGreeting ||
                          'I am interested with your reviews and feedback, as a new author I am interested and looking to make improvements.... Thank You! David'}&rdquo;
                      </p>
                      <div className="mt-5 text-right">
                        <span className="font-script text-3xl text-white block">
                          David
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-gold">
                          Charles David Tebbs
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 border-t border-stone-800 pt-6 space-y-3 text-xs text-stone-400">
                    <p className="font-semibold text-stone-200">
                      Looking to discuss:
                    </p>
                    <ul className="space-y-1.5 list-disc list-inside">
                      <li>Feedback on <em>The Trail Book #1</em></li>
                      <li>Thoughts on <em>The Trail Unfolded Sequel #2</em></li>
                      <li>Book clubs and speaking opportunities</li>
                      <li>Questions about historical research and lore</li>
                    </ul>
                  </div>
                </div>

                {/* Right: Contact Form */}
                <div className="p-8 sm:p-12 lg:col-span-7 bg-card">
                  <h3 className="font-serif text-2xl font-medium text-ink">
                    Send a Message
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Please provide your contact details and message below.
                  </p>

                  {submitted ? (
                    <div className="mt-8 rounded-xl border border-emerald-500/40 bg-emerald-50 p-8 text-center text-emerald-900">
                      <CheckCircle2 className="mx-auto size-12 text-emerald-600" />
                      <h4 className="mt-4 font-serif text-xl font-bold">
                        Thank You for Your Feedback!
                      </h4>
                      <p className="mt-2 text-sm text-emerald-800">
                        Your message has been delivered to David&apos;s author desk and inbox. He looks forward to reading your comments.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        {/* Name */}
                        <div>
                          <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-foreground/80">
                            Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative mt-1.5">
                            <User className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                              id="contact-name"
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Your full name"
                              className="w-full rounded-md border border-border bg-background py-3 pl-10 pr-4 text-sm text-ink placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div>
                          <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-foreground/80">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <div className="relative mt-1.5">
                            <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                              id="contact-email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="your.email@example.com"
                              className="w-full rounded-md border border-border bg-background py-3 pl-10 pr-4 text-sm text-ink placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-foreground/80">
                          Subject / Book Inquired About
                        </label>
                        <input
                          id="contact-subject"
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="e.g. Review of The Trail Book #1"
                          className="mt-1.5 w-full rounded-md border border-border bg-background py-3 px-4 text-sm text-ink placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>

                      {/* Website URL (optional) */}
                      <div>
                        <label htmlFor="contact-website" className="block text-xs font-bold uppercase tracking-wider text-foreground/80">
                          Website URL <span className="text-xs font-normal text-muted-foreground">(optional)</span>
                        </label>
                        <div className="relative mt-1.5">
                          <Globe className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                          <input
                            id="contact-website"
                            type="url"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            placeholder="https://yourwebsite.com"
                            className="w-full rounded-md border border-border bg-background py-3 pl-10 pr-4 text-sm text-ink placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-foreground/80">
                          Message / Feedback <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-1.5">
                          <MessageSquare className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
                          <textarea
                            id="contact-message"
                            rows={5}
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Write your note, review, or thoughts here..."
                            className="w-full rounded-md border border-border bg-background py-3 pl-10 pr-4 text-sm text-ink placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-ink py-4 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-lg transition-all hover:bg-gold hover:text-ink active:scale-[0.99] disabled:opacity-50"
                      >
                        <Send className="size-4" />
                        <span>{loading ? 'Submitting Message...' : 'Send Message to David'}</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <NewsletterFooter />
    </div>
  )
}
