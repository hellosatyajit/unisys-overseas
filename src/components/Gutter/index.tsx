import React from 'react'
import { cn } from '@/utilities/ui'

interface GutterProps {
  children: React.ReactNode
  className?: string
}

export const Gutter: React.FC<GutterProps> = ({ children, className }) => {
  return (
    <div className={cn('px-5 md:px-10 lg:px-20 max-w-screen-2xl mx-auto', className)}>
      {children}
    </div>
  )
}
