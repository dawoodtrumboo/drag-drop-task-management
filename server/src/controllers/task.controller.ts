import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Task } from "../entity/Task";
import { Priority } from "../dto";
import { User } from "../entity/User";

export class TaskController {
  static async getTasks(req: Request, res: Response) {
    try {
      const userId = req.query.userId as string;
      const {
        search,
        startDate: reqStartDate,
        endDate: reqEndDate,
      } = req.query;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const cacheKey = `tasks-${userId}-${search || "all"}-${
        reqStartDate || "none"
      }-${reqEndDate || "none"}`;
      const data = cache.get(cacheKey);

      if (data) {
        console.log("Serving from cache");
        return res.status(200).json({ data });
      }

      console.log("Serving from database");
      const taskRepository = AppDataSource.getRepository(Task);

      let query = taskRepository
        .createQueryBuilder("task")
        .where("task.userId = :userId", { userId });

      if (search) {
        query = await query.andWhere(
          "(task.title ILIKE :search OR task.description ILIKE :search)",
          {
            search: `%${search}%`,
          }
        );
      }
      if (reqStartDate && reqEndDate) {
        const startDate = new Date(reqStartDate as string);
        const endDate = new Date(reqEndDate as string);
        query = await query.andWhere(
          "task.createdAt BETWEEN :startDate AND :endDate",
          {
            startDate,
            endDate,
          }
        );
      }

      const tasks = await query.getMany();
      cache.put(cacheKey, tasks, 10000);

      return res.status(200).json({ data: tasks });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while fetching tasks" });
    }
  }

  static async getTaskById(req: Request, res: Response) {
    try {
      const userId = req.query.userId as string;
      const { id } = req.params;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      if (!id) {
        return res.status(400).json({ message: "Task ID is required" });
      }

      const cacheKey = `task-${userId}-${id}`;
      const data = cache.get(cacheKey);

      if (data) {
        console.log("Serving from cache");
        return res.status(200).json({ data });
      }

      console.log("Serving from database");
      const taskRepository = AppDataSource.getRepository(Task);
      const task = await taskRepository.findOne({
        where: { id, userId },
      });

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      cache.put(cacheKey, task, 10000);
      return res.status(200).json(task);
    } catch (error) {
      console.error("Error fetching task by ID:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while fetching the task" });
    }
  }

  static async createTask(req: Request, res: Response) {
    try {
      const {
        userId,
        title,
        description,
        status,
        priority,
        deadline,
        suggestion,
      } = req.body;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      if (!title) {
        return res.status(400).json({ message: "Title is required" });
      }

      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const task = new Task();
      task.title = title;
      task.description = description;
      task.status = status;
      task.priority = priority; // Set priority from request body
      task.deadline = deadline;
      task.user = { id: userId } as User;
      task.suggestion = suggestion;

      const taskRepository = AppDataSource.getRepository(Task);
      await taskRepository.save(task);
      return res.status(201).json(task);
    } catch (error) {
      console.error("Error creating task:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while creating the task" });
    }
  }

  static async updateTask(req: Request, res: Response) {
    try {
      const userId = req.query.userId as string;
      const { id } = req.params;
      const { title, description, status, priority, deadline, suggestion } =
        req.body;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      if (!id) {
        return res.status(400).json({ message: "Task ID is required" });
      }

      const taskRepository = AppDataSource.getRepository(Task);
      const task = await taskRepository.findOne({
        where: { id, userId },
      });

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      if (title) task.title = title;
      if (description) task.description = description;
      if (status) task.status = status;
      if (priority) task.priority = priority;
      if (deadline) task.deadline = deadline;
      if (suggestion) task.suggestion = suggestion;

      await taskRepository.save(task);
      return res.status(200).json(task);
    } catch (error) {
      console.error("Error updating task:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while updating the task" });
    }
  }

  static async deleteTask(req: Request, res: Response) {
    try {
      const userId = req.query.userId as string;
      const { id } = req.params;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      if (!id) {
        return res.status(400).json({ message: "Task ID is required" });
      }

      const taskRepository = AppDataSource.getRepository(Task);
      const task = await taskRepository.findOne({
        where: { id, userId },
      });

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      await taskRepository.remove(task);
      return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while deleting the task" });
    }
  }
}
