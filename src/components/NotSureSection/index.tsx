import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CONSTANTS } from '@payload-config'
import { ArrowRightIcon } from 'lucide-react'

export const NotSureSection = () => {
  return (
    <section className="px-4 py-8 sm:p-16 bg-blue-50 sm:w-fit sm:mx-auto space-y-8 sm:rounded-3xl">
      <div className="space-y-2 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
          Not Sure What You Looking for?
        </h2>
        <p className="mb-8 text-gray-600 text-base lg:text-lg">
          Book a free consultation with our immigration experts to discuss your options and create a
          personalized plan.
        </p>
      </div>
      <Button size="lg" className="rounded-full sm:mx-auto block w-fit" asChild>
        <Link
          href={CONSTANTS.scheduleCallLink}
          className="gap-2 text-xl flex justify-center items-center"
        >
          Book Free Consultation <ArrowRightIcon />
        </Link>
      </Button>
    </section>
  )
}
