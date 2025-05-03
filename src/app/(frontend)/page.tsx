import { Services } from '@/components/Services/Component'
import { generateMetadata } from './[slug]/page'
import { HeroCarousel, HeroContent } from '@/components/Hero/Component'
import { Countries } from '@/components/Countries/Component'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'
import { Testimonial } from '@/components/Testimonial/Component'

export default async function HomePage() {
  return (
    <>
      <main className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 pt-4 py-16 px-4 md:px-8 gap-16">
        <HeroContent />
        <HeroCarousel />
      </main>
      <Countries />
      <section className="px-4 py-8 sm:p-16 bg-blue-50 sm:w-fit sm:mx-auto space-y-8 sm:rounded-3xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
          Not Sure What You Looking for?
        </h2>
        <Button size="lg" className="rounded-full sm:mx-auto block w-fit" asChild>
          <Link href="/contact" className="gap-2 text-xl flex justify-center items-center">
            Contact Us <ArrowRightIcon />
          </Link>
        </Button>
      </section>
      <Services />
      <Testimonial />
    </>
  )
}

export { generateMetadata }
