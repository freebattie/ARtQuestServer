import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

import routes from "./routes.js";
import http from "http";
import bodyParser from "body-parser";
import cookies from "cookie-parser";
const app = express();
app.use(bodyParser.json({ type: "*/*" }));
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookies());
routes(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listing on port ", port);
