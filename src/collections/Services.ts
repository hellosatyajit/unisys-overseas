import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services-collection',
  admin: {
    useAsTitle: 'title',
  },
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
      name: 'tagline',
      type: 'text',
      required: true,
      admin: {
        description: 'A short, catchy phrase that describes the service',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'ctaLabel',
      type: 'text',
      required: true,
      defaultValue: 'Learn More',
      admin: {
        description: 'The .text to display on the call-to-action button',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Is this service currently available?',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Order in which this service appears in the list',
      },
    },
    {
      name: 'content',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'contentType',
          type: 'select',
          required: true,
          options: [
            { label: 'Text and Image', value: 'text-image' },
            { label: 'Full Width Text', value: 'full-width' },
          ],
        },
        {
          name: 'text',
          type: 'richText',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (data, siblingData) => siblingData?.contentType === 'text-image',
          },
        },
        {
          name: 'backgroundColor',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'blue-50' },
            { label: 'Gray', value: 'gray-50' },
          ],
          admin: {
            condition: (data, siblingData) => siblingData?.contentType === 'full-width',
          },
        },
      ],
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
    },
  ],
}
