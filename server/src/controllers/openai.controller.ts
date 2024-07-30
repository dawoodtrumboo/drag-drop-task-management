import { Request, Response } from "express";
import { createSuggestion } from "../services/openai/openai.service";

export class OpenAiController {
  static async generateSuggestion(req: Request, res: Response) {
    const { title, description, deadline, priority, status } = req.query;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    try {
      const prompt = `The task name is ${
        title ? title : ""
      } and its description is ${
        description ? description : ""
      },the deadline for the task is ${
        deadline ? deadline : ""
      }.The status of the task right now is ${
        status ? status : ""
      } and the priority of it is ${priority ? priority : ""}`;

      //   const suggestion = await createSuggestion(prompt);

      //   res.json({ suggestion });

      try {
        const completion = await createSuggestion(prompt);

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        let finished = false;
        let continuationToken = null;
        for await (const chunk of completion) {
          if (chunk.choices[0].delta.content) {
            res.write(`data: ${chunk.choices[0].delta.content}\n\n`);
          }
          if (chunk.choices[0].finish_reason === "stop") {
            res.write("data: [DONE]\n\n");
            res.end();
            return;
          }
          if (!finished) {
            if (continuationToken) {
              res.write(`data: [TRUNCATED]\n\n`); // Indicate truncated response
              res.write(`data: ${continuationToken}\n\n`); // Send continuation token
            }
          }
        }
      } catch (error) {
        console.error("Failed to generate the response:", error);
        res.status(500).json({ message: "Failed to generate the response." });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to generate the response." });
    }
  }
}
