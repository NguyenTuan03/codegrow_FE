import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Menu, Plus } from 'lucide-react'
import React from 'react'

const QAQCheader = () => {
  return (
    <div className='h-[60px] px-4 flex flex-row items-center justify-between'>
      <div></div>
      <div className='flex items-center gap-5'>
        <Plus/>
        <Menu/>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default QAQCheader