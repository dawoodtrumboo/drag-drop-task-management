import { IsNotEmpty } from "class-validator";

export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  UNDER_REVIEW = "UNDER_REVIEW",
  FINISHED = "FINISHED",
}

export enum Priority {
  Urgent = "Urgent",
  Medium = "Medium",
  Low = "Low",
}
