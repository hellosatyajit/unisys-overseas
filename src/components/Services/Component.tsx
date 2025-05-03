import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Media, Service } from '@/payload-types'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

export async function Services() {
  const services = (await getCachedGlobal('services', 1)()) as Service

  return (
    <>
      <section className="py-16 bg-white container mx-auto px-4 space-y-8" id="services">
        <div className="space-y-2 col-span-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary lg:mb-0 mb-4">
            {services.title}
          </h2>
          <p className="text-gray-600 lg:max-w-lg">{services.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-10">
          {services.services?.slice(0, 4).map((service) => (
            <div key={service.id} className="flex flex-col sm:flex-row gap-2 sm:gap-4 group">
              <img
                src={(service.image as Media).url ?? '/placeholder.png'}
                alt={(service.image as Media).alt ?? ''}
                className="h-48 sm:h-64 aspect-square rounded-3xl object-cover"
              />
              <div className="space-y-2 sm:space-y-4">
                <h3 className="text-3xl lg:leading-tight font-semibold">{service.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{service.subtitle}</p>
                <Button variant="outline" asChild>
                  <Link href={service.link.url || '/'} className="gap-2 text-lg">
                    {service.link.label} <ArrowRightIcon size={18} />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {(services?.services?.length ?? 0) > 4 && (
          <Button size="lg" className="rounded-full" variant="outline" asChild>
            <Link href="/services" className="gap-2 text-lg">
              View More <ArrowRightIcon />
            </Link>
          </Button>
        )}
      </section>
    </>
  )
}
