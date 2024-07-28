import { useEffect, useLayoutEffect } from "react";

const GoogleCallback: React.FC = () => {
  const query = new URLSearchParams(location.search);
  const code = query.get("code"); // The authorization code from Google

  useLayoutEffect(() => {
    // Exchange the authorization code for a token
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${"import.meta.env.VITE_API_BASE_URL"}/auth/google/callback?code=${code}`
        );
        const data = await response.json();

        if (data) {
          // Save the token and user data in local storage or context
          localStorage.setItem("userDetails", JSON.stringify(data));

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
