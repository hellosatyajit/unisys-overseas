'use client'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { useEffect, useRef } from 'react'
import { FormBlock } from '@/blocks/Form/Component'

import { useState } from 'react'

export default function BaseForm({ formId }: { formId: string }) {
  const [cmsForm, setCmsForm] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    fetch(`/api/forms/${formId}`)
      .then((res) => res.json())
      .then((data) => {
        setCmsForm(data)
      })
      .catch((err) => setError('Error loading form'))
  }, [formId])

  if (!cmsForm) return <div>Loading...</div>

  if (error) return <div>{error}</div>

  if (success && cmsForm.confirmationMessage) {
    setTimeout(() => {
      setSuccess(false)
    }, 5000)
    return <RichText data={cmsForm.confirmationMessage} />
  }

  return <FormBlock id={formId} enableIntro={false} form={cmsForm} />
}
