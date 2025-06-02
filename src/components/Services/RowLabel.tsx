'use client'
import { Service, ServicesCollection } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Service['services']>[number]>()

  const label = (data?.data?.service as ServicesCollection)?.title
    ? `Service item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${(data?.data?.service as ServicesCollection)?.title}`
    : 'Row'

  return <div>{label}</div>
}
