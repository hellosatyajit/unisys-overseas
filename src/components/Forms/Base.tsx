'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { useEffect, useState } from 'react'
import { FormBlock } from '@/blocks/Form/Component'
import { Skeleton } from '../ui/skeleton'
import { useAnalytics } from '@/hooks/useAnalytics'

export default function BaseForm({ formId }: { formId: string }) {
  const [cmsForm, setCmsForm] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [hasTrackedSubmit, setHasTrackedSubmit] = useState<boolean>(false)

  const { trackFormSubmit } = useAnalytics()

  useEffect(() => {
    fetch(`/api/forms/${formId}`)
      .then((res) => res.json())
      .then((data) => {
        setCmsForm(data)
      })
      .catch(() => setError('Error loading form'))
  }, [formId])

  // 🔍 Track only once when success is true
  useEffect(() => {
console.log(success)
    if (success && cmsForm && !hasTrackedSubmit) {
	console.log("form submitted")
      trackFormSubmit(cmsForm?.title || `Form: ${formId}`, {
        form_name: cmsForm?.title || `Form: ${formId}`,
        section: 'BaseForm Component',
        timestamp: new Date().toISOString(),
      })
      setHasTrackedSubmit(true)

      setTimeout(() => {
        setSuccess(false)
        setHasTrackedSubmit(false)
      }, 5000)
    }
  }, [success, cmsForm, hasTrackedSubmit, trackFormSubmit, formId])

  if (!cmsForm)
    return (
      <div className="space-y-4">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-20" />
        <Skeleton className="h-10 w-20" />
      </div>
    )

  if (error) return <div>{error}</div>

  if (success && cmsForm.confirmationMessage) {
    return <RichText data={cmsForm.confirmationMessage} />
  }

  return (
    <FormBlock
      id={formId}
      enableIntro={false}
      form={cmsForm}
      onSuccess={() => setSuccess(true)}
    />
  )
}
