'use client'
import { WhyUs } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<WhyUs['reasons']>[number]>()

  const label = data?.data?.title
    ? `Reason item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.title}`
    : 'Row'

  return <div>{label}</div>
}
