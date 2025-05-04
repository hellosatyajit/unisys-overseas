import type { GlobalConfig } from 'payload'

import { revalidateWhyUs } from './hooks/revalidateWhyUs'

export const WhyUs: GlobalConfig = {
  slug: 'why-us',
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
    {
      name: 'reasons',
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
      ],
      maxRows: 4,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/WhyUs/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateWhyUs],
  },
}
