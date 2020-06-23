import server from "./server.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 8001;

server.listen(port, () => console.log(`API running on port ${port}`));
