"use client"
import React, { Suspense, useContext, useEffect, useLayoutEffect, useRef } from 'react'
import GoogleCallback from '../../components/GoogleCallback'
import { useSearchParams,useRouter } from 'next/navigation'
import { googleSignin } from '@/services/authApi'
import { StoreContext } from '@/app/context/context'




const Page = () => {



  return (
    <Suspense>
    <GoogleCallback/>
    </Suspense>
    
  )
}

export default Page
