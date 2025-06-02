import { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { AboutPage, Footer } from '@/payload-types'
import { AboutContact } from '@/components/about/about-contact'
import { getCachedGlobal } from '@/utilities/getGlobals'

async function getContactInfo() {
  const payload = await getPayload({ config: configPromise })

  const [aboutPage, footerData] = await Promise.all([
    payload.findGlobal({
      slug: 'about-page',
    }) as Promise<AboutPage>,
    getCachedGlobal('footer', 1)() as Promise<Footer>,
  ])

  return {
    title: aboutPage.contactTitle,
    description: aboutPage.contactDescription,
    contactInfo: {
      address: footerData.contact.address.trim(),
      email: footerData.contact.email.trim(),
      phone: footerData.contact.call.trim(),
    },
  }
}

export default async function ContactPage() {
  const contactData = await getContactInfo()

  return (
    <main>
      <AboutContact
        {...contactData}
        title={contactData.title}
        description={contactData.description}
      />
      <div className=" flex overflow-hidden justify-center m-auto bg-none w-[80%]  rounded-3xl py-8 md:py-12 lg:py-16">
        <iframe
          className="h-96"
          width="100%"
          src="https://maps.google.com/maps?width=600&height=400&hl=en&q=Shivam Fabricon, Silver Oak College, Sg Highway, Ahmedabad&t=&z=14&ie=UTF8&iwloc=B&output=embed"
        ></iframe>
      </div>
    </main>
  )
}
