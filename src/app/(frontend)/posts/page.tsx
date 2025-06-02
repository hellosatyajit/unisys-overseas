import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 1000,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      heroImage: true,
      categories: true,
      meta: true,
    },
  })
  console.log(posts.docs)

  return (
    <div className="py-20">
      <div className="mx-auto px-4 max-w-4xl sm:text-center pb-10">
        <h1 className="mb-6p  text-4xl font-bold tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
          Your Immigration <span className="text-red-600">Guide</span>
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
          Stay informed with expert articles, immigration news, and practical tips. Our blog is your
          go-to resource for the latest updates, visa guides, and real-world advice to support your
          journey abroad.
        </p>
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container ">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Posts`,
  }
}
