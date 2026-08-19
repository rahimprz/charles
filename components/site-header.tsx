'use client'

import { Feather, Menu, ShieldCheck, X } from 'lucide-react'
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
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { data } = useAuthorData()

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <header className="relative z-50 border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-0">
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
              onClick={toggleMenu}
              className="flex size-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-gold hover:text-gold active:scale-95 md:hidden focus:outline-none focus:ring-2 focus:ring-gold/50"
              aria-label="Open navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMenu}
          />
          
          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-background shadow-2xl flex flex-col">
            {/* Menu Header */}
            <div className="flex items-center justify-between border-b border-border p-5">
              <Link href="/" onClick={closeMenu} className="flex items-center gap-2">
                <Feather className="size-4 text-gold" />
                <span className="font-serif text-sm font-bold uppercase tracking-wide text-ink">
                  C. David Tebbs
                </span>
              </Link>
              <button
                type="button"
                onClick={closeMenu}
                className="flex size-8 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-gold hover:text-gold"
                aria-label="Close menu"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto p-5">
              <ul className="space-y-1">
                {navLinks.map((item, index) => {
                  const active = isActive(item.href)
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-[0.15em] transition-colors ${
                          active 
                            ? 'bg-gold/10 text-gold' 
                            : 'text-ink hover:bg-parchment/50 hover:text-gold'
                        }`}
                      >
                        <span>{item.label}</span>
                        <span className="text-xs text-gold/60 font-mono">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Menu Footer */}
            <div className="border-t border-border p-5 bg-parchment/30">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground text-center mb-4">
                Stories of Courage. Legacy. Frontier.
              </p>
              <Link
                href="/admin"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full bg-ink px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white rounded-lg transition-colors hover:bg-gold hover:text-ink"
              >
                <ShieldCheck className="size-4 text-gold" />
                <span>Admin Portal</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
