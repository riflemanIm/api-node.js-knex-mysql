import express from "express";
import morgan from "morgan";
import cors from "cors";
import usersRouter from "./routes/users-router.js";

const server = express();

// Middleware
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

// Routers
server.use("/api/users", usersRouter);

//Routes
server.get("/", (req, res) => {
  res.status(200).json({ hello: "World!" });
});

module.exports = server;
