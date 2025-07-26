'use client'

import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post, ServiceCountryDetail, ServicesCollection } from '@/payload-types'
import { useAnalytics } from '@/hooks/useAnalytics'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'services-collection' | 'service-country-details'
    value: Page | Post | ServicesCollection | ServiceCountryDetail | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const { trackLinkClick } = useAnalytics()

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug}`
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const handleClick = () => {
    trackLinkClick(label || 'CMS Link', {
      click_target: href,
      section: 'CMSLink Component',
      timestamp: new Date().toISOString(),
    })
  }

  // Inline link
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href} {...newTabProps} onClick={handleClick}>
        {label}
        {children}
      </Link>
    )
  }

  // Button-style link
  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href} {...newTabProps} onClick={handleClick}>
        {label}
        {children}
      </Link>
    </Button>
  )
}
