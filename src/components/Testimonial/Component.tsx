import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Testimonial } from '@/payload-types'
import { TestimonialClient } from './Component.client'

export async function Testimonial() {
  const testimonial = (await getCachedGlobal('testimonial', 1)()) as Testimonial

  return <TestimonialClient testimonial={testimonial} />
}
