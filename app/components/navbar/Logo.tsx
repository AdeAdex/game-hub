import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <>
    <div className='w-[40px] h-[40px] md:w-[50px] md:h-[50px] relative'>
    <Image src="/images/ade.png" alt='logo' fill quality={100} className=''/>
    </div>
    </>
  )
}

export default Logo