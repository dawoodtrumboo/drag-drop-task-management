import { StoreContext } from "@/app/context/context";
import { googleSignin } from "@/services/authApi";
import { useRouter } from "next/router";
import { useContext, useEffect, useLayoutEffect } from "react";

const GoogleCallback: React.FC = () => {
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
      }
    };

    if (code) {
      fetchUserData();
    }
  }, [code]);

  return <div></div>;
};

export default GoogleCallback;
