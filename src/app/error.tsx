'use client'

import { Button } from '@/components/ui/button'
import { AlertCircleIcon, AlertTriangleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const error = ({error,reset}: {error:Error & {digest?: string} , reset:()=> void}) => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center space-y-6'>
      <div className='text-center space-y-4'>
        <div className='flex justify-center'>
            <div className='bg-rose-100 p-3 rounded-full'>
                <AlertTriangleIcon  className='size-10 text-rose-600'/>
            </div>
        </div>
        <div className='space-y-2'>
            <h2 className='text-left font-semibold text-gray-900'>Something went wrong</h2>
            <p>{error.message}</p>
        </div>
      </div>
      <div className='flex items-center gap-x-3'>
        <Button onClick={reset}
            className='font-medium px-6'
        >
            Try again
        </Button>
        <Button asChild
        variant={'ghost'}
            className='font-medium px-6'
        >
            <Link href={'/'}>
            
            Go back
            </Link>
        </Button>
      </div>
    </div>
  )
}

export default error
