import { AppDataSource } from "./data-source";

import * as express from "express";
import * as dotenv from "dotenv";
import "reflect-metadata";
import { taskRouter, userRouter } from "./routes";
import * as session from "express-session";
import * as passport from "passport";
import { openaiRouter } from "./routes/openai.routes";
require("./services/google/googleStrategy");

dotenv.config();

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://main.d31w73p5vxf36s.amplifyapp.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "dawoodvoosh",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);
app.use(passport.initialize());
app.use(passport.session());

const { PORT = 8099 } = process.env;

app.use("/auth", userRouter);
app.use("/api", taskRouter);
app.use("/openai", openaiRouter);

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is runinng on port " + PORT);
    });
    console.log("Appsource is initialized");
  })
  .catch((error) => console.log(error));
