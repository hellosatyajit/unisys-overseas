import type { AboutTimelineProps } from './config'

export function AboutTimeline({ title, description, milestones }: AboutTimelineProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="space-y-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-left sm:text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary lg:mb-0 mb-4">
                {title}
              </h1>
              <p className="max-w-[900px] text-muted-foreground md:text-lg">{description}</p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl">
            <div className="relative">
              <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-border" />
              {milestones.map((milestone, index) => (
                <div key={index} className="relative mb-12 flex flex-col md:flex-row items-center">
                  <div className="absolute left-1/2 -translate-x-1/2 transform">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground">
                      {index + 1}
                    </div>
                  </div>
                  <div
                    className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'}`}
                  >
                    <div className="rounded-3xl border bg-card p-4 shadow-sm">
                      <span className="text-sm font-medium text-muted-foreground">
                        {milestone.year}
                      </span>
                      <h3 className="text-lg font-bold">{milestone.title}</h3>
                      <p className="mt-1 text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
