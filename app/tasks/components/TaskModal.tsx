import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  CreateTaskPayload,
  TaskModalProps,
  UpdateTaskPayload,
} from "@/types/TaskTypes";
import {
  Button,
  DatePicker,
  Drawer,
  Dropdown,
  Flex,
  Input,
  MenuProps,
  Space,
} from "antd";
import { StoreContext } from "@/app/context/context";
import StatusIcon from "../../../public/assets/status.svg";
import {
  CalendarOutlined,
  DownOutlined,
  EditOutlined,
  FullscreenOutlined,
  SaveOutlined,
  ShareAltOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import moment from "moment";
import dayjs from "dayjs";
const { TextArea } = Input;

const TaskModal: React.FC<TaskModalProps> = ({
  open,
  handleOk,
  type,
  data,
  handleCancel,
}) => {
  // Initialize form data with default values or existing data

  const { auth, user } = useContext(StoreContext);
  const [formData, setFormData] = useState<
    CreateTaskPayload | UpdateTaskPayload
  >({
    userId: user?.user.id || "",
    title: "",
    description: "",
    status: type,
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  // Handle form input changes
  const handleChange = (
    value: string | Date | undefined,
    name: string | undefined
  ) => {
    if (value !== undefined && name !== undefined) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle modal close
  const onClose = () => {
    setFormData({
      userId: "",
      title: "",
      description: "",
      status: type,
    });
    handleCancel();
  };

  const drawerHeader = (
    <Flex justify="space-between">
      <FullscreenOutlined
        className=" cursor-pointer"
        onClick={() => handleResize()}
      />

      <Space>
        <Button className="text-xs px-2 bg-[#edecec98] hover:!bg-[#b3b3b3b1] border-none rounded-sm text-gray-400 font-light ">
          Share
          <ShareAltOutlined className="text-md" />
        </Button>
        <Button
          onClick={() => handleOk(formData)}
          type="primary"
          className="text-xs px-5  border-none rounded-sm font-light "
        >
          Save
          <SaveOutlined className="text-lg" />
        </Button>
      </Space>
    </Flex>
  );

  const [drawerSize, setDrawerSize] = useState("40%");

  const handleResize = () => {
    setDrawerSize((prev) => {
      if (prev !== "100%") {
        return "100%";
      } else {
        return "40%";
      }
    });
  };

  useLayoutEffect(() => {
    if (window.innerWidth < 500) {
      setDrawerSize("100%");
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const statusItems: MenuProps["items"] = [
    {
      label: "Open",
      key: "Open",
      onClick: (e) => handleChange(e.key, "status"),
    },
    {
      label: "In Progress",
      key: "In Progress",
      onClick: (e) => handleChange(e.key, "status"),
    },
    {
      label: "Under Review",
      key: "Under Review",
      onClick: (e) => handleChange(e.key, "status"),
    },
    {
      label: "Finished",
      key: "Finished",
      onClick: (e) => handleChange(e.key, "status"),
    },
  ];
  const priorityItems: MenuProps["items"] = [
    {
      label: "Urgent",
      key: "Urgent",
      onClick: (e) => handleChange(e.key, "priority"),
    },
    {
      label: "Medium",
      key: "Medium",
      onClick: (e) => handleChange(e.key, "priority"),
    },
    {
      label: "Low",
      key: "Low",
      onClick: (e) => handleChange(e.key, "priority"),
    },
  ];

  return (
    <Drawer
      className="!bg-white "
      width={drawerSize}
      title={drawerHeader}
      onClose={onClose}
      open={open}
    >
      <Input
        name="title"
        className="border-none font-semibold tracking-wider text-3xl outline-none shadow-none focus:outline-none focus:shadow-none"
        placeholder="Title"
        onChange={(e) => handleChange(e.target.value, e.target.name)}
        value={formData.title}
      />

      <div className="!w-full my-5 space-y-4">
        <Flex className="!w-full">
          <div className="flex items-center gap-3 min-w-[150px]">
            <StatusIcon width={16} />
            <p>Status</p>
          </div>
          <Dropdown
            menu={{
              items: statusItems,
              selectable: true,
              defaultSelectedKeys: [formData.status],
            }}
            className="w-full"
            trigger={["click"]}
          >
            <input
              placeholder="Not selected"
              readOnly
              className="bg-transparent h-8 border-none placeholder:text-gray-300"
              value={formData.status}
            />
          </Dropdown>
        </Flex>
        <Flex className="!w-full">
          <div className="flex items-center gap-3 min-w-[150px]">
            <WarningOutlined width={16} />
            <p>Priority</p>
          </div>
          <Dropdown
            menu={{
              items: priorityItems,
              selectable: true,
              defaultSelectedKeys: ["3"],
            }}
            className="w-full"
            trigger={["click"]}
          >
            <input
              placeholder="Not selected"
              readOnly
              value={formData.priority}
              className="bg-transparent h-8 border-none placeholder:text-gray-300"
            />
          </Dropdown>
        </Flex>
        <Flex className="!w-full">
          <div className="flex items-center gap-3 min-w-[150px]">
            <CalendarOutlined width={16} />
            <p>Deadline</p>
          </div>
          <DatePicker
            format="DD/MM/YYYY"
            value={formData.deadline && dayjs(formData?.deadline)}
            suffixIcon={false}
            name="deadline"
            placeholder="Not Selected"
            onChange={(date, dateString) => handleChange(date, "deadline")}
            className="border-none w-full tracking-wider !outline-none !shadow-none focus:!outline-none focus:!shadow-none focus-within:!outline-none"
          />
        </Flex>
        <Flex className="!w-full pt-4">
          <div className="flex items-start gap-3 min-w-[150px]">
            <EditOutlined width={16} />
            <p>Description</p>
          </div>
          <TextArea
            value={formData.description}
            className="border-none tracking-wider !outline-none !shadow-none focus:!outline-none focus:!shadow-none focus-within:!outline-none"
            placeholder="Not selected"
            style={{ resize: "none" }}
            name="description"
            onChange={(e) => handleChange(e.target.value, e.target.name)}
          />
        </Flex>
      </div>
    </Drawer>
  );
};

export default TaskModal;
