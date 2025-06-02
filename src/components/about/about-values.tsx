import type { AboutValuesProps } from './config'

export function AboutValues({ values }: AboutValuesProps) {
  return (
    <section className="py-8 md:py-12 lg:py-16 ">
      <div className="container px-4 md:px-6">
        <div className="space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-left sm:text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary lg:mb-0 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 text-lg">The principles that guide everything we do</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex flex-col bg-gray-50 rounded-3xl items-center space-y-4 text-center p-8"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl">{value.icon}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
