import * as express from "express";
import { authentification } from "../helpers";
import { OpenAiController } from "../controllers";

const Router = express.Router();

Router.get("/generateSuggestion", OpenAiController.generateSuggestion);

export { Router as openaiRouter };
