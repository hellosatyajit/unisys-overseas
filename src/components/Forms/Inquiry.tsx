'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import BaseForm from './Base'
import { Button } from '../ui/button'

export default function InquiryForm({ fullWidth }: { fullWidth?: boolean }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={fullWidth ? 'w-full rounded-none border-t border-red-800' : ''}>
          Inquiry Now
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Inquiry</DialogTitle>
          <DialogDescription>Fill the form to get in touch with us</DialogDescription>
        </DialogHeader>
        <BaseForm formId="6826d9a4c2e3a5456fc4efa6" />
      </DialogContent>
    </Dialog>
  )
}
