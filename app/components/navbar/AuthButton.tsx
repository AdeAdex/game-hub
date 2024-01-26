import React from 'react'

interface AuthButtonPros {
        title: string
}

const AuthButton: React.FC<AuthButtonPros> = ({title}) => {
  return (
    <>
    <button className='text-[14px] capitalize leading-[28px] border border-2 my-auto px-4 py-[-5px]'>{title}</button>
    </>
  )
}

export default AuthButton