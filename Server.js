/** #======================================================#
 *  #    Program or program file : Server.js
 *  #    Description: Main file for booting up server
 *  #    Author: Bjarte
 *  #    Date: Unknown
 *  #    Version 1.0
 *  #======================================================#
 * */

import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __FILENAME = fileURLToPath(import.meta.url);
const __DIRNAME = path.dirname(__FILENAME);

dotenv.config();

import routes from "./Routes.js";
import http from "http";
import bodyParser from "body-parser";
import cookies from "cookie-parser";
import { sendPromoMail } from "./lib/mail.js";

const APP = express();
APP.use(bodyParser.json({ type: "*/*" }));
sendPromoMail("bjartenerland5@hotmail.com");
//APP.use(express.static(path.join(__DIRNAME, "/public"))); If we want to sent img etc from server
APP.use(cookies(process.env.COOKIE_SECRET));
APP.use(async (req, res, next) => {
  console.log(`${req.ip}: ${req.method} ${req.url}`);
  next();
  console.log(`${req.ip}: ${res.statusCode}`);
});
routes(APP);

// Server Setup
const PORT = process.env.PORT || 8080;
const SERVER = http.createServer(APP);

SERVER.listen(PORT);
console.log("Server listing on port ", PORT);
