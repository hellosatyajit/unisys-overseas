import { getCachedGlobal } from '@/utilities/getGlobals'
import type { WhyUs } from '@/payload-types'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowRightIcon, CalendarIcon, RocketIcon, TargetIcon, UsersIcon } from 'lucide-react'

export async function WhyUs() {
  const whyUs = (await getCachedGlobal('why-us', 1)()) as WhyUs

  return (
    <section className="py-16 bg-white container mx-auto px-4 space-y-8" id="services">
      <div className="space-y-2 col-span-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary lg:mb-0 mb-4">
          {whyUs.title}
        </h2>
        <p className="text-gray-600 lg:max-w-lg">{whyUs.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-100 p-6 rounded-3xl">
          <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center mb-4">
            <UsersIcon className="w-6 h-6 text-gray-700" />
          </div>
          <h2 className="text-2xl font-bold mb-4">{whyUs?.reasons?.[0]?.title}</h2>
          <p className="text-gray-700">{whyUs?.reasons?.[0]?.subtitle}</p>
        </div>

        <div className="bg-gray-100 p-6 rounded-3xl">
          <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center mb-4">
            <RocketIcon className="w-6 h-6 text-gray-700" />
          </div>
          <h2 className="text-2xl font-bold mb-4">{whyUs?.reasons?.[1]?.title}</h2>
          <p className="text-gray-700">{whyUs?.reasons?.[1]?.subtitle}</p>
        </div>

        <div className="bg-blue-900 p-6 rounded-3xl text-white row-span-2 md:col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col">
          <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center mb-4">
            <CalendarIcon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">{whyUs?.reasons?.[2]?.title}</h2>
          <p className="mb-4">{whyUs?.reasons?.[2]?.subtitle}</p>
          <div className="mt-auto">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full text-black group text-lg"
              asChild
            >
              <Link href="/">
                Schedule a Call{' '}
                <ArrowRightIcon className="ml-2 w-4 h-4 group-hover:translate-x-1.5 transition-all" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-3xl md:col-span-2 lg:col-span-2">
          <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center mb-4">
            <TargetIcon className="w-6 h-6 text-gray-700" />
          </div>
          <h2 className="text-2xl font-bold mb-4">{whyUs?.reasons?.[3]?.title}</h2>
          <p className="text-gray-700">{whyUs?.reasons?.[3]?.subtitle}</p>
        </div>
      </div>
    </section>
  )
}
