import { Button } from '@/components/ui/button'
import { CUSTOMER_HEADER } from '@/lib/enum/CustomerHeader'
import Image from 'next/image'
import React from 'react'


const Customerheader = () => {
  return (
    <div className='flex h-[80px]'>
      <Image src="/Logo.png" alt="Logo" width={100} height={60} />
      <div className='flex items-center justify-between w-full h-full px-4'>
        <div className="flex flex-row w-full gap-5">
          {
            CUSTOMER_HEADER.map((item, index) => {
              return (
                <div key={index} className="flex flex-row items-center">
                  <div className='font-semibold'>{item.name}</div>
                </div>
              )
            })
          }
        </div>
        <div className="flex flex-row items-center min-w-[180px]">
          <Button className='me-3 border-[#767676]'>Sign in</Button>
          <Button className='me-3'>Register</Button>          
        </div>
      </div>
    </div>
  )
}

export default Customerheader