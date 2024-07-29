"use client"
import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react'
import GoogleCallback from '../../components/GoogleCallback'
import { useSearchParams,useRouter } from 'next/navigation'
import { googleSignin } from '@/services/authApi'
import { StoreContext } from '@/app/context/context'




const Page = () => {

  const{setAuth} = useContext(StoreContext)
  const params = useSearchParams()
  const code = params.get('code')
  const router = useRouter()
  const callRef = useRef(null)
  console.log(code)
  useLayoutEffect(() => {
    
    const fetchUserData = async () => {
     
      try {
        const data = await googleSignin(code);
        console.log(data)
        if (data) {
          localStorage.setItem("userDetails", JSON.stringify(data));
          setAuth(data);
          router.replace("/tasks");
      
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    if (code && !callRef.current) {
      fetchUserData();
      callRef.current = true;
    }
  }, []);

  return (
    <div>
    <GoogleCallback/>
    </div>
  )
}

export default Page
