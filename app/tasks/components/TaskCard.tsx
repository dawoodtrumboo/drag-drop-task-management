import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Flex, Popconfirm, Popover, Tag, Typography } from "antd";
import { FetchedTask, TaskCardProps } from "@/types/TaskTypes";
import TaskModal from "./TaskModal";
import { timeAgo } from "@/utils/timeformat";
import { StoreContext } from "@/app/context/context";
import { ClockCircleOutlined } from "@ant-design/icons";
import { deleteTask, fetchTaskById } from "@/services/taskApi";
import dayjs from "dayjs";
import { TaskContext } from "@/app/context/task.context";

const { Title, Paragraph } = Typography;

const TaskCard: React.FC<TaskCardProps> = ({ data, handleOk }) => {
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false);
  const { success, error: errorPopup, loading } = useContext(StoreContext);

  const { tasks, setTasks, modalOpen, setModalOpen, handleDelete } =
    useContext(TaskContext);

  const [task, setTask] = useState<FetchedTask | undefined>(undefined);

  const { user } = useContext(StoreContext);
  const taskParams = {
    taskId: data.id,
    userId: user?.user.id,
    token: user?.token,
  };
  const date = new Date(data.updatedAt);
  const readableDate = timeAgo(date);

  // const handleDelete = async (taskParams) => {
  //   loading();
  //   try {
  //     await deleteTask(taskParams);
  //     const filteredTasks = tasks.filter((task) => task.id !== data.id);
  //     setTasks(filteredTasks);
  //     success("Task deleted successfully");
  //     setModalOpen("");
  //   } catch (error) {
  //     errorPopup(error.message);
  //   } finally {
  //     loading(false);
  //   }
  // };

  const onEdit = async () => {
    try {
      loading();
      const task = await fetchTaskById(taskParams);
      setTask(task);
      setModalOpen(`tascard-${data.id}`);
    } catch (error) {
      errorPopup(error.message);
    } finally {
      loading(false);
      setPopoverVisible(false);
    }
  };
  const content = (
    <Flex vertical>
      <div
        className="px-2 cursor-pointer py-1 text-center text-blue-500"
        onClick={() => onEdit()}
      >
        Edit
      </div>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        okText="Yes"
        cancelText="No"
        okButtonProps={{ loading: false }}
        onConfirm={() => handleDelete(taskParams, data.id)}
      >
        <div className="px-2 cursor-pointer py-1 text-center text-red-500">
          Delete
        </div>
      </Popconfirm>
    </Flex>
  );

  return (
    <>
      <Card className="max-h-[300px] bg-gray-50 ">
        <h2 className="!text-gray-800">{data.title}</h2>
        <Paragraph
          ellipsis={{ rows: 8 }}
          className="text-xs text-gray-400 font-light !mb-0"
          style={{ paddingBottom: "0" }}
        >
          {data.description}
        </Paragraph>
        <Tag
          className={`text-white border-none my-3 ${
            data.priority == "Urgent"
              ? "bg-red-400"
              : data.priority == "Medium"
              ? "bg-orange-400"
              : "bg-green-400"
          }`}
        >
          {data.priority}
        </Tag>
        <Flex className=" text-gray-600 mb-3" gap={5}>
          <ClockCircleOutlined className="text-lg" />
          {(data.deadline && dayjs(data.deadline).format("DD-MM-YYYY")) ||
            "No deadline"}
        </Flex>
        <Flex justify="space-between" align="center">
          <span className="text-xs font-semibold text-gray-400">
            {readableDate}
          </span>
          <Popover content={content} trigger="click" open={popoverVisible}>
            <Button
              className="border-none p-0 m-0 w-fit h-1"
              onClick={() => setPopoverVisible((prev) => !prev)}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              }
            />
          </Popover>
        </Flex>
      </Card>
      {modalOpen == `tascard-${data.id}` && (
        <TaskModal
          open={modalOpen == `tascard-${data.id}`}
          handleCancel={() => setModalOpen("")}
          handleOk={handleOk}
          isLoading={false}
          title="Edit Task"
          type={task?.status || "Open"}
          data={task}
        />
      )}
    </>
  );
};

export default TaskCard;
