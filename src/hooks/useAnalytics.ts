import { useCallback } from 'react'
import { analytics, AnalyticsEvents } from '../utilities/analytics'
import type { MixpanelProperties } from '../types/analytics' // 👈 update this path if needed

export const useAnalytics = () => {
  const trackPageView = useCallback(
    (pageName: string, properties?: MixpanelProperties) => {
      analytics.trackPageView(pageName, properties)
    },
    []
  )

  const trackButtonClick = useCallback(
    (buttonName: string, properties?: MixpanelProperties) => {
      analytics.trackButtonClick(buttonName, properties)
    },
    []
  )

  const trackFormSubmit = useCallback(
    (formName: string, properties?: MixpanelProperties) => {
      analytics.trackFormSubmit(formName, properties)
    },
    []
  )

  const trackLinkClick = useCallback(
    (linkName: string, properties?: MixpanelProperties) => {
      analytics.trackLinkClick(linkName, properties)
    },
    []
  )

  const trackSearch = useCallback(
    (searchTerm: string, properties?: MixpanelProperties) => {
      analytics.trackSearch(searchTerm, properties)
    },
    []
  )

  const trackSignUp = useCallback(
    (properties?: MixpanelProperties) => {
      analytics.trackSignUp(properties)
    },
    []
  )

  const trackLogin = useCallback(
    (properties?: MixpanelProperties) => {
      analytics.trackLogin(properties)
    },
    []
  )

  const trackLogout = useCallback(
    (properties?: MixpanelProperties) => {
      analytics.trackLogout(properties)
    },
    []
  )

  const identify = useCallback(
    (userId: string, userProperties?: MixpanelProperties) => {
      analytics.identify(userId, userProperties)
    },
    []
  )

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
