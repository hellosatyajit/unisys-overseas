'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useAnalytics } from '../hooks/useAnalytics'

export const AnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    // Track page views when the route changes
    if (pathname) {
      const url = searchParams?.size ? `${pathname}?${searchParams.toString()}` : pathname

      trackPageView(url, {
        path: pathname,
        search: searchParams?.toString(),
        url: window.location.href,
      })
    }
  }, [pathname, searchParams, trackPageView])

  return <>{children}</>
}
