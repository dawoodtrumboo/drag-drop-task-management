import {
  GetTaskParamsType,
  CreateTaskPayload,
  UpdateTaskPayload,
  FindTaskParam,
} from "@/types/TaskTypes";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const headers = (token: string) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

export const generateSuggestion = async (
  body: UpdateTaskPayload | CreateTaskPayload,
  token: string
) => {
  const response = await fetch(`${API_URL}/generateSuggestion`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();
  return data.suggestion;
};
