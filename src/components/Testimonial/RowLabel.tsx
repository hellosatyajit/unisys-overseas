'use client'
import { Country } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Country['countries']>[number]>()

  const label = data?.data?.title
    ? `Testimonial item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.title}`
    : 'Row'

  return <div>{label}</div>
}
