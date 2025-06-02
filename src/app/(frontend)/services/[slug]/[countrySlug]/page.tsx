import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { ChevronRight, ExternalLink, ChevronLeft } from 'lucide-react'
import { Button } from '../../../../../components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import RichText from '@/components/RichText'
import { Gutter } from '@/components/Gutter'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Media, ServicesCollection } from '@/payload-types'
import { FAQs } from '@/components/FAQs/Component'
import ServiceContentBlock from '@/components/ServiceContentBlock'
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
  image?: {
    url: string
    alt?: string
  }
  country: string
  serviceType: string
  content?: ContentBlock[]
  popularUniversities?: University[]
  popularCities?: City[]
  faqs?: FAQ[]
}

export default async function CountryServicePage({ params }: CountryServicePageProps) {
  const { slug, countrySlug } = params

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

  const truncateText = (text: string, maxLength = 120) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + '...'
  }

  const getBackgroundColorClass = (color?: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'bg-blue-50 dark:bg-blue-950',
      green: 'bg-green-50 dark:bg-green-950',
      purple: 'bg-purple-50 dark:bg-purple-950',
      orange: 'bg-orange-50 dark:bg-orange-950',
      red: 'bg-red-50 dark:bg-red-950',
      gray: 'bg-gray-50 dark:bg-gray-950',
      yellow: 'bg-yellow-50 dark:bg-yellow-950',
    }
    return colorMap[color || 'gray'] || 'bg-gray-50 dark:bg-gray-950'
  }
  const content = countryService.content
  return (
    <main className="country-service-page ">
      <div>
        <Gutter>
          <nav className="flex items-center space-x-2 py-4 text-sm ">
            <Link
              href="/"
              className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/services"
              className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Services
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href={`/services/${slug}`}
              className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              {service.title}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              {countryService.country}
            </span>
          </nav>
        </Gutter>
      </div>

      <Gutter className="service-hero-section flex flex-col md:flex-row items-center md:items-start gap-16 py-12">
        <div className="flex-1 w-full md:pt-6">
          <h1 className="font-bold text-4xl md:text-5xl tracking-tight text-secondary">
            {countryService.title}
          </h1>
          <p className="text-lg text-justify text-slate-600 mt-6">{countryService.description}</p>
        </div>

        {countryService.featuredImage && (
          <div className="flex-1 w-full">
            <Image
              src={(countryService.featuredImage as Media).url || ''}
              alt={countryService.title}
              width={1200}
              height={600}
              priority
              className="w-full h-[400px] rounded-3xl object-cover shadow-md"
            />
          </div>
        )}
      </Gutter>

      {/* Content Blocks 
      {countryService.content &&
        countryService.content.map((block, i) => {
          if (block.contentType === 'text-image') {
            return (
              <section key={i} className="py-12 lg:py-16">
                <Gutter>
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 ">
                    
                    {block.image && (
                      <div className="order-2 lg:order-1">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                          <Image
                            src={(block.image as Media).url || ''}
                            alt={countryService.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        </div>
                      </div>
                    )}

                   
                    <div className="order-1 lg:order-2 ">
                      <div className="text-justify ">
                        <RichText data={block.text} />
                      </div>
                    </div>
                  </div>
                </Gutter>
              </section>
            )
          }

          if (block.contentType === 'full-width') {
            return (
              <section key={i} className="pt-10">
                <Gutter>
                  <div>
                    <RichText
                      className={`max-w-full rounded-xl sm:8 md:p-12 text-center  bg-${block.backgroundColor || 'gray-100'}`}
                      data={block.text}
                    />
                  </div>
                </Gutter>
              </section>
            )
          }

          return null
        })}*/}

      <ServiceContentBlock content={content} />
      {/* Universities Section */}
      {isStudentVisa &&
        countryService.popularUniversities &&
        countryService.popularUniversities.length > 0 && (
          <section
            className="py-16 bg-white container mx-auto px-4 space-y-8"
            id="popular-universities"
          >
            <div className="space-y-2 col-span-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary lg:mb-0 mb-4">
                Popular Universities
              </h2>
              <p className="text-gray-600 lg:max-w-lg">
                Discover top-ranked institutions that offer excellent education and opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-10">
              {countryService.popularUniversities.slice(0, 4).map((uni, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-4 group">
                  {uni.image && (
                    <img
                      src={(uni.image as Media).url || '/placeholder.png'}
                      alt={uni.name}
                      className="h-48 sm:h-64 aspect-square rounded-3xl object-cover"
                    />
                  )}
                  <div className="space-y-2 sm:space-y-4">
                    <h3 className="text-3xl lg:leading-tight font-semibold">{uni.name}</h3>
                    {uni.description && (
                      <p className="text-gray-600 text-sm sm:text-base">
                        {truncateText(uni.description, 200)}
                      </p>
                    )}
                    {uni.website && (
                      <Button variant="outline" asChild>
                        <a
                          href={uni.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gap-2 text-lg"
                        >
                          Visit Website <ArrowRightIcon size={18} />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {countryService.popularUniversities.length > 4 && (
              <Button size="lg" className="rounded-full" variant="outline" asChild>
                <Link href="/universities" className="gap-2 text-lg">
                  View More <ArrowRightIcon />
                </Link>
              </Button>
            )}
          </section>
        )}

      {/* Cities Slider Section */}
      {isStudentVisa && countryService.popularCities && countryService.popularCities.length > 0 && (
        <section
          className="py-16 bg-white container mx-auto px-4 space-y-8"
          id="popular-student-cities"
        >
          <div className="space-y-2 col-span-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary lg:mb-0 mb-4">
              Popular Student Cities
            </h2>
            <p className="text-gray-600 lg:max-w-lg">
              Explore vibrant cities that offer the perfect blend of education and lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-10">
            {countryService.popularCities.slice(0, 4).map((city, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-4 group">
                {city.image && (
                  <img
                    src={(city.image as Media).url || '/placeholder.png'}
                    alt={city.name}
                    className="h-48 sm:h-64 aspect-square rounded-3xl object-cover"
                  />
                )}
                <div className="space-y-2 sm:space-y-4">
                  <h3 className="text-3xl lg:leading-tight font-semibold">{city.name}</h3>
                  {city.description && (
                    <p className="text-gray-600 text-sm sm:text-base">
                      {truncateText(city.description, 250)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {countryService.popularCities.length > 4 && (
            <Button size="lg" className="rounded-full" variant="outline" asChild>
              <Link href="/cities" className="gap-2 text-lg">
                View More <ArrowRightIcon />
              </Link>
            </Button>
          )}
        </section>
      )}

      {/* FAQs Section */}
      {countryService.faqs && countryService.faqs.length > 0 && (
        <FAQs
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our services"
          faqs={countryService.faqs}
        />
      )}

      {/* Add some basic slider functionality */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const slider = document.getElementById('cities-slider');
              if (slider) {
                let isDown = false;
                let startX;
                let scrollLeft;

                slider.addEventListener('mousedown', (e) => {
                  isDown = true;
                  startX = e.pageX - slider.offsetLeft;
                  scrollLeft = slider.scrollLeft;
                });

                slider.addEventListener('mouseleave', () => {
                  isDown = false;
                });

                slider.addEventListener('mouseup', () => {
                  isDown = false;
                });

                slider.addEventListener('mousemove', (e) => {
                  if (!isDown) return;
                  e.preventDefault();
                  const x = e.pageX - slider.offsetLeft;
                  const walk = (x - startX) * 2;
                  slider.scrollLeft = scrollLeft - walk;
                });

                // Touch events for mobile
                slider.addEventListener('touchstart', (e) => {
                  startX = e.touches[0].pageX - slider.offsetLeft;
                  scrollLeft = slider.scrollLeft;
                });

                slider.addEventListener('touchmove', (e) => {
                  const x = e.touches[0].pageX - slider.offsetLeft;
                  const walk = (x - startX) * 2;
                  slider.scrollLeft = scrollLeft - walk;
                });
              }
            });
          `,
        }}
      />
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
