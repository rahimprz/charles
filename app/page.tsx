import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { FeaturedSeries } from '@/components/featured-series'
import { BookSpotlight } from '@/components/book-spotlight'
import { AllBooks } from '@/components/all-books'
import { AuthorPreview } from '@/components/author-preview'
import { QuoteSection } from '@/components/quote-section'
import { HomeContact } from '@/components/home-contact'
import { NewsletterFooter } from '@/components/newsletter-footer'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-gold selection:text-primary-foreground">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <FeaturedSeries />
        <BookSpotlight />
        <AllBooks />
        <AuthorPreview />
        <QuoteSection />
        <HomeContact />
      </main>
      <NewsletterFooter />
    </div>
  )
}
