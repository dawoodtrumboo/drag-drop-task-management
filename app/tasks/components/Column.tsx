import React, { useContext, useLayoutEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import TaskModal from "./TaskModal";
import DraggableTask from "./DraggableTask";
import { useDroppable } from "@dnd-kit/core";
import Sort from "../../../public/assets/sort.svg";
import {
  ColumnProps,
  CreateTaskPayload,
  UpdateTaskPayload,
} from "@/types/TaskTypes";
import { StoreContext } from "@/app/context/context";
import { addTask, updateTask } from "@/services/taskApi";
import { TaskContext } from "@/app/context/task.context";

const Column: React.FC<ColumnProps> = ({ type, tasks, columnId }) => {
  const{modalOpen,setModalOpen,handleAddTask,handleUpdate} = useContext(TaskContext)
  
  const [isAscending, setIsAscending] = useState(false);
  const {
    success,
    error: errorPopup,
    loading,
    user,
  } = useContext(StoreContext);



  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useLayoutEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  // const handleAdd = async (body: CreateTaskPayload) => {
  //   loading();
  //   try {
  //     const task = await addTask(body, user.token);
  //     setTasks((prev) => [...prev, task]);
  //     setModalOpen(false);
  //     success("Task added successfully!");
  //   } catch (error) {
  //     errorPopup(error.message);
  //   } finally {
  //     loading(false);
  //   }
  // };

  // const handleUpdate = async (body: UpdateTaskPayload) => {
  //   loading();
  //   try {
  //     const updatedTask = await updateTask(body, user.token);
  //     setTasks((prevTasks) =>
  //       prevTasks.map((task) =>
  //         task.id === updatedTask.id ? updatedTask : task
  //       )
  //     );
  //     setModalOpen(false);
  //     success("Task update successfully!");
  //   } catch (error) {
  //     errorPopup(error.message);
  //   } finally {
  //     loading(false);
  //   }
  // };

  const handleOk = async (body: UpdateTaskPayload | CreateTaskPayload) => {
    if ("id" in body) {
      // Update Task
      handleUpdate(body);
    } else {
      // Add Task
      handleAddTask(body);
    }
  };
  const { setNodeRef } = useDroppable({ id: columnId });

  const handleSort = () => {
    const priorities = { Urgent: 3, Medium: 2, Low: 1, None: null }; // Add a default priority for tasks with no priority

    setFilteredTasks((prevTasks) =>
      [...prevTasks].sort((a, b) => {
        const order = isAscending ? 1 : -1;
        const priorityA = priorities[a.priority] || priorities.None; // Assign default priority if undefined
        const priorityB = priorities[b.priority] || priorities.None; // Assign default priority if undefined
        return order * (priorityA - priorityB);
      })
    );

    setIsAscending(!isAscending); // Toggle the sort order
  };
  return (
    <Flex vertical className="w-full" gap={24} ref={setNodeRef}>
      <Flex
        align="center"
        justify="space-between"
        gap={10}
        className="font-light text-lg"
      >
        <span>{type}</span>
        <span onClick={handleSort} className="cursor-pointer">
          <Sort width={20} />
        </span>
      </Flex>
      <Button
        className="w-full font-semibold flex justify-between items-center"
        onClick={() => setModalOpen(`${columnId}`)}
      >
        Add New Task
        <PlusOutlined />
      </Button>
      {filteredTasks?.map((task) => (
        <DraggableTask key={task.id} task={task} handleOk={handleOk} />
      ))}

      {modalOpen==`${columnId}` && (
        <TaskModal
          open={modalOpen==`${columnId}`}
          handleCancel={() => setModalOpen("")}
          handleOk={handleOk}
          isLoading={false}
          title="Add Task"
          type={type}
        />
      )}
    </Flex>
  );
};

export default Column;
