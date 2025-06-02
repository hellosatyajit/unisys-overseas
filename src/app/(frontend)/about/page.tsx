import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import type { GlobalSlug } from 'payload'
import type { CollectionSlug } from 'payload'
import type { Media, Footer } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { AboutHero } from '@/components/about/about-hero'
import { AboutMission } from '@/components/about/about-mission'
import { AboutValues } from '@/components/about/about-values'
import { AboutTeam } from '@/components/about/about-team'
import { AboutTimeline } from '@/components/about/about-timeline'
import { AboutPartners } from '@/components/about/about-partners'
import { AboutContact } from '@/components/about/about-contact'
import configPromise from '@payload-config'

export const COLLECTIONS = {
  TEAM_MEMBERS: 'team-members' as CollectionSlug,
  TESTIMONIALS: 'testimonials' as CollectionSlug,
  PARTNERS: 'partners' as CollectionSlug,
}

interface RichText {
  root: {
    type: string
    children: Array<{
      type: string
      text: string
      [key: string]: any
    }>
  }
}

interface AboutPageData {
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
  partnersTitle: string
  partnersDescription: string
  contactTitle: string
  contactDescription: string
  contactInfo: {
    address: string
    email: string
    phone: string
  }
}

interface TeamMember {
  name: string
  role: string
  image: Media
  bio: string
}

interface Partner {
  name: string
  logo: Media
}

// Helper function to extract text from rich text content
function extractTextFromRichText(richText: RichText): string {
  if (!richText?.root?.children) return ''

  function extractTextFromNode(node: any): string {
    if (typeof node.text === 'string') {
      return node.text
    }

    if (Array.isArray(node.children)) {
      return node.children.map(extractTextFromNode).join(' ')
    }

    return ''
  }

  return richText.root.children.map(extractTextFromNode).join(' ').trim()
}

// Helper function to format image for components
function formatImageForComponent(image: Media | null | undefined): { url: string; alt: string } {
  if (!image || !image.thumbnailURL) {
    return {
      url: '/placeholder.svg',
      alt: 'Default image',
    }
  }

  // Ensure the URL is absolute
  let url = image.thumbnailURL
  if (!url.startsWith('http')) {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    url = `${serverUrl}${url.startsWith('/') ? '' : '/'}${url}`
  }

  return {
    url,
    alt: image.alt || 'Image',
  }
}

export default async function AboutPage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch the about page data and footer data
  const [aboutPageRes, footerData] = await Promise.all([
    payload.findGlobal({
      slug: 'about-page' as GlobalSlug,
    }),
    getCachedGlobal('footer', 1)() as Promise<Footer>,
  ])

  if (!aboutPageRes) {
    return notFound()
  }

  // Fetch team members
  const teamRes = await payload.find({
    collection: COLLECTIONS.TEAM_MEMBERS,
    limit: 100,
    sort: 'order',
  })

  // Fetch testimonials

  // Fetch partners
  const partnersRes = await payload.find({
    collection: COLLECTIONS.PARTNERS,
    limit: 100,
  })

  // Transform the data to match our component props
  const aboutData = aboutPageRes as unknown as AboutPageData

  // Format hero section data
  const heroData = {
    title: aboutData.heroTitle,
    description: aboutData.heroDescription,
    image: formatImageForComponent(aboutData.heroImage),
  }

  const missionData = {
    title: aboutData.missionTitle,
    description: aboutData.missionDescription,
    image: {
      url: aboutData.missionImage.thumbnailURL || '/placeholder.svg',
      alt: aboutData.missionImage.alt || 'Mission Image',
    },
    stats: aboutData.stats.map((stat) => ({
      value: stat.value.trim(),
      label: stat.label.trim(),
    })),
  }
  console.log(aboutData)

  // Format team members data
  const teamMembers = (
    teamRes.docs as unknown as Array<{
      id: string
      name: string
      position: string
      image: Media
      bio: string
      socialLinks?: Array<{
        platform: string
        url: string
      }>
    }>
  ).map((doc) => ({
    id: doc.id || String(Math.random()),
    name: doc.name?.trim() || 'Team Member',
    position: doc.position?.trim() || 'Team Member',
    image: formatImageForComponent(doc.image),
    bio: doc.bio?.trim() || 'No bio available',
    socialLinks: doc.socialLinks?.map((link) => ({
      platform: link.platform?.trim() || 'Social',
      url: link.url?.trim() || '#',
    })),
  }))

  // Format testimonials data

  // Format partners data

  const partners = (
    partnersRes.docs as unknown as Array<{
      id: string
      name: string
      website: string
      logo: Media
    }>
  ).map((doc) => ({
    id: doc.id,
    name: doc.name.trim(),
    website: doc.website.trim(),
    logo: formatImageForComponent(doc.logo),
  }))

  // Format timeline data
  const timelineData = {
    title: aboutData.timelineTitle,
    description: aboutData.timelineDescription,
    milestones: aboutData.milestones.map((milestone) => ({
      year: milestone.year.trim(),
      title: milestone.title.trim(),
      description: milestone.description.trim(),
    })),
  }

  // Format contact data with footer information
  const contactData = {
    title: aboutData.contactTitle,
    description: aboutData.contactDescription,
    contactInfo: {
      address: footerData.contact.address.trim(),
      email: footerData.contact.email.trim(),
      phone: footerData.contact.call.trim(),
    },
  }

  return (
    <main className="min-h-screen">
      <AboutHero {...heroData} />

      <AboutMission {...missionData} />

      <AboutValues values={aboutData.values} />

      <AboutTeam
        title={aboutData.teamTitle}
        description={aboutData.teamDescription}
        members={teamMembers}
      />

      <AboutTimeline {...timelineData} />

      <AboutPartners
        title={aboutData.partnersTitle}
        description={aboutData.partnersDescription}
        partners={partners}
      />

      <AboutContact
        {...contactData}
        title={aboutData.contactTitle}
        description={aboutData.contactDescription}
      />
    </main>
  )
}
