import { ReactElement } from "react";

export type TaskViewType = {
  Kanban: ReactElement;
  List: ReactElement;
};

export interface TaskModalProps {
  title: string;
  open: boolean;
  handleOk: (body: CreateTaskPayload | UpdateTaskPayload) => void;
  isLoading: boolean;
  type: ColumnType;
  data?: UpdateTaskPayload;
  handleCancel: () => void;
}

export type AddTask = {
  title: string;
  description: string;
  status: ColumnType;
  priority?: PriorityType;
  deadline?: Date;
};
type PriorityType = "Urgent" | "Medium" | "Low";
export type ColumnProps = {
  type: ColumnType;
  tasks: FetchedTask[];
  columnId: ColumnType;
};

export type TaskCardProps = {
  data: Task;
  handleOk: (body: CreateTaskPayload | UpdateTaskPayload) => void;
};

export type DraggableTaskProp = {
  task: Task;
  handleOk: (body: CreateTaskPayload | UpdateTaskPayload) => void;
};

export type ColumnType = "Open" | "In Progress" | "Under Review" | "Finished";

export interface GetTaskParamsType {
  search?: string;
  userId: string;
  startDate?: string;
  endDate?: string;
}

export interface FindTaskParam {
  taskId: string;
  userId: string;
  token: string;
}

export interface UpdateTaskParams {
  body: UpdateTaskPayload;
  userId: string;
}

export interface CreateTaskPayload {
  userId: string;
  title: string;
  description: string;
  status: ColumnType;
  priority?: PriorityType;
  deadline?: Date;
}

export interface UpdateTaskPayload extends CreateTaskPayload {
  id: string;
}

export interface CreateTask {
  id: string;
  title: string;
  description: string;
  deadline?: Date;
}

export interface Task extends CreateTask {
  status: ColumnType;
  createdAt: string;
  updatedAt: string;
  priority?: PriorityType;
}

export interface FetchedTask extends UpdateTaskPayload {
  createdAt: string;
  updatedAt: string;
}
