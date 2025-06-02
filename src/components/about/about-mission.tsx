import Image from 'next/image'

interface Stat {
  value: string
  label: string
}

interface AboutMissionProps {
  title: string
  description: string
  image: {
    url: string
    alt: string
  }
  stats: Stat[]
}

export function AboutMission({ title, description, image, stats }: AboutMissionProps) {
  console.log(image)

  return (
    <section id="mission" className="w-full py-8 md:py-12 lg:py-16  bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="relative h-[350px] w-full overflow-hidden rounded-lg md:h-[450px] lg:h-[500px]">
              <Image
                src={image.url || '/placeholder.svg'}
                alt={image.alt || 'missionImg'}
                fill
                className="object-cover rounded-3xl"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-6 order-1 lg:order-2">
            <div className="space-y-4">
              <h1 className="text-left text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary lg:mb-0 mb-4">
                {title}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-lg">{description}</p>
            </div>
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col rounded-3xl items-center justify-center space-y-2  bg-muted p-4"
                  >
                    <span className="text-2xl font-bold md:text-3xl">{stat.value}</span>
                    <span className="text-center text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
