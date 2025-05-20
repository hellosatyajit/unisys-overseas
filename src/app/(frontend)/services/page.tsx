import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import configPromise, { CONSTANTS } from '@payload-config'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getPayload } from 'payload'
import { Media } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, Award, CheckCircle, Globe, Users } from 'lucide-react'
import { NotSureSection } from '@/components/NotSureSection'
import { FAQs } from '@/components/FAQs/Component'
import { WhyUs } from '@/components/WhyUs/Component'

export default async function Services() {
  const payload = await getPayload({ config: configPromise })

  const services = await payload.find({
    collection: 'services-collection',
  })

  if (!services) {
    return notFound()
  }

  return (
    <>
      <section className="container relative z-10 mx-auto flex flex-col items-center justify-center px-4 py-20">
        <div className="mx-auto max-w-4xl sm:text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
            Our Immigration <span className="text-red-600">Services</span>
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
            Comprehensive visa and immigration solutions tailored to your unique journey. We guide
            you every step of the way with expertise and personalized support.
          </p>

          <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="rounded-full text-lg" asChild>
              <Link href="/services/#services">Explore Services</Link>
            </Button>
            <Button size="lg" className="rounded-full text-lg" variant="ghost" asChild>
              <Link href={CONSTANTS.scheduleCallLink} target="_blank">
                Book Free Consultation
              </Link>
            </Button>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
            <div className="flex flex-col items-center rounded-xl bg-blue-50 p-6 shadow-sm backdrop-blur-sm transition-all hover:shadow-md text-center">
              <Award className="mb-3 h-10 w-10 text-red-600" />
              <span className="text-base font-semibold">10+ Years Experience</span>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-blue-50 p-6 shadow-sm backdrop-blur-sm transition-all hover:shadow-md text-center">
              <Users className="mb-3 h-10 w-10 text-red-600" />
              <span className="text-base font-semibold">5000+ Happy Clients</span>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-blue-50 p-6 shadow-sm backdrop-blur-sm transition-all hover:shadow-md text-center">
              <Globe className="mb-3 h-10 w-10 text-red-600" />
              <span className="text-base font-semibold">30+ Countries</span>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-blue-50 p-6 shadow-sm backdrop-blur-sm transition-all hover:shadow-md text-center">
              <CheckCircle className="mb-3 h-10 w-10 text-red-600" />
              <span className="text-base font-semibold">98% Success Rate</span>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 sm:py-20 container mx-auto px-4 space-y-8">
        <div>
          <h2 className="text-left sm:text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary lg:mb-0 mb-4">
            Featured Services
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {services.docs.map((service) => (
            <div key={service.id} className="flex flex-col sm:flex-row gap-2 sm:gap-4 group">
              <img
                src={(service.featuredImage as Media).url ?? '/placeholder.png'}
                alt={(service.featuredImage as Media).alt ?? ''}
                className="h-48 sm:h-64 aspect-square rounded-3xl object-cover"
              />
              <div className="space-y-2 sm:space-y-4">
                <h3 className="text-3xl lg:leading-tight font-semibold">{service.title}</h3>
                <p className="text-red-600 font-medium">{service.tagline}</p>
                <p className="text-gray-600 text-sm sm:text-base">{service.description}</p>
                <Button variant="outline" asChild>
                  <Link href={`/services/${service.slug}`} className="gap-2 text-lg">
                    {service.ctaLabel} <ArrowRightIcon size={18} />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <NotSureSection />
      <WhyUs />
      <FAQs />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Our Services',
    description:
      'Explore our range of professional services designed to help you achieve your goals.',
    openGraph: mergeOpenGraph({
      title: 'Our Services',
      description:
        'Explore our range of professional services designed to help you achieve your goals.',
    }),
  }
}
