'use client'

import { Compass } from 'lucide-react'
import { useState } from 'react'

export function NewsletterFooter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
  }

  return (
    <footer id="contact" className="px-6 pb-10 md:px-12">
      <div className="relative flex flex-col items-center gap-8 overflow-hidden bg-ink px-6 py-10 text-primary-foreground md:flex-row md:gap-10 md:px-10">
        <img
          src="/images/lantern.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-full w-48 object-cover object-center opacity-80 [mask-image:linear-gradient(to_right,black_40%,transparent)]"
        />
        <Compass
          className="pointer-events-none absolute -right-6 top-1/2 hidden size-32 -translate-y-1/2 text-gold/15 md:block"
          strokeWidth={0.75}
          aria-hidden="true"
        />

        <p className="relative z-10 max-w-xs text-lg leading-relaxed text-primary-foreground/90 md:ml-44 text-pretty">
          Stay updated on new releases, exclusive content, and more.
        </p>

        <form
          onSubmit={handleSubmit}
          className="relative z-10 flex w-full max-w-md flex-1 items-stretch md:ml-auto"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="min-w-0 flex-1 border border-primary-foreground/25 bg-transparent px-5 py-3.5 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:border-gold focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 bg-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-opacity hover:opacity-90"
          >
            {subscribed ? 'Subscribed' : 'Subscribe'}
          </button>
        </form>
      </div>
    </footer>
  )
}
