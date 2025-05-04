import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Country, Media } from '@/payload-types'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

export async function Countries() {
  const countries = (await getCachedGlobal('countries', 1)()) as Country

  return (
    <section className="py-16 bg-white container mx-auto px-4 space-y-8" id="services">
      <div className="space-y-2 col-span-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary lg:mb-0 mb-4">
          {countries.title}
        </h2>
        <p className="text-gray-600 lg:max-w-lg">{countries.subtitle}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {countries.countries?.map((country) => (
          <Link key={country.id} href={country.link || '/'} className="flex flex-col gap-2 group">
            <img
              src={(country.image as Media).url ?? '/placeholder.png'}
              alt={(country.image as Media).alt ?? ''}
              className="aspect-square rounded-3xl object-cover"
            />
            <div className="flex items-center gap-2">
              <h3 className="text-3xl lg:leading-tight font-semibold">{country.title}</h3>
              <span className="gap-2 text-lg">
                <ArrowRightIcon
                  size={18}
                  className="group-hover:translate-x-1 transition-transform text-primary"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
