import mixpanel from 'mixpanel-browser'

// Initialize Mixpanel
mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '', {
  debug: process.env.NODE_ENV === 'development',
  track_pageview: false, // we handle pageview manually
  persistence: 'localStorage',
})

// 🔹 Analytics event names
export const AnalyticsEvents = {
  PAGE_VIEW: 'Page Viewed',
  BUTTON_CLICK: 'CTA Clicked',
  FORM_SUBMIT: 'Form Submitted',
  LINK_CLICK: 'Link Clicked',
  SEARCH: 'Search',
  SIGN_UP: 'Sign Up',
  LOGIN: 'Login',
  LOGOUT: 'Logout',
} as const

// 🔹 Optional: Strongly typed union of event names
export type MixpanelEvent = typeof AnalyticsEvents[keyof typeof AnalyticsEvents]

// 🔹 Optional: Common property shape (shared across all events)
export interface MixpanelProperties {
  page_url?: string
  referrer?: string
  device_type?: 'Desktop' | 'Mobile' | 'Tablet'
  button_text?: string
  section?: string
  form_name?: string
  click_target?: string
  timestamp?: string
  [key: string]: any
}

// 🔹 Analytics helper functions
export const analytics = {
  // Page view
  trackPageView: (pageName: string, properties?: MixpanelProperties) => {
    mixpanel.track(AnalyticsEvents.PAGE_VIEW, {
      page: pageName,
      ...properties,
    })
  },

  // CTA/Button Click
  trackButtonClick: (buttonName: string, properties?: MixpanelProperties) => {
    mixpanel.track(AnalyticsEvents.BUTTON_CLICK, {
      button: buttonName,
      ...properties,
    })
  },

  // Form Submit
  trackFormSubmit: (formName: string, properties?: MixpanelProperties) => {
    mixpanel.track(AnalyticsEvents.FORM_SUBMIT, {
      form: formName,
      ...properties,
    })
  },

  // Link Click (Phone, External links, etc.)
  trackLinkClick: (linkName: string, properties?: MixpanelProperties) => {
    mixpanel.track(AnalyticsEvents.LINK_CLICK, {
      link: linkName,
      ...properties,
    })
  },

  // Search event
  trackSearch: (searchTerm: string, properties?: MixpanelProperties) => {
    mixpanel.track(AnalyticsEvents.SEARCH, {
      search_term: searchTerm,
      ...properties,
    })
  },

  // Sign up
  trackSignUp: (properties?: MixpanelProperties) => {
    mixpanel.track(AnalyticsEvents.SIGN_UP, properties)
  },

  // Login
  trackLogin: (properties?: MixpanelProperties) => {
    mixpanel.track(AnalyticsEvents.LOGIN, properties)
  },

  // Logout
  trackLogout: (properties?: MixpanelProperties) => {
    mixpanel.track(AnalyticsEvents.LOGOUT, properties)
  },

  // Identify logged-in user
  identify: (userId: string, userProperties?: MixpanelProperties) => {
    mixpanel.identify(userId)
    if (userProperties) {
      mixpanel.people.set(userProperties)
    }
  },

  // Reset current user
  reset: () => {
    mixpanel.reset()
  },
}
