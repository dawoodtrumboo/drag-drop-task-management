import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Column from "./Column";
import {
  ColumnType,
  FetchedTask,
  UpdateTaskParams,
  UpdateTaskPayload,
} from "@/types/TaskTypes";
import { Flex, Layout } from "antd";
import React, { useContext, useLayoutEffect, useState } from "react";
import { StoreContext } from "@/app/context/context";
import { updateTask } from "@/services/taskApi";
import { TaskContext } from "@/app/context/task.context";

const BoardView: React.FC = () => {
  const {  user } = React.useContext(StoreContext);
  const {tasks,setTasks } = useContext(TaskContext)

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as ColumnType;
    const overId = over.id as ColumnType;

    // Determine the new column for the dragged task
    const updatedTask = tasks.find((task) => task.id === activeId);

    if (updatedTask && overId !== updatedTask.status) {
      const updatedTaskData = { ...updatedTask, status: overId };

      const updatedTasks: FetchedTask[] = tasks.map((task: FetchedTask) =>
        task.id === activeId ? updatedTaskData : task
      );
      setTasks(updatedTasks);
      updateTask(updatedTaskData, user.token);
    }
  };

  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 500);
    }
  }, []);
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <Layout className="bg-white px-5 py-5 border w-full ">
        <Flex
          vertical={isMobile}
          gap={24}
          className="overflow-x-scroll w-full "
        >
          <Column
            columnId="Open"
            type="Open"
            tasks={tasks?.filter((task: FetchedTask) => task.status === "Open")}
          />
          <Column
            columnId="In Progress"
            type="In Progress"
            tasks={tasks?.filter(
              (task: FetchedTask) => task.status === "In Progress"
            )}
          />
          <Column
            columnId="Under Review"
            type="Under Review"
            tasks={tasks?.filter(
              (task: FetchedTask) => task.status === "Under Review"
            )}
          />
          <Column
            columnId="Finished"
            type="Finished"
            tasks={tasks?.filter(
              (task: FetchedTask) => task.status === "Finished"
            )}
          />
        </Flex>
      </Layout>
    </DndContext>
  );
};

export default BoardView;
