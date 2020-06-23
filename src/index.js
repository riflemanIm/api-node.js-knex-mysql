import server from "./server.js";
import dotenv from "dotenv";
import config from "./config/config";

const port = config.port;

server.listen(port, () => console.log(`API running on port ${port}`));
