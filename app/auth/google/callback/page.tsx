'use client'
import React, { useContext, useEffect } from 'react'
import GoogleCallback from '../../components/GoogleCallback'
import { useRouter } from 'next/router';
import { googleSignin } from '@/services/authApi';
import { StoreContext } from '@/app/context/context';

const Callback = () => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code"); // The authorization code from Google
    const{setAuth} = useContext(StoreContext)
    const router = useRouter()
    useEffect(() => {
      
      const fetchUserData = async () => {
        try {
          const data = await googleSignin(code);
          console.log(data)
          if (data) {
            // Save the token and user data in local storage or context
            localStorage.setItem("userDetails", JSON.stringify(data));
            setAuth(data);
            router.push("/");
           
  
            // Optionally, you could save user data to context or state
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          router.push('/auth')
        }
      };
  
      if (code) {
        fetchUserData();
      }
    }, [code,query]);
  
  return (
    <div>
      
    </div>
  )
}

export default Callback
