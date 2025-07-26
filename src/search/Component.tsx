'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button' // Import the themed button
import type React from 'react'
import { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const router = useRouter()

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
  }, [debouncedValue, router])

  return (
    <div className="w-full">
      <div className="mx-auto max-w-5xl sm:text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Discover Amazing <span className="text-primary">Content</span>
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Search through our comprehensive collection of articles, insights, and resources. Find
          exactly what you need with our intelligent search system and expert curation.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          router.push(`/search${value ? `?q=${value}` : ''}`)
        }}
        className="flex flex-col sm:flex-row gap-3 w-full mb-16"
      >
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder="What are you looking for?"
          className="flex-1 min-w-0 h-12 px-4 text-base rounded-full border-2 border-border/50 bg-background/50 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
        <Button
          type="submit"
          className="h-12 px-8 rounded-full bg-primary text-primary-foreground font-medium  transition-all duration-200 sm:w-auto w-full"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Search
        </Button>
      </form>
    </div>
  )
}
