'use client'
import { Faq } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Faq['faqs']>[number]>()

  const label = data?.data?.question
    ? `FAQ item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.question}`
    : 'Row'

  return <div>{label}</div>
}
