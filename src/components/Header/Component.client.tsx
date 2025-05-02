'use client'
import Link from 'next/link'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { SearchIcon } from 'lucide-react'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  return (
    <>
      <nav className="bg-blue-950 py-2 text-sm">
        <div className="container flex justify-between">
          <div className="flex items-center space-x-2">
            <a href="tel:+919978800755" className="text-white hover:underline">
              99788 00755
            </a>
            <span className="text-white">•</span>
            <a href="mailto:connect@unisysoversea.com" className="text-white hover:underline">
              connect@unisysoversea.com
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/" target="_blank" rel="noreferrer" className="text-white hover:underline">
              Book free consultation
            </a>
            <a href="/search" className="text-white">
              <SearchIcon className="size-4" />
            </a>
          </div>
        </div>
      </nav>
      <header className="z-20 sticky top-0 bg-background">
        <div className="container py-4 flex justify-between">
          <Link href="/">
            <Logo loading="eager" priority="high" />
          </Link>
          <HeaderNav data={data} />
        </div>
      </header>
    </>
  )
}
