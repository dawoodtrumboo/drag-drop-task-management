"use client";

import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { StoreContext } from "./context";
import { addTask, deleteTask, updateTask } from "@/services/taskApi";
import {
  CreateTaskPayload,
  FetchedTask,
  UpdateTaskPayload,
} from "@/types/TaskTypes";
import { useRouter } from "next/navigation";

type TaskContextType = {
  modalOpen: string;
  setModalOpen: Dispatch<SetStateAction<string>>;
  tasks: FetchedTask[];
  setTasks: Dispatch<SetStateAction<FetchedTask[]>>;
  handleAddTask: (body: CreateTaskPayload) => void;
  handleUpdate: (body: UpdateTaskPayload) => void;
  handleDelete: (taskParam, id) => void;
  logout: () => void;
};
export const TaskContext = React.createContext<TaskContextType>({
  modalOpen: "",
  setModalOpen: () => {},
  tasks: [],
  setTasks: () => {},
  handleAddTask: () => {},
  handleUpdate: () => {},
  logout: () => {},
  handleDelete: () => {},
});

export const TaskProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  const {
    loading,
    success,
    error: errorPopup,
    user,
    setAuth,
  } = useContext(StoreContext);
  const [tasks, setTasks] = useState<FetchedTask[]>([]);
  const [modalOpen, setModalOpen] = useState("");

  const handleAddTask = async (body: CreateTaskPayload) => {
    // Implement the logic for adding a task
    loading();
    try {
      const task = await addTask(body, user.token);
      setTasks((prev) => [...prev, task]);
      setModalOpen("");
      success("Task added successfully!");
    } catch (error) {
      errorPopup(error.message);
    } finally {
      loading(false);
    }
  };

  const handleUpdate = async (body: UpdateTaskPayload) => {
    loading();
    try {
      const updatedTask = await updateTask(body, user.token);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
      setModalOpen("");
      success("Task update successfully!");
    } catch (error) {
      errorPopup(error.message);
    } finally {
      loading(false);
    }
  };

  const handleDelete = async (taskParams, id) => {
    loading();
    try {
      await deleteTask(taskParams);
      const filteredTasks = tasks.filter((task) => task.id !== id);
      setTasks(filteredTasks);
      success("Task deleted successfully");
      setModalOpen("");
    } catch (error) {
      errorPopup(error.message);
    } finally {
      loading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("userDetails");
    setAuth(undefined);
    setTasks([]);
    router.push("/auth");
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        modalOpen,
        setModalOpen,
        logout,
        handleUpdate,
        handleAddTask,
        handleDelete,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
