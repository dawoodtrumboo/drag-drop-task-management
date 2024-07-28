import { LoginPayload, SignupPayload } from "@/types/AuthTypes";

const API_URL = "https://api.dawoodtrumboo.com/auth";

const headers = () => ({
  "Content-Type": "application/json",
});

export const signin = async (body: LoginPayload) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to add task");
  }
  console.log(response);
  const data = await response.json();

  console.log(data);
  return data;
};

export const signup = async (body: SignupPayload) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to add task");
  }

  const data = await response.json();
  return data;
};
