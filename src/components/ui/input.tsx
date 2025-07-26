import { cn } from '@/utilities/ui'
import * as React from 'react'

const Input: React.FC<
  {
    ref?: React.Ref<HTMLInputElement>
  } & React.InputHTMLAttributes<HTMLInputElement>
> = ({ type, className, ref, ...props }) => {
  return (
    <input
      className={cn(
        'flex h-10 w-full rounded-full border border-border bg-background px-3 py-2 text-sm  focus-visible:outline-none ',
        className,
      )}
      ref={ref}
      type={type}
      {...props}
    />
  )
}

export { Input }