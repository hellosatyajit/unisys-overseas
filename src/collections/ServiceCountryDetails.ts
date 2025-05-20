import type { CollectionConfig } from 'payload'

export const ServiceCountryDetails: CollectionConfig = {
  slug: 'service-country-details',
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
      name: 'service',
      type: 'relationship',
      relationTo: 'services-collection',
      required: true,
    },
    {
      name: 'country',
      type: 'text',
      required: true,
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
            { label: 'Primary', value: 'primary' },
            { label: 'Gray', value: 'gray' },
          ],
          admin: {
            condition: (data, siblingData) => siblingData?.contentType === 'full-width',
          },
        },
      ],
    },
    {
      name: 'serviceType',
      type: 'select',
      required: true,
      options: [
        { label: 'Student Visa', value: 'student-visa' },
        // Add more service types as needed
      ],
    },
    {
      name: 'popularUniversities',
      type: 'array',
      admin: {
        condition: (data) => data?.serviceType === 'student-visa',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'website',
          type: 'text',
        },
      ],
    },
    {
      name: 'popularCities',
      type: 'array',
      admin: {
        condition: (data) => data?.serviceType === 'student-visa',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
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
          type: 'richText',
          required: true,
        },
      ],
    },
  ],
}
