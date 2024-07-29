"use client";
import {
  Button,
  Flex,
  Layout,
  Segmented,
  Input,
  Select,
  DatePicker,
} from "antd";
import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  AppstoreOutlined,
  BarsOutlined,
  CalendarOutlined,
  PlusCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";
import BoardView from "./components/BoardView";
import ListView from "./components/ListView";
import TaskModal from "./components/TaskModal";
import debounce from "lodash/debounce";
import { CreateTaskPayload, GetTaskParamsType, TaskViewType } from "@/types/TaskTypes";
import { StoreContext } from "../context/context";
import Card from "./components/Card";
import Icon1 from "../../public/assets/image1.svg";
import Icon2 from "../../public/assets/image2.svg";
import { withAuth } from "../withAuth";
import { addTask, fetchTasks } from "@/services/taskApi";
const { Search } = Input;

const { RangePicker } = DatePicker;

const TaskLayout: React.FC = () => {
  const [currentView, setCurrentView] =
    useState<keyof TaskViewType>("boardview");
  const [modalOpen, setModalOpen] = useState(false);
  const { setTasks, error: errorPopup, user,loading,success} = useContext(StoreContext);
  const [tasksParams, setTasksParams] = useState<GetTaskParamsType>({
    search: "",
    userId: user?.user.id || "",
    startDate: "",
    endDate: "",
  });

  const debouncedFetchTasks = useCallback(
    debounce((params: GetTaskParamsType) => {
      getTasks(params);
    }, 600),
    []
  );

  const { search, startDate, endDate } = tasksParams;

  useEffect(() => {
    debouncedFetchTasks(tasksParams);
  }, [search, startDate, endDate]);

  const getTasks = async (params: GetTaskParamsType) => {
    try {
      const fetchedTasks = await fetchTasks(params, user.token);
      setTasks(fetchedTasks);
    } catch (error) {
      errorPopup(error.message);
    }
  };

  useEffect(() => {
    getTasks(tasksParams);
  }, []);

  const view: TaskViewType = {
    boardview: <BoardView />,
    listview: <ListView />,
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTasksParams((prev) => ({ ...prev, search: e.target.value }));
  };


  const handleAddTask = async(body:CreateTaskPayload) => {
    // Implement the logic for adding a task
    loading();
    try {
      const task = await addTask(body, user.token);
      setTasks((prev) => [...prev, task]);
      setModalOpen(false);
      success("Task added successfully!");
    } catch (error) {
      errorPopup(error.message);
    } finally {
      loading(false);
    }
  };
  const cardData = [
    {
      title: "Introducing Tags",
      description:
        "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
      image: Icon1,
    },
    {
      title: "Share Notes Instantly",
      description:
        "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
      image: Icon2,
    },
    {
      title: "Access Anywhere",
      description:
        "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
      image: Icon1,
    },
  ];

  const handleDateRangeChange = (dates: any, dateStrings: [string, string]) => {
    setTasksParams((prev) => ({
      ...prev,
      startDate: dateStrings[0],
      endDate: dateStrings[1],
    }));
  };
  return (
    <Layout>
      <Flex align="center" gap={5} className="mb-5 overflow-x-scroll">
        {cardData.map((card) => (
          <Card
            title={card.title}
            Icon={card.image}
            description={card.description}
          />
        ))}
      </Flex>

      <Flex
        className="flex-wrap md:flex-nowrap"
        justify="space-between"
        align="center"
        gap={12}
      >
        <Segmented
          options={[
            {
              value: "Kanban",
              icon: (
                <AppstoreOutlined onClick={() => setCurrentView("boardview")} />
              ),
            },
            {
              value: "List",
              icon: <BarsOutlined onClick={() => setCurrentView("listview")} />,
            },
          ]}
        />

        <Flex gap={24}>
          <RangePicker
            suffixIcon={<CalendarOutlined size={24} />}
            format="DD/MM/YYYY"
            name="deadline"
            size="small"
            onChange={handleDateRangeChange}
            // style={{backgroundColor:}}
            // onChange={(date, dateString) => handleChange(date, "deadline")}
            className="border-none !bg-transparent w-full tracking-wider !outline-none !shadow-none focus:!outline-none focus:!shadow-none focus-within:!outline-none h-8"
          />
          <Search
            placeholder="Search your tasks here"
            onChange={handleSearchChange}
          />

          
            <Button
              type="primary"
    
              onClick={() => setModalOpen(true)}
            >
                Create new task
          <PlusCircleFilled />
            </Button>
          
        </Flex>
      </Flex>
      <Layout className="my-[24px]">{view[currentView]}
       {modalOpen && (
        <TaskModal
          open={modalOpen}
          handleCancel={() => setModalOpen(false)}
          handleOk={handleAddTask}
          isLoading={false}
          title="Add Task"
          data={undefined}
          type="Open"
        />
      )}</Layout>
     
    </Layout>
  );
};

export default withAuth(TaskLayout);
