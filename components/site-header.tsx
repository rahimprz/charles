'use client'

import { Feather, Menu, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const navItems = [
  { label: 'Home', href: '#', active: false },
  { label: 'About', href: '#about', active: false },
  { label: 'Books', href: '#books', active: true },
  { label: 'Journal', href: '#journal', active: false },
  { label: 'Contact', href: '#contact', active: false },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="relative z-40 flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 md:px-12">
      <a href="#" className="group flex flex-col gap-1">
        <span className="flex items-start gap-2">
          <span className="font-serif text-base font-bold uppercase leading-tight tracking-wide text-ink sm:text-lg md:text-xl">
            Charles
            <br />
            David Tebbs
          </span>
          <Feather
            className="mt-1 size-4 text-ink transition-transform duration-300 group-hover:-rotate-12 sm:size-5"
            aria-hidden="true"
          />
        </span>
        <span className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-muted-foreground sm:text-[10px]">
          <span className="inline-block h-px w-5 bg-gold transition-all duration-300 group-hover:w-8 sm:w-6" aria-hidden="true" />
          Author
          <span className="inline-block h-px w-5 bg-gold transition-all duration-300 group-hover:w-8 sm:w-6" aria-hidden="true" />
        </span>
      </a>

      {/* Desktop nav */}
      <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex lg:gap-10">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`group/link relative pb-1 text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:text-gold ${
              item.active ? 'text-ink' : 'text-foreground/80'
            }`}
            aria-current={item.active ? 'page' : undefined}
          >
            {item.label}
            <span
              className={`absolute bottom-0 left-0 h-px bg-current transition-all duration-300 ${
                item.active ? 'w-full' : 'w-0 group-hover/link:w-full'
              }`}
              aria-hidden="true"
            />
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="hidden size-10 items-center justify-center rounded-full bg-ink text-primary-foreground transition-all hover:bg-gold hover:text-ink active:scale-95 md:flex"
          aria-label="Account"
        >
          <User className="size-4" aria-hidden="true" />
        </button>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex size-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-gold hover:text-gold active:scale-95 md:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Close menu"
        />

        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`absolute right-0 top-0 flex h-full w-[78%] max-w-xs flex-col bg-background shadow-2xl transition-transform duration-300 ease-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <span className="flex items-center gap-2">
              <Feather className="size-4 text-gold" aria-hidden="true" />
              <span className="font-serif text-sm font-bold uppercase tracking-wide text-ink">
                C. David Tebbs
              </span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex size-9 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-gold hover:text-gold active:scale-95"
              aria-label="Close menu"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile navigation" className="flex flex-col px-6 py-6">
            {navItems.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between border-b border-border/60 py-4 text-sm font-semibold uppercase tracking-[0.2em] transition-colors hover:text-gold ${
                  item.active ? 'text-gold' : 'text-ink'
                } ${open ? 'animate-in fade-in slide-in-from-right-4' : ''}`}
                style={open ? { animationDelay: `${i * 60}ms`, animationFillMode: 'backwards' } : undefined}
                aria-current={item.active ? 'page' : undefined}
              >
                {item.label}
                <span className="font-serif text-xs text-gold/60" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </a>
            ))}
          </nav>

          <div className="mt-auto border-t border-border px-6 py-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Stories of Courage. Legacy. Frontier.
            </p>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-ink px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-gold hover:text-ink"
            >
              <User className="size-4" aria-hidden="true" />
              My Account
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
