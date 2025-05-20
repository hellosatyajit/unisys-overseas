import { Services } from '@/components/Services/Component'
import { generateMetadata } from './[slug]/page'
import { HeroCarousel, HeroContent } from '@/components/Hero/Component'
import { Countries } from '@/components/Countries/Component'
import { Testimonial } from '@/components/Testimonial/Component'
import { FAQs } from '@/components/FAQs/Component'
import { WhyUs } from '@/components/WhyUs/Component'
import { NotSureSection } from '@/components/NotSureSection'

export default async function HomePage() {
  return (
    <>
      <main className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 pt-4 py-16 px-4 md:px-8 gap-16">
        <HeroContent />
        <HeroCarousel />
      </main>
      <Countries />
      <NotSureSection />
      <Services />
      <Testimonial />
      <FAQs />
      <WhyUs />
    </>
  )
}

export { generateMetadata }
