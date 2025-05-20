import { Metadata } from 'next'
import deepMerge from './deepMerge'

interface OpenGraphProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export const mergeOpenGraph = (og?: OpenGraphProps): Metadata['openGraph'] => {
  return deepMerge(
    {
      type: 'website',
      siteName: 'Unisys Overseas',
      locale: 'en_US',
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Unisys Overseas',
        },
      ],
    },
    og || {},
  )
}
