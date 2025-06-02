import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { ArrowRightIcon } from 'lucide-react'
import { FAQs } from '@/components/FAQs/Component'
import { Gutter } from '@/components/Gutter'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { Media, ServicesCollection, ServiceCountryDetail } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import ContentBlocks from '@/components/ServiceContentBlock'

interface ServicePageProps {
  params: {
    slug: string
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = params
  const payload = await getPayload({ config: configPromise })

  const services = await payload.find({
    collection: 'services-collection',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
    limit: 1,
  })

  const service = services.docs[0]

  if (!service) {
    return notFound()
  }

  // Fetch all country-specific pages for this service
  const countryPages = await payload.find({
    collection: 'service-country-details',
    where: {
      'service.id': { equals: service.id },
    },
  })

  return (
    <main className="service-detail-page">
      <Gutter>
        <nav className="breadcrumb">
          <Link href="/">Home</Link> / <Link href="/services">Services</Link> /{' '}
          <span>{service.title}</span>
        </nav>
      </Gutter>

      <Gutter className="service-hero-section flex flex-col md:flex-row items-center md:items-start gap-16 my-10">
        <div className="flex-1 w-full md:pt-6">
          <h1 className="font-bold text-4xl md:text-5xl tracking-tight text-secondary">
            {service.title}
          </h1>
          <p className="text-lg text-justify text-slate-600 mt-6">{service.description}</p>
        </div>

        {service.featuredImage && (
          <div className="flex-1 w-full">
            <Image
              src={(service.featuredImage as Media).url || ''}
              alt={service.title}
              width={1200}
              height={600}
              priority
              className="w-full h-[500px] rounded-3xl object-cover shadow-md"
            />
          </div>
        )}
      </Gutter>

      {service.content && Array.isArray(service.content) && (
        <ContentBlocks content={service.content} />
      )}

      {countryPages && countryPages.totalDocs > 0 && (
        <Gutter className="service-countries py-16 bg-white container mx-auto px-4 space-y-8">
          <div className="space-y-2 col-span-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary lg:mb-0 mb-4">
              Available Countries
            </h2>
            <p className="text-gray-600 lg:max-w-lg">
              From iconic destinations to hidden gems, we provide expert visa consultancy for every
              kind of traveler.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {countryPages.docs.map((countryPage) => (
              <Link
                key={countryPage.id}
                href={`/services/${slug}/${countryPage.slug}`}
                className="flex flex-col gap-2 group"
              >
                <img
                  src={(countryPage.featuredImage as Media)?.url ?? '/placeholder.png'}
                  alt={(countryPage.featuredImage as Media)?.alt ?? countryPage.country}
                  className="aspect-square rounded-3xl object-cover"
                />
                <div className="flex items-center gap-2">
                  <h3 className="text-xl md:text-2xl lg:leading-tight font-semibold">
                    {countryPage.country}
                  </h3>
                  <ArrowRightIcon
                    size={18}
                    className="group-hover:translate-x-1 transition-transform text-primary"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Gutter>
      )}
      {service.faqs && service.faqs.length > 0 && (
        <FAQs
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our services"
          faqs={service.faqs}
        />
      )}
    </main>
  )
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = params
  const payload = await getPayload({ config: configPromise })

  const services = await payload.find({
    collection: 'services-collection',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const service = services.docs[0]

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: service.title,
    description: service.description,
    openGraph: mergeOpenGraph({
      title: service.title,
      description: service.description,
    }),
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const services = await payload.find({
    collection: 'services-collection',
  })

  return (services.docs || []).map((service) => ({
    slug: service.slug,
  }))
}
