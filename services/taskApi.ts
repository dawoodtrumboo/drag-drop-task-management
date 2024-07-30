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

export const fetchTasks = async (params: GetTaskParamsType, token: string) => {
  const { search, userId, startDate, endDate } = params;
  const queryString = new URLSearchParams({
    ...(search && { search }),
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
    userId,
  }).toString();

  const response = await fetch(`${API_URL}/tasks?${queryString}`, {
    headers: headers(token),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await response.json();
  return data.data;
};

export const fetchTaskById = async (params: FindTaskParam) => {
  const { taskId, userId, token } = params;

  const response = await fetch(`${API_URL}/tasks/${taskId}?userId=${userId}`, {
    headers: headers(token),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await response.json();
  return data;
};

export const addTask = async (body: CreateTaskPayload, token: string) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();
  return data;
};

export const updateTask = async (body: UpdateTaskPayload, token: string) => {
  const response = await fetch(
    `${API_URL}/tasks/${body.id}?userId=${body.userId}`,
    {
      method: "PUT",
      headers: headers(token),
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update task");
  }
  const data = await response.json();
  return data;
};

export const deleteTask = async (params: FindTaskParam) => {
  const { taskId, userId, token } = params;
  const response = await fetch(`${API_URL}/tasks/${taskId}?userId=${userId}`, {
    method: "DELETE",
    headers: headers(token),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }
};
