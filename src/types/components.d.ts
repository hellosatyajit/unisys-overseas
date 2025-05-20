declare module '@/components/Gutter' {
  import React from 'react'

  interface GutterProps {
    children: React.ReactNode
    className?: string
  }

  export const Gutter: React.FC<GutterProps>
}

declare module '@/utilities/mergeOpenGraph' {
  import { Metadata } from 'next'

  interface OpenGraphProps {
    title?: string
    description?: string
    image?: string
    url?: string
  }

  export function mergeOpenGraph(og?: OpenGraphProps): Metadata['openGraph']
}
