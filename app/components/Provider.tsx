// app/components/Provider.tsx

"use client"

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react';



interface ProviderProps{
  session?: any;
  children: ReactNode;
}

const Provider: React.FC<ProviderProps> = ({children, session}) => {
  return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  )
}

export default Provider