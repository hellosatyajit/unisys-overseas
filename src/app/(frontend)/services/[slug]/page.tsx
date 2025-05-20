import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

import { Gutter } from '@/components/Gutter'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { Media, ServicesCollection, ServiceCountryDetail } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

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

      <Gutter className="service-header">
        <h1>{service.title}</h1>
        <p className="service-description">{service.description}</p>
      </Gutter>

      {service.featuredImage && (
        <Gutter className="service-featured-image">
          <Image
            src={(service.featuredImage as Media).url || ''}
            alt={service.title}
            width={1200}
            height={600}
            priority
            className="service-image"
          />
        </Gutter>
      )}

      {countryPages && countryPages.totalDocs > 0 && (
        <Gutter className="service-countries">
          <h2>Available Countries</h2>
          <div className="countries-grid">
            {countryPages.docs.map((countryPage) => (
              <Link
                key={countryPage.id}
                href={`/services/${slug}/${countryPage.slug}`}
                className="country-card"
              >
                <h3>{countryPage.country}</h3>
                <p>{countryPage.description}</p>
              </Link>
            ))}
          </div>
        </Gutter>
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
