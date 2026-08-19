'use client'

import { Feather, Menu, ShieldCheck, X, BookOpen, Compass } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuthorData } from '@/lib/author-context'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Books', href: '/books' },
  { label: 'Series', href: '/series' },
  { label: 'Contact', href: '/contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { data } = useAuthorData()

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

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="relative z-40 border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-0">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-6 sm:py-5 md:px-12">
        {/* Brand */}
        <Link href="/" className="group flex flex-col gap-1 focus:outline-none">
          <span className="flex items-start gap-2">
            <span className="font-serif text-base font-bold uppercase leading-tight tracking-wide text-ink sm:text-lg md:text-xl">
              {data.author.name || 'Charles David Tebbs'}
            </span>
            <Feather
              className="mt-1 size-4 text-gold transition-transform duration-300 group-hover:-rotate-12 sm:size-5"
              aria-hidden="true"
            />
          </span>
          <span className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-muted-foreground sm:text-[10px]">
            <span className="inline-block h-px w-5 bg-gold transition-all duration-300 group-hover:w-8 sm:w-6" aria-hidden="true" />
            <span>Known as &quot;{data.author.penName || 'David'}&quot; • {data.author.roleTitle || 'AUTHOR'}</span>
            <span className="inline-block h-px w-5 bg-gold transition-all duration-300 group-hover:w-8 sm:w-6" aria-hidden="true" />
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex lg:gap-9">
          {navLinks.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group/link relative pb-1 text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:text-gold ${
                  active ? 'text-ink font-bold' : 'text-foreground/80'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-gold transition-all duration-300 ${
                    active ? 'w-full' : 'w-0 group-hover/link:w-full'
                  }`}
                  aria-hidden="true"
                />
              </Link>
            )
          })}
        </nav>

        {/* Action button */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="hidden items-center gap-2 rounded-full border border-gold/60 bg-parchment/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-ink transition-all hover:bg-ink hover:text-primary-foreground active:scale-95 sm:flex"
            title="Author Admin Portal"
          >
            <ShieldCheck className="size-3.5 text-gold" aria-hidden="true" />
            <span>Admin</span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex size-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-gold hover:text-gold active:scale-95 md:hidden"
            aria-label="Open navigation menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          aria-label="Close menu"
        />

        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-xs flex-col bg-background shadow-2xl transition-transform duration-300 ease-out border-l border-border ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
              <Feather className="size-4 text-gold" aria-hidden="true" />
              <span className="font-serif text-sm font-bold uppercase tracking-wide text-ink">
                C. David Tebbs
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex size-9 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-gold hover:text-gold active:scale-95"
              aria-label="Close menu"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile navigation" className="flex flex-col px-6 py-6 overflow-y-auto">
            {navLinks.map((item, i) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between border-b border-border/60 py-4 text-sm font-semibold uppercase tracking-[0.2em] transition-colors hover:text-gold ${
                    active ? 'text-gold font-bold' : 'text-ink'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  <span className="font-serif text-xs text-gold/60" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </Link>
              )
            })}
          </nav>

          <div className="mt-auto border-t border-border px-6 py-6 space-y-4 bg-parchment/40">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground text-center">
              Stories of Courage. Legacy. Frontier.
            </p>
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center gap-2 bg-ink px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-gold hover:text-ink"
            >
              <ShieldCheck className="size-4 text-gold" aria-hidden="true" />
              Author Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
