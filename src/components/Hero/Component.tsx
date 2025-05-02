import { HeroCarouselClient, HeroContentClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'

import type { HeroCarousel, HeroContent } from '@/payload-types'

export async function HeroCarousel() {
  const headerData: HeroCarousel = await getCachedGlobal('hero-carousel', 1)()

  return <HeroCarouselClient data={headerData} />
}

export async function HeroContent() {
  const headerData = await getCachedGlobal('hero-content', 1)()

  return <HeroContentClient data={headerData as HeroContent} />
}
