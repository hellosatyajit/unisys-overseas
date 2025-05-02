'use client'
import { Button } from '@/components/ui/button'
import type { HeroCarousel, HeroContent, Media } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { ArrowRightIcon, CheckCircleIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface HeroCarouselClientProps {
  data: HeroCarousel
}

export const HeroCarouselClient: React.FC<HeroCarouselClientProps> = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = data.carouselItems?.sort((a, b) => a.order - b.order) ?? []

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full relative">
      <div className="absolute -top-6 sm:-right-6 -right-2 w-20 h-20 bg-yellow-500/50 rounded-full animate-pulse-soft"></div>
      <div
        className="absolute -bottom-8 -left-8 w-16 h-16 bg-pink-500/50 rounded-full animate-pulse-soft"
        style={{ animationDelay: '1s' }}
      ></div>
      <div
        className="absolute top-1/3 -right-4 w-8 h-8 bg-purple-500/50 rounded-full animate-pulse-soft"
        style={{ animationDelay: '2s' }}
      ></div>
      <div className="relative h-[600px] w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              'absolute inset-0 h-full w-full transition-opacity duration-500',
              currentSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none',
            )}
          >
            <div className="relative h-full w-full">
              <Image
                src={(slide.image as Media).url || '/placeholder.svg'}
                alt={slide.title}
                width={600}
                height={600}
                className="object-cover rounded-3xl w-full h-[600px]"
                priority={index === 0}
              />
              <div className="absolute inset-x-2 bottom-2 p-6 backdrop-blur-2xl bg-white/80 md:p-8 md:pb-16 h-2/5 rounded-xl rounded-b-3xl flex flex-col">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl text-blue-950">
                  {slide.title}
                </h2>
                <p className="text-sm text-gray-600 md:text-base">{slide.subtitle}</p>
                <div className="mt-4">
                  <Button size="lg" className="rounded-full" variant="outline" asChild>
                    <Link href={slide.link.url || '/'} className="gap-2 text-lg">
                      {slide.link.label} <ArrowRightIcon />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute inset-x-0 bottom-5 flex justify-center items-center space-x-2 ">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'h-2 w-2 rounded-full transition-all',
                currentSlide === index ? 'w-4 bg-white' : 'bg-white/50',
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface HeroContentClientProps {
  data: HeroContent
}

export const HeroContentClient: React.FC<HeroContentClientProps> = ({ data }) => {
  return (
    <div className="md:pt-10">
      <h1 className="font-bold text-4xl md:text-5xl tracking-tight">{data.title}</h1>
      <p className="text-lg text-slate-600 mt-4">{data.subtitle}</p>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 font-medium mt-4">
        <Button
          size="lg"
          className="bg-gradient-to-r from-orange-500 to-primary hover:from-orange-600 rounded-full transition-all duration-300 group text-lg gap-2"
          asChild
        >
          <Link href={data.primaryButton.url || '/'}>
            {data.primaryButton.label}{' '}
            <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
        <Button
          variant="link"
          className="font-semibold text-lg items-center justify-center"
          asChild
        >
          <Link href={data.secondaryButton.url || '/'}>{data.secondaryButton.label}</Link>
        </Button>
      </div>
      <ul className="space-y-2 mt-8">
        {data.features?.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
            <span>{feature.title}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-4 mt-8">
        <div className="flex -space-x-4">
          <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold">
            S
          </div>
          <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-white font-bold">
            A
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-400 flex items-center justify-center text-white font-bold">
            M
          </div>
        </div>
        <p className="text-slate-600">
          <span className="font-bold">1000+ students</span> successfully placed in 2025
        </p>
      </div>
    </div>
  )
}
