'use client'
import { Service } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Service['services']>[number]>()

  const label = data?.data?.title
    ? `Service item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.title}`
    : 'Row'

  return <div>{label}</div>
}
