import { StoreContext } from "@/app/context/context";
import { TaskContext } from "@/app/context/task.context";
import { fetchTaskById } from "@/services/taskApi";
import { FetchedTask } from "@/types/TaskTypes";
import { Space, Table, TableProps, Tag } from "antd";
import AppContext from "antd/es/app/context";
import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import TaskModal from "./TaskModal";

interface DataType {
  id: string;
  title: string;
  status: string;
  priority: string;
  deadline: string;
  description: string;
}

const ListView = () => {
  const columns: TableProps<FetchedTask>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (text) => (
        <Tag
          className={`text-white border-none my-3 ${
            text == "Urgent"
              ? "bg-red-400"
              : text == "Medium"
              ? "bg-orange-400"
              : "bg-green-400"
          }`}
        >
          {text}
        </Tag>
      ),
    },
    {
      title: "Deadline",
      key: "deadline",
      dataIndex: "deadline",
      render: (text) => <span>{dayjs(text).format("DD/MM/YYYY")}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() =>
              onEdit({
                taskId: record.id,
                userId: user?.user?.id,
                token: user?.token,
              })
            }
          >
            Edit
          </a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const [task, setTask] = useState<FetchedTask | undefined>(undefined);
  const { loading, error: errorPopup, user } = useContext(StoreContext);
  const { setModalOpen, modalOpen, handleUpdate } = useContext(TaskContext);

  const onEdit = async (taskParams) => {
    try {
      loading();
      const task = await fetchTaskById(taskParams);
      setTask(task);
      setModalOpen("taskcard");
    } catch (error) {
      errorPopup(error.message);
    } finally {
      loading(false);
    }
  };

  const data: DataType[] = [
    {
      id: "1",
      title: "John Brown",
      status: "Open",
      deadline: "24/09/2023",
      priority: "Urgent",
      description: "New York No. 1 Lake Park",
    },
    {
      id: "1",
      title: "John Brown",
      status: "Open",
      deadline: "24/09/2023",
      priority: "Urgent",
      description: "New York No. 1 Lake Park",
    },
    {
      id: "1",
      title: "John Brown",
      status: "Open",
      deadline: "24/09/2023",
      priority: "Urgent",
      description: "New York No. 1 Lake Park",
    },
  ];
  const { tasks } = useContext(TaskContext);

  return (
    <>
      <Table columns={columns} dataSource={tasks} pagination={false} />

      {modalOpen == "taskcard" && (
        <TaskModal
          open={modalOpen == "taskcard"}
          handleCancel={() => setModalOpen("")}
          handleOk={handleUpdate}
          isLoading={false}
          title="Edit Task"
          type={task?.status || "Open"}
          data={task}
        />
      )}
    </>
  );
};

export default ListView;
