import { link } from '@/fields/link'
import type { GlobalConfig } from 'payload'
import { revalidateHeroCarousel } from './hooks/revalidateHeroCarousel'
import { revalidateHeroContent } from './hooks/revalidateHeroContent'

export const HeroCarousel: GlobalConfig = {
  slug: 'hero-carousel',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'carouselItems',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
        },
        link({
          appearances: false,
        }),
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'order',
          type: 'number',
          required: true,
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Hero/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeroCarousel],
  },
}

export const HeroContent: GlobalConfig = {
  slug: 'hero-content',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
    },
    link({
      name: 'primaryButton',
      appearances: false,
    }),
    link({
      name: 'secondaryButton',
      appearances: false,
    }),
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateHeroContent],
  },
}
