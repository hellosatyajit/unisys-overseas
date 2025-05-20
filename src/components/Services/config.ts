import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateServices } from './hooks/revalidateServices'

export const Services: GlobalConfig = {
  slug: 'services',
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
      name: 'services',
      type: 'array',
      fields: [
        {
          name: 'service',
          type: 'relationship',
          relationTo: 'services-collection',
          required: true,
          admin: {
            description: 'Select a service from the services collection',
          },
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/Services/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateServices],
  },
}
