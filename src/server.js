import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import "./auth/auth";
import usersRouter from "./routes/users-crud.js";
import clinicRouter from "./routes/clinic-crud.js";
import userSignInUpRouter from "./routes/user-sing-in-up";

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
server.use(express.json());

// Routers
server.use("/api/users", usersRouter);
server.use("/api/clinics", clinicRouter);
server.use("/api/auth", userSignInUpRouter);

//Serves all the request which includes /images in the url from Images folder
server.use("/images", express.static(__dirname + "/../images"));

//Routes
server.get("/", (req, res) => {
  res.status(200).json({ hello: "World!" });
});

module.exports = server;