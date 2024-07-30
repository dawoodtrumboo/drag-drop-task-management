import * as express from "express";
import { TaskController } from "../controllers";
import { authentification } from "../helpers";

const Router = express.Router();

Router.use(authentification);
Router.get("/tasks", TaskController.getTasks);
Router.get("/tasks/:id", TaskController.getTaskById);
Router.post("/tasks", TaskController.createTask);
Router.put("/tasks/:id", TaskController.updateTask);
Router.delete("/tasks/:id", TaskController.deleteTask);

export { Router as taskRouter };
