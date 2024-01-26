import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <>
    <Image src="/images/ade.png" alt='logo' width={50} height={50} quality={100} className=''/>
    </>
  )
}

export default Logo