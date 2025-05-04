import * as React from 'react'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  return (
    <div
      className={className}
      style={{
        gridColumn: width
          ? `${Math.ceil((Number(width) / 100) * 2)} span / ${Math.ceil((Number(width) / 100) * 2)} span`
          : undefined,
      }}
    >
      {children}
    </div>
  )
}
