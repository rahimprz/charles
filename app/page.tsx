import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { FeaturedSeries } from '@/components/featured-series'
import { BookSpotlight } from '@/components/book-spotlight'
import { QuoteSection } from '@/components/quote-section'
import { AllBooks } from '@/components/all-books'
import { NewsletterFooter } from '@/components/newsletter-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <FeaturedSeries />
        <BookSpotlight />
        <QuoteSection />
        <AllBooks />
      </main>
      <NewsletterFooter />
    </>
  )
}
