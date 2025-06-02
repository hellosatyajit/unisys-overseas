import { type ComponentProps } from 'react'
import ContactForm from '../Forms/Contact'

interface ContactInfo {
  address: string
  email: string
  phone: string
}

interface AboutContactProps {
  title: string
  description: string
  contactInfo: ContactInfo
}

export function AboutContact({ title, description, contactInfo }: AboutContactProps) {
  return (
    <section id="contact" className="w-full  py-8 md:py-12 lg:py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-left text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary lg:mb-0 mb-4">
                {title}
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">{description}</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                <span className="max-w-[300px]">{contactInfo.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MailIcon className="h-5 w-5 text-muted-foreground" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-primary">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-muted-foreground" />
                <a href={`tel:${contactInfo.phone}`} className="hover:text-primary">
                  {contactInfo.phone}
                </a>
              </div>
            </div>
          </div>
          <div className="rounded-3xl  bg-card p-6 shadow-sm">
            <h3 className="text-xl font-bold">Send us a message</h3>
            <div className="mt-4">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Icons
function MapPinIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function MailIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function PhoneIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
