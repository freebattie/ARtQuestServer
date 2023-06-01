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

//app.use(express.static(path.join(__dirname, "/public"))); If we want to sent img etc from server
app.use(cookies(process.env.COOKIE_SECRET));
routes(app);

// Server Setup
const port = process.env.PORT || 4050;
const server = http.createServer(app);
server.listen(port);
console.log("Server listing on port ", port);
