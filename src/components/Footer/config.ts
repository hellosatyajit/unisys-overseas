import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'call',
          type: 'text',
          required: true,
        },
        {
          name: 'chat',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'text',
          required: true,
        },
        {
          name: 'address',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'socials',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          required: true,
        },
        {
          name: 'twitter',
          type: 'text',
          required: true,
        },
        {
          name: 'instagram',
          type: 'text',
          required: true,
        },
        {
          name: 'linkedin',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
