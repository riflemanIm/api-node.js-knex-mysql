import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import "./auth/auth";
import userSignInUpRouter from "./routes/user-sing-in-up";
import usersRouter from "./routes/users-crud";
import clinicRouter from "./routes/clinic-crud";
import regionRouter from "./routes/region-crud";
import translationRouter from "./routes/translations-crud";
import PromoRouter from "./routes/promo-crud";

import config from "./config/config";
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
console.log({ origin: `${config.hostUI}:${config.portUI}` }, "\n");
server.use(cors({ origin: `${config.hostUI}:${config.portUI}` }));
server.use("/api/auth", userSignInUpRouter);
server.use("/api/regions", regionRouter);
server.use("/api/users", usersRouter);
server.use("/api/clinics", clinicRouter);
server.use("/api/translations", translationRouter);
server.use("/api/promos", PromoRouter);

//Serves all the request which includes /images in the url from Images folder
server.use("/images", express.static(__dirname + "/../images"));

//Routes
server.get("/", (req, res) => {
  res.status(200).json({ hello: "Hi!" });
});

module.exports = server;
