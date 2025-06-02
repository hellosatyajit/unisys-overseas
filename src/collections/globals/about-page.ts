import type { GlobalConfig } from 'payload'

export const AboutPageGlobal: GlobalConfig = {
  slug: 'about-page',
  access: {
    read: () => true,
  },
  fields: [
    // Hero Section
    {
      name: 'heroTitle',
      type: 'text',
      required: true,
      defaultValue: 'About Our Consultancy',
    },
    {
      name: 'heroDescription',
      type: 'text',
      required: true,
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    // Mission Section
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

    // Values Section
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

    // Team Section
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
    },

    // Timeline Section
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

    // Testimonials Section

    // Partners Section
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
    },

    // Contact Section
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
    },
  ],
}
