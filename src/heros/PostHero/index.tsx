import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

function formatDateTime(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="w-full">
      {/* Hero Text Section */}
      <div className="container  mx-auto px-4 pb-8 md:pb-12 lg:pb-16">
        <div className="max-w-4xl mx-auto text-left">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-6 md:mb-6">
            {/* Date */}
            {publishedAt && (
              <time
                dateTime={publishedAt}
                className="text-sm md:text-base font-medium text-gray-700"
              >
                {formatDateTime(publishedAt)}
              </time>
            )}

            {/* Author */}
            {hasAuthors && (
              <span className="text-sm md:text-base font-medium text-gray-700">
                {formatAuthors(populatedAuthors)}
              </span>
            )}

            {/* Categories
            {categories && categories.length > 0 && (
              <div className="flex items-center gap-2">
                {categories.map((category, index) => {
                  if (typeof category === 'object' && category !== null) {
                    const { title: categoryTitle } = category
                    const titleToUse = categoryTitle || 'Untitled category'

                    return (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs md:text-sm font-medium text-gray-600 bg-gray-100 rounded-full"
                      >
                        {titleToUse}
                      </span>
                    )
                  }
                  return null
                })}
              </div>
            )} */}
          </div>
          {/* Title */}
          <h1 className="mb-8 text-4xl font-bold  text-center text-gray-900 md:text-6xl lg:text-7xl leading-tight text-foreground">
            {title}
          </h1>
          {/* Author and Date */}
          {/* Categories */}
          <div className="uppercase mx-auto text-center text-sm mb-4 text-muted-foreground font-medium tracking-wider">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      {heroImage && typeof heroImage !== 'string' && (
        <div className="px-4 max-w-[48rem] mx-auto">
          <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[70vh] overflow-hidden rounded-lg">
            <Media
              fill
              priority
              imgClassName="object-cover rounded-3xl h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[70vh]"
              resource={heroImage}
            />
          </div>
        </div>
      )}
    </div>
  )
}
