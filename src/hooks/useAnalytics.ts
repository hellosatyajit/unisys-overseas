import { useCallback } from 'react'
import { analytics, AnalyticsEvents } from '../utilities/analytics'

export const useAnalytics = () => {
  const trackPageView = useCallback((pageName: string, properties?: Record<string, any>) => {
    analytics.trackPageView(pageName, properties)
  }, [])

  const trackButtonClick = useCallback((buttonName: string, properties?: Record<string, any>) => {
    analytics.trackButtonClick(buttonName, properties)
  }, [])

  const trackFormSubmit = useCallback((formName: string, properties?: Record<string, any>) => {
    analytics.trackFormSubmit(formName, properties)
  }, [])

  const trackLinkClick = useCallback((linkName: string, properties?: Record<string, any>) => {
    analytics.trackLinkClick(linkName, properties)
  }, [])

  const trackSearch = useCallback((searchTerm: string, properties?: Record<string, any>) => {
    analytics.trackSearch(searchTerm, properties)
  }, [])

  const trackSignUp = useCallback((properties?: Record<string, any>) => {
    analytics.trackSignUp(properties)
  }, [])

  const trackLogin = useCallback((properties?: Record<string, any>) => {
    analytics.trackLogin(properties)
  }, [])

  const trackLogout = useCallback((properties?: Record<string, any>) => {
    analytics.trackLogout(properties)
  }, [])

  const identify = useCallback((userId: string, userProperties?: Record<string, any>) => {
    analytics.identify(userId, userProperties)
  }, [])

  const reset = useCallback(() => {
    analytics.reset()
  }, [])

  return {
    trackPageView,
    trackButtonClick,
    trackFormSubmit,
    trackLinkClick,
    trackSearch,
    trackSignUp,
    trackLogin,
    trackLogout,
    identify,
    reset,
    AnalyticsEvents,
  }
}
