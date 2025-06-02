import Image from 'next/image'

interface AboutHeroProps {
  title: string
  description: string
  image: {
    url: string
    alt: string
  }
}

export function AboutHero({ title, description, image }: AboutHeroProps) {
  console.log('AboutHero received image:', image)

  return (
    <section className="relative w-full overflow-hidden  py-8 md:pb-12 lg:p-16">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-left text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary lg:mb-0 mb-4">
                {title}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">{description}</p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <a
                href="/contact"
                className="inline-flex h-10 items-center rounded-3xl justify-center  bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Contact Us
              </a>
              <a
                href="#mission"
                className="inline-flex h-10 items-center rounded-3xl justify-center  border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-full overflow-hidden rounded-lg md:h-[450px] lg:h-[500px]">
              {image?.url ? (
                <Image
                  src={image.url}
                  alt={image.alt || 'Hero image'}
                  fill
                  className="object-cover rounded-3xl"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <span className="text-muted-foreground">Image not available</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
