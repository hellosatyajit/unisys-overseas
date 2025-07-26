'use client'

import { useEffect } from 'react'
import { useAnalytics } from '@/hooks/useAnalytics'

type Props = {
  query: string
  totalResults: number
}

export default function SearchAnalyticsClient({ query, totalResults }: Props) {
  const { trackSearch } = useAnalytics()

  useEffect(() => {
    if (!query) return

    trackSearch(query, {
      search_term: query,
      total_results: totalResults,
      page_url: window.location.href,
      timestamp: new Date().toISOString(),
      section: 'Search Results',
    })
  }, [query, totalResults, trackSearch])

  return null
}
