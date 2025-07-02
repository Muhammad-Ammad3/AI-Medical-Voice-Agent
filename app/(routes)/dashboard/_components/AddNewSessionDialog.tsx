import React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

function AddNewSessionDialog() {
  return (
    <Dialog>
  <DialogTrigger>
    <Button className='mt-3'>+ Start a Consultation</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add Basics Details</DialogTitle>
      <DialogDescription asChild>
      <div>
        <h2>Add Symptoms or Any Other Details</h2>
        <Textarea placeholder='Add Details here...' className='h-[200px] mt-1'/>
      </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <DialogClose>
        <Button variant={'outline'}>Cancel</Button>
        </DialogClose>
        <Button>Start</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

export default AddNewSessionDialog