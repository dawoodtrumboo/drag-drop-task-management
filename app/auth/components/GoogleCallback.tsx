"use client"
import { StoreContext } from "@/app/context/context";
import { googleSignin } from "@/services/authApi";
import { LoadingOutlined } from "@ant-design/icons";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useContext, useLayoutEffect, useRef } from "react";

const GoogleCallback: React.FC = () => {
 
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

  return  <div className='h-screen w-screen flex items-center justify-center'>
  <LoadingOutlined className="text-[100px]"/>
  </div>;
};

export default GoogleCallback;
