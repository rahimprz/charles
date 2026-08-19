'use client'

import { CheckCircle2, Globe, Mail, MessageSquare, Send, Sparkles, User } from 'lucide-react'
import { useState } from 'react'
import { useAuthorData } from '@/lib/author-context'

export function HomeContact() {
  const { data, addMessage } = useAuthorData()
  const { author } = data

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
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
        subject: 'Homepage Reader Feedback',
        message: formData.message.trim(),
      })
      setLoading(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', website: '', message: '' })
      setTimeout(() => setSubmitted(false), 6000)
    }, 400)
  }

  return (
    <section id="contact-author" className="px-5 py-12 sm:px-6 sm:py-16 md:px-12" aria-labelledby="contact-section-title">
      <div className="mx-auto max-w-[1200px]">
        <div className="overflow-hidden rounded-2xl border border-border bg-parchment shadow-xl">
          <div className="grid lg:grid-cols-12">
            {/* Left Column: David's Greeting */}
            <div className="bg-ink p-8 text-primary-foreground sm:p-10 lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold">
                  <Sparkles className="size-3" />
                  <span>Reader Reviews & Feedback</span>
                </div>

                <h2 id="contact-section-title" className="mt-4 font-serif text-2xl font-medium text-white sm:text-3xl lg:text-4xl">
                  Contact Me
                </h2>

                <div className="mt-6 rounded-lg border border-gold/30 bg-stone-900/60 p-5">
                  <p className="font-serif text-base italic leading-relaxed text-gold-light sm:text-lg">
                    &ldquo;{author.contactGreeting ||
                      'I am interested with your reviews and feedback, as a new author I am interested and looking to make improvements.... Thank You! David'}&rdquo;
                  </p>
                  <p className="mt-4 text-right font-script text-2xl text-white">
                    — David
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-stone-800 pt-6 text-xs text-stone-400 space-y-2">
                <p className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <span>Direct Author Channel</span>
                </p>
                <p>
                  Every message goes straight to David&apos;s author desk. He personally reads all feedback and constructive reviews!
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="p-8 sm:p-10 lg:col-span-7 bg-card">
              <h3 className="font-serif text-xl font-medium text-ink sm:text-2xl">
                Send a Note or Review
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Fill out the form below to connect directly with Charles David Tebbs.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-lg border border-emerald-500/40 bg-emerald-50 p-6 text-center text-emerald-900">
                  <CheckCircle2 className="mx-auto size-10 text-emerald-600" />
                  <h4 className="mt-3 font-serif text-lg font-bold">
                    Message Sent Successfully!
                  </h4>
                  <p className="mt-2 text-sm text-emerald-800">
                    Thank you for reaching out! Your note has been delivered to David&apos;s author inbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label htmlFor="home-contact-name" className="block text-xs font-semibold uppercase tracking-wider text-foreground/80">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative mt-1.5">
                        <User className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          id="home-contact-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full rounded-md border border-border bg-background py-2.5 pl-10 pr-3.5 text-sm text-ink placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="home-contact-email" className="block text-xs font-semibold uppercase tracking-wider text-foreground/80">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative mt-1.5">
                        <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          id="home-contact-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@example.com"
                          className="w-full rounded-md border border-border bg-background py-2.5 pl-10 pr-3.5 text-sm text-ink placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Website URL (optional) */}
                  <div>
                    <label htmlFor="home-contact-website" className="block text-xs font-semibold uppercase tracking-wider text-foreground/80">
                      Website URL <span className="text-xs font-normal text-muted-foreground">(optional)</span>
                    </label>
                    <div className="relative mt-1.5">
                      <Globe className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="home-contact-website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://yourwebsite.com"
                        className="w-full rounded-md border border-border bg-background py-2.5 pl-10 pr-3.5 text-sm text-ink placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="home-contact-message" className="block text-xs font-semibold uppercase tracking-wider text-foreground/80">
                      Message / Review <span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-1.5">
                      <MessageSquare className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
                      <textarea
                        id="home-contact-message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Share your thoughts on the books, questions, or encouragement..."
                        className="w-full rounded-md border border-border bg-background py-2.5 pl-10 pr-3.5 text-sm text-ink placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-ink py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow transition-all hover:bg-gold hover:text-ink active:scale-[0.99] disabled:opacity-50"
                  >
                    <Send className="size-4" />
                    <span>{loading ? 'Sending Message...' : 'Send Message to David'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
