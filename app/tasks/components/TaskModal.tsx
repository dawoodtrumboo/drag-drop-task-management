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
import dayjs from "dayjs";
import { BsStars } from "react-icons/bs";
import { generateSuggestion } from "@/services/openaiApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import HtmlRenderer from "./HtmlRenderer";
const { TextArea } = Input;

const TaskModal: React.FC<TaskModalProps> = ({
  open,
  handleOk,
  type,
  data,
  handleCancel,
}) => {
  // Initialize form data with default values or existing data

  const {
    user,
    loading,
    success,
    error: errorPopup,
  } = useContext(StoreContext);
  const [formData, setFormData] = useState<
    CreateTaskPayload | UpdateTaskPayload
  >({
    userId: user?.user.id || "",
    title: "",
    description: "",
    status: type,
  });
  const [suggestion, setSuggestion] = useState("");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  // Handle form input changes
  const handleChange = (
    value: string | Date | dayjs.Dayjs | undefined,
    name: string | undefined
  ) => {
    if (value !== undefined && name !== undefined) {
      let newValue = value;

      if (dayjs.isDayjs(value)) {
        newValue = value.toDate(); // Convert Dayjs to Date
      }

      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
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

  // const handleAiGeneration = async () => {
  //   loading();
  //   if (!formData.title) {
  //     errorPopup("Please fill in the title");
  //     return;
  //   }
  //   if (!formData.status) {
  //     errorPopup("Please select a status");
  //     return;
  //   }
  //   try {
  //     const response = await generateSuggestion(formData, user.token);
  //     console.log(response);
  //     setSuggestion(response);
  //     success("Suggestion generated successfully!");
  //   } catch (error) {
  //     errorPopup("Failed to generated Suggestion!");
  //   } finally {
  //     loading(false);
  //   }
  // };

  // const handleAiGeneration = async () => {
  //   loading();
  //   if (!formData.title) {
  //     errorPopup("Please fill in the title");
  //     return;
  //   }
  //   if (!formData.status) {
  //     errorPopup("Please select a status");
  //     return;
  //   }

  //   setIsStreaming(true);
  //   setSuggestion([""]);

  //   const eventSource = new EventSource(
  //     `${
  //       process.env.NEXT_PUBLIC_API_URL
  //     }/openai/generateSuggestion?title=${encodeURIComponent(
  //       formData.title
  //     )}&status=${encodeURIComponent(
  //       formData.status
  //     )}&description=${encodeURIComponent(
  //       formData.description
  //     )}&deadline=${encodeURIComponent(
  //       dayjs(formData.deadline).format("YYYY/MM/DD")
  //     )}&priority=${encodeURIComponent(formData.priority)}`
  //   );

  //   eventSource.onmessage = (event) => {
  //     if (event.data === "[DONE]") {
  //       setIsStreaming(false);
  //       eventSource.close();
  //     } else {
  //       const newSuggestions = event.data
  //         .split("\n")
  //         .filter(Boolean)
  //         .map((line, index) => ({
  //           id: index,
  //           text: line.trim(),
  //         }));
  //       setSuggestion((prev) => [...prev, ...newSuggestions]);
  //       // setSuggestion((prev) => prev + event.data);
  //     }
  //   };

  //   eventSource.onerror = (error) => {
  //     console.error("EventSource failed:", error);
  //     errorPopup("Failed to generate suggestion!");
  //     setIsStreaming(false);
  //     eventSource.close();
  //   };
  // };

  useEffect(() => {
    if (!isStreaming) return;

    // Construct the EventSource URL

    const url = `${
      process.env.NEXT_PUBLIC_API_URL
    }/openai/generateSuggestion?title=${encodeURIComponent(
      formData.title
    )}&status=${encodeURIComponent(
      formData.status
    )}&description=${encodeURIComponent(
      formData.description
    )}&deadline=${encodeURIComponent(
      dayjs(formData.deadline).format("YYYY/MM/DD")
    )}&priority=${encodeURIComponent(formData.priority)}`;

    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      if (event.data === "[DONE]") {
        setIsStreaming(false);
        eventSource.close();
      } else {
        // Parse the incoming data
        let text = event.data;

        setSuggestion((prev) => prev + text);
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      errorPopup("Failed to generate suggestion!");
      setIsStreaming(false);
      eventSource.close();
    };

    return () => {
      if (eventSource.readyState === EventSource.OPEN) {
        eventSource.close();
      }
    };
  }, [isStreaming, formData]);

  const handleAiGeneration = () => {
    setSuggestion("");
    setIsStreaming(true);
  };
  console.log(suggestion);
  return (
    <Drawer
      className="!bg-white "
      width={drawerSize}
      title={drawerHeader}
      onClose={onClose}
      open={open}
      rootClassName="!bg-[#00000020]"
    >
      <Input
        name="title"
        className="border-none font-semibold tracking-wider text-3xl outline-none shadow-none focus:outline-none focus:shadow-none"
        placeholder="Title"
        onChange={(e) => handleChange(e.target.value, e.target.name)}
        value={formData.title}
      />

      <div className="!w-full my-5 space-y-4 border-b-[1px] border-gray-200">
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
      <div className="flex-col flex gap-5">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Notes</h2>
          <Button
            type="primary"
            onClick={handleAiGeneration}
            disabled={isStreaming || formData.title === ""}
          >
            <BsStars />
            Generate Suggestion
          </Button>
        </div>
        <div>
          <HtmlRenderer htmlString={suggestion} />
        </div>
      </div>
    </Drawer>
  );
};

export default TaskModal;
