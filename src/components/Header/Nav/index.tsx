'use client'

import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/ui'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div>
      <nav className="hidden sm:flex gap-3 items-center">
        {navItems.map(({ link }, i) => (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className={cn('text-base', pathname === link.url ? 'text-primary' : 'text-secondary')}
          />
        ))}
        <CMSLink
          appearance="default"
          className="text-base ml-4"
          label="Inquiry Now"
          url="/inquiry"
          newTab={false}
        />
      </nav>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="sm:hidden flex items-center p-2 focus:outline-none"
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {menuOpen && (
        <div className="sm:hidden absolute top-16 left-0 right-0 bg-white shadow-md z-50 p-4 space-y-2">
          {navItems.map(({ link }, i) => (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className={cn(
                'block text-base',
                pathname === link.url ? 'text-primary' : 'text-secondary',
              )}
            />
          ))}
          <CMSLink
            appearance="default"
            className="block text-base text-center"
            label="Inquiry Now"
            url="/inquiry"
            newTab={false}
          />
        </div>
      )}
    </div>
  )
}
