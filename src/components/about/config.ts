import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Media } from '@/payload-types'

export interface AboutHeroProps {
  title: string
  description: string
  image: {
    url: string
    alt: string
  }
}

export interface AboutMissionProps {
  title: string
  description: string
  image: {
    url: string
    alt: string
  }
  stats: Array<{
    value: string
    label: string
  }>
}

export interface AboutValuesProps {
  values: Array<{
    title: string
    description: string
    icon: string
  }>
}

export interface AboutTimelineProps {
  title: string
  description: string
  milestones: Array<{
    year: string
    title: string
    description: string
  }>
}

export interface AboutTeamProps {
  title: string
  description: string
  members: Array<{
    name: string
    role: string
    image: {
      url: string
      alt: string
    }
    bio: string
  }>
}

export interface AboutPartnersProps {
  title: string
  description: string
  partners: Array<{
    name: string
    logo: {
      url: string
      alt: string
    }
  }>
}

export interface AboutTestimonialsProps {
  title: string
  testimonials: Array<{
    content: string
    author: string
    role: string
    company: string
  }>
}

export interface AboutContactProps {
  title: string
  description: string
  contactInfo: {
    address: string
    email: string
    phone: string
  }
}

export interface AboutData {
  hero: AboutHeroProps
  mission: AboutMissionProps
  values: AboutValuesProps
  timeline: AboutTimelineProps
  team: AboutTeamProps
  partners: AboutPartnersProps
  testimonials: AboutTestimonialsProps
  contact: AboutContactProps
}

interface AboutPageGlobal {
  heroTitle: string
  heroDescription: string
  heroImage: Media
  missionTitle: string
  missionDescription: string
  missionImage: Media
  stats: Array<{
    value: string
    label: string
  }>
  values: Array<{
    title: string
    description: string
    icon: string
  }>
  timelineTitle: string
  timelineDescription: string
  milestones: Array<{
    year: string
    title: string
    description: string
  }>
  teamTitle: string
  teamDescription: string
  teamMembers: Array<{
    name: string
    role: string
    image: Media
    bio: string
  }>
  partnersTitle: string
  partnersDescription: string
  partners: Array<{
    name: string
    logo: Media
  }>
  testimonialsTitle: string
  testimonials: Array<{
    content: string
    author: string
    role: string
    company: string
  }>
  contactTitle: string
  contactDescription: string
  contactInfo: {
    address: string
    email: string
    phone: string
  }
}

export async function getAboutData(): Promise<AboutData> {
  const aboutData = (await getCachedGlobal('about-page', 2)()) as unknown as AboutPageGlobal

  return {
    hero: {
      title: aboutData.heroTitle,
      description: aboutData.heroDescription,
      image: {
        url: aboutData.heroImage?.url || '/placeholder.svg',
        alt: aboutData.heroImage?.alt || 'Hero Image',
      },
    },
    mission: {
      title: aboutData.missionTitle,
      description: aboutData.missionDescription,
      image: {
        url: aboutData.missionImage?.url || '/placeholder.svg',
        alt: aboutData.missionImage?.alt || 'Mission Image',
      },
      stats: aboutData.stats || [],
    },
    values: {
      values: aboutData.values || [],
    },
    timeline: {
      title: aboutData.timelineTitle,
      description: aboutData.timelineDescription,
      milestones: aboutData.milestones || [],
    },
    team: {
      title: aboutData.teamTitle,
      description: aboutData.teamDescription,
      members:
        aboutData.teamMembers?.map((member) => ({
          ...member,
          image: {
            url: member.image?.url || '/placeholder.svg',
            alt: member.image?.alt || `${member.name}'s photo`,
          },
        })) || [],
    },
    partners: {
      title: aboutData.partnersTitle,
      description: aboutData.partnersDescription,
      partners:
        aboutData.partners?.map((partner) => ({
          ...partner,
          logo: {
            url: partner.logo?.url || '/placeholder.svg',
            alt: partner.logo?.alt || `${partner.name} logo`,
          },
        })) || [],
    },
    testimonials: {
      title: aboutData.testimonialsTitle,
      testimonials: aboutData.testimonials || [],
    },
    contact: {
      title: aboutData.contactTitle,
      description: aboutData.contactDescription,
      contactInfo: aboutData.contactInfo || {
        address: '',
        email: '',
        phone: '',
      },
    },
  }
}
