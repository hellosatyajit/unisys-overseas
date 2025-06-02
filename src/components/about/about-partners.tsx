import Image from 'next/image'

interface Partner {
  id: string
  name: string
  logo?: {
    url: string
    alt?: string
  }
  website?: string
}

interface AboutPartnersProps {
  title: string
  description: string
  partners: Partner[]
}

export function AboutPartners({ title, description, partners }: AboutPartnersProps) {
  console.log(partners)
  return (
    <section className="w-full pb-4 pt-8 md:pt-12 lg:pt-16 ">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-left text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary lg:mb-0 mb-4">
              {title}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">{description}</p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 py-12 md:grid-cols-3 lg:grid-cols-4">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col items-center justify-center space-y-2 rounded-3xl border bg-gray-50 p-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className="relative h-16 w-full rounded-3xl">
                {partner.logo?.url ? (
                  <Image
                    src={partner.logo.url || '/placeholder.svg'}
                    alt={partner.logo.alt || partner.name}
                    fill
                    className="object-contain rounded-3xl"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <span className="text-muted-foreground">{partner.name}</span>
                  </div>
                )}
              </div>

              {partner.website && (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-primary"
                >
                  Visit Website
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
