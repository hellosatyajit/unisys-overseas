import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Faq } from '@/payload-types'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Button } from '../ui/button'
import Link from 'next/link'
import InquiryForm from '../Forms/Inquiry'

export async function FAQs() {
  const faqs = (await getCachedGlobal('faqs', 1)()) as Faq

  return (
    <section className="py-16 bg-white container mx-auto px-4 space-y-8" id="services">
      <div className="space-y-2 col-span-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary lg:mb-0 mb-4">
          {faqs.title}
        </h2>
        <p className="text-gray-600 lg:max-w-lg">{faqs.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-5 sm:gap-10">
        <div className="bg-blue-50 rounded-3xl p-4 md:col-span-4">
          <Accordion type="single" collapsible>
            {faqs.faqs?.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`} className="last:border-b-0">
                <AccordionTrigger className="text-left text-lg">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="space-y-2 md:col-span-2">
          <h3 className="text-lg sm:text-xl lg:leading-tight font-semibold">
            Have any other questions?
          </h3>
          <p>Don't hesitate to send us and email with your enquiry or doubts at:</p>
          <Button asChild>
            <Link href="mailto:connect@unisysoverseas.com">connect@unisysoverseas.com</Link>
          </Button>
          <p>or fill out the form below:</p>
          <InquiryForm />
        </div>
      </div>
    </section>
  )
}
