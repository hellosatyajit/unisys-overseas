import mixpanel from 'mixpanel-browser'

// Initialize Mixpanel
mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '', {
  debug: process.env.NODE_ENV === 'development',
  track_pageview: true,
  persistence: 'localStorage',
})

// Analytics event names
export const AnalyticsEvents = {
  PAGE_VIEW: 'Page View',
  BUTTON_CLICK: 'Button Click',
  FORM_SUBMIT: 'Form Submit',
  LINK_CLICK: 'Link Click',
  SEARCH: 'Search',
  SIGN_UP: 'Sign Up',
  LOGIN: 'Login',
  LOGOUT: 'Logout',
} as const

// Analytics helper functions
export const analytics = {
  // Track page views
  trackPageView: (pageName: string, properties?: Record<string, any>) => {
    mixpanel.track(AnalyticsEvents.PAGE_VIEW, {
      page: pageName,
      ...properties,
    })
  },

  // Track button clicks
  trackButtonClick: (buttonName: string, properties?: Record<string, any>) => {
    mixpanel.track(AnalyticsEvents.BUTTON_CLICK, {
      button: buttonName,
      ...properties,
    })
  },

  // Track form submissions
  trackFormSubmit: (formName: string, properties?: Record<string, any>) => {
    mixpanel.track(AnalyticsEvents.FORM_SUBMIT, {
      form: formName,
      ...properties,
    })
  },

  // Track link clicks
  trackLinkClick: (linkName: string, properties?: Record<string, any>) => {
    mixpanel.track(AnalyticsEvents.LINK_CLICK, {
      link: linkName,
      ...properties,
    })
  },

  // Track search events
  trackSearch: (searchTerm: string, properties?: Record<string, any>) => {
    mixpanel.track(AnalyticsEvents.SEARCH, {
      search_term: searchTerm,
      ...properties,
    })
  },

  // Track user sign up
  trackSignUp: (properties?: Record<string, any>) => {
    mixpanel.track(AnalyticsEvents.SIGN_UP, properties)
  },

  // Track user login
  trackLogin: (properties?: Record<string, any>) => {
    mixpanel.track(AnalyticsEvents.LOGIN, properties)
  },

  // Track user logout
  trackLogout: (properties?: Record<string, any>) => {
    mixpanel.track(AnalyticsEvents.LOGOUT, properties)
  },

  // Identify user
  identify: (userId: string, userProperties?: Record<string, any>) => {
    mixpanel.identify(userId)
    if (userProperties) {
      mixpanel.people.set(userProperties)
    }
  },

  // Reset user
  reset: () => {
    mixpanel.reset()
  },
}
