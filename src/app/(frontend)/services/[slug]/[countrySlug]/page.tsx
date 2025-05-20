import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

import RichText from '@/components/RichText'
import { Gutter } from '@/components/Gutter'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Media, ServicesCollection } from '@/payload-types'

interface CountryServicePageProps {
  params: {
    slug: string
    countrySlug: string
  }
}

interface ContentBlock {
  contentType: string
  text: DefaultTypedEditorState
  image?: {
    url: string
    alt?: string
  }
  backgroundColor?: string
}

interface University {
  name: string
  description?: string
  website?: string
  image?: {
    url: string
    alt?: string
  }
}

interface City {
  name: string
  description?: string
  image?: {
    url: string
    alt?: string
  }
}

interface FAQ {
  question: string
  answer: DefaultTypedEditorState
}

interface CountryService {
  title: string
  description: string
  country: string
  serviceType: string
  content?: ContentBlock[]
  popularUniversities?: University[]
  popularCities?: City[]
  faqs?: FAQ[]
}

export default async function CountryServicePage({ params }: CountryServicePageProps) {
  const { slug, countrySlug } = params

  // Fetch main service
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
    return notFound()
  }

  // Fetch country-specific service details
  const countryServices = await payload.find({
    collection: 'service-country-details',
    where: {
      slug: {
        equals: countrySlug,
      },
    },
  })

  const countryService = countryServices.docs[0]

  if (!countryService) {
    return notFound()
  }

  const isStudentVisa = countryService.serviceType === 'student-visa'

  return (
    <main className="country-service-page">
      <Gutter>
        <nav className="breadcrumb">
          <Link href="/">Home</Link> /<Link href="/services">Services</Link> /
          <Link href={`/services/${slug}`}>{service.title}</Link> /
          <span>{countryService.country}</span>
        </nav>
      </Gutter>

      <Gutter className="country-service-header">
        <h1>{countryService.title}</h1>
        <p className="country-service-description">{countryService.description}</p>
      </Gutter>

      {/* Content Blocks */}
      {countryService.content &&
        countryService.content.map((block, i) => {
          if (block.contentType === 'text-image') {
            return (
              <Gutter
                key={i}
                className={`content-block text-image-block ${i % 2 === 0 ? 'even' : 'odd'}`}
              >
                <div className="text-content">
                  <RichText data={block.text} />
                </div>
                {block.image && (
                  <div className="image-wrapper">
                    <Image
                      src={(block.image as Media).url || ''}
                      alt={countryService.title}
                      width={600}
                      height={400}
                      className="content-image"
                    />
                  </div>
                )}
              </Gutter>
            )
          }

          if (block.contentType === 'full-width') {
            return (
              <div key={i} className={`full-width-block bg-${block.backgroundColor}`}>
                <Gutter>
                  <div className="text-content-full">
                    <RichText data={block.text} />
                  </div>
                </Gutter>
              </div>
            )
          }
        })}

      {/* Student Visa Specific Content */}
      {isStudentVisa &&
        countryService.popularUniversities &&
        countryService.popularUniversities.length > 0 && (
          <Gutter className="universities-section">
            <h2>Popular Universities</h2>
            <div className="universities-grid">
              {countryService.popularUniversities.map((uni, i) => (
                <div key={i} className="university-card">
                  {uni.image && (
                    <div className="university-image">
                      <Image
                        src={(uni.image as Media).url || ''}
                        alt={uni.name}
                        width={300}
                        height={200}
                        className="uni-image"
                      />
                    </div>
                  )}
                  <h3>{uni.name}</h3>
                  {uni.description && <p>{uni.description}</p>}
                  {uni.website && (
                    <a
                      href={uni.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="university-link"
                    >
                      Visit Website
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Gutter>
        )}

      {/* Popular Cities */}
      {isStudentVisa && countryService.popularCities && countryService.popularCities.length > 0 && (
        <Gutter className="cities-section">
          <h2>Popular Student Cities</h2>
          <div className="cities-grid">
            {countryService.popularCities.map((city, i) => (
              <div key={i} className="city-card">
                {city.image && (
                  <div className="city-image">
                    <Image
                      src={(city.image as Media).url || ''}
                      alt={city.name}
                      width={300}
                      height={200}
                      className="city-img"
                    />
                  </div>
                )}
                <h3>{city.name}</h3>
                {city.description && <p>{city.description}</p>}
              </div>
            ))}
          </div>
        </Gutter>
      )}

      {/* FAQs */}
      {countryService.faqs && countryService.faqs.length > 0 && (
        <Gutter className="faqs-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faqs-list">
            {countryService.faqs.map((faq: FAQ, i: number) => (
              <div key={i} className="faq-item">
                <h3 className="question">{faq.question}</h3>
                <div className="answer">
                  <RichText data={faq.answer} />
                </div>
              </div>
            ))}
          </div>
        </Gutter>
      )}
    </main>
  )
}

export async function generateMetadata({ params }: CountryServicePageProps): Promise<Metadata> {
  const { slug, countrySlug } = params

  const payload = await getPayload({ config: configPromise })

  const countryServices = await payload.find({
    collection: 'service-country-details',
    where: {
      slug: {
        equals: countrySlug,
      },
    },
  })

  const countryService = countryServices.docs[0]

  if (!countryService) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: `${countryService.title} - ${countryService.country}`,
    description: countryService.description,
    openGraph: mergeOpenGraph({
      title: `${countryService.title} - ${countryService.country}`,
      description: countryService.description,
    }),
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const countryServices = await payload.find({
    collection: 'service-country-details',
  })

  const params = []

  for (const countryService of countryServices.docs) {
    if (countryService.service) {
      params.push({
        slug: (countryService.service as ServicesCollection)?.slug || '',
        countrySlug: countryService.slug,
      })
    }
  }

  return params
}
