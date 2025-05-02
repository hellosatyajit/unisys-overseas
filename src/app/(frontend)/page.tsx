import { Services } from '@/components/Services/Component'
import { generateMetadata } from './[slug]/page'
import { HeroCarousel, HeroContent } from '@/components/Hero/Component'

export default async function HomePage() {
  return (
    <>
      <main className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 pt-4 py-16 px-4 md:px-8 gap-16">
        <HeroContent />
        <HeroCarousel />
      </main>
      <Services />
    </>
  )
}

export { generateMetadata }
