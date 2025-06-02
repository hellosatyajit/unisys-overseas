import type { CollectionConfig } from 'payload'

export const AboutPageCollection: CollectionConfig = {
  slug: 'about-page',
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
      name: 'metaDescription',
      type: 'textarea',
      admin: {
        description: 'This is used for SEO purposes.',
      },
    },
    // Hero Section
    {
      name: 'heroSection',
      type: 'group',
      fields: [
        {
          name: 'heroTitle',
          type: 'text',
          required: true,
          defaultValue: 'About Our Consultancy',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    // Mission Section
    {
      name: 'missionSection',
      type: 'group',
      fields: [
        {
          name: 'missionTitle',
          type: 'text',
          required: true,
          defaultValue: 'Our Mission',
        },
        {
          name: 'missionDescription',
          type: 'text',
          required: true,
          defaultValue:
            'We are dedicated to helping businesses achieve their full potential through strategic consulting and innovative solutions.',
        },
        {
          name: 'missionImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'stats',
          type: 'array',
          maxRows: 4,
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    // Values Section
    {
      name: 'valuesSection',
      type: 'group',
      fields: [
        {
          name: 'values',
          type: 'array',
          maxRows: 6,
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
              name: 'icon',
              type: 'text',
              admin: {
                description: 'Enter an emoji or icon character',
              },
              required: true,
            },
          ],
        },
      ],
    },
    // Team Section
    {
      name: 'teamSection',
      type: 'group',
      fields: [
        {
          name: 'teamTitle',
          type: 'text',
          required: true,
          defaultValue: 'Meet Our Team',
        },
        {
          name: 'teamDescription',
          type: 'textarea',
          required: true,
          defaultValue:
            'Our team of experts brings decades of experience across various industries.',
        },
      ],
    },
    // Timeline Section
    {
      name: 'timelineSection',
      type: 'group',
      fields: [
        {
          name: 'timelineTitle',
          type: 'text',
          required: true,
          defaultValue: 'Our Journey',
        },
        {
          name: 'timelineDescription',
          type: 'textarea',
          required: true,
          defaultValue: 'How we evolved from a small startup to an industry leader.',
        },
        {
          name: 'milestones',
          type: 'array',
          fields: [
            {
              name: 'year',
              type: 'text',
              required: true,
            },
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
          ],
        },
      ],
    },
    // Testimonials Section

    // Partners Section
    {
      name: 'partnersSection',
      type: 'group',
      fields: [
        {
          name: 'partnersTitle',
          type: 'text',
          required: true,
          defaultValue: 'Our Partners',
        },
        {
          name: 'partnersDescription',
          type: 'textarea',
          required: true,
          defaultValue: 'We collaborate with leading organizations to deliver exceptional results.',
        },
      ],
    },
    // Contact Section
    {
      name: 'contactSection',
      type: 'group',
      fields: [
        {
          name: 'contactTitle',
          type: 'text',
          required: true,
          defaultValue: 'Get In Touch',
        },
        {
          name: 'contactDescription',
          type: 'textarea',
          required: true,
          defaultValue: 'Have a question or want to work together? Reach out to us.',
        },
      ],
    },
  ],
}
