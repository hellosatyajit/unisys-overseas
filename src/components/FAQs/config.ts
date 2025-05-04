import type { GlobalConfig } from 'payload'

import { revalidateFaqs } from './hooks/revalidateFaqs'

export const Faqs: GlobalConfig = {
  slug: 'faqs',
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
      name: 'faqs',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/FAQs/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFaqs],
  },
}
