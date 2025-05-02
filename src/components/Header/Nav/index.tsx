'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/ui'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()

  return (
    <nav className="hidden sm:flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className={cn('text-base ', pathname === link.url ? 'text-primary' : 'text-secondary')}
          />
        )
      })}
      <CMSLink
        appearance="default"
        className="text-base ml-4"
        label="Inquiry Now"
        url="/inquiry"
        newTab={false}
      />
    </nav>
  )
}
