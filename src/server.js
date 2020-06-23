import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import "./auth/auth";
import usersRouter from "./routes/users-router.js";
import userRouter from "./routes/user-sing";

const server = express();

// Middleware
server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

server.use(cors());
server.use(morgan("dev"));
//server.use(express.json());

// Routers
server.use("/api/users", usersRouter);
server.use("/api/user", userRouter);

//Routes
server.get("/", (req, res) => {
  res.status(200).json({ hello: "World!" });
});

module.exports = server;
