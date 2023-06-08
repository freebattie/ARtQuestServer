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
import {fileURLToPath} from "url";

const __FILENAME = fileURLToPath(import.meta.url);
const __DIRNAME = path.dirname(__FILENAME);

dotenv.config();

import routes from "./Routes.js";
import http from "http";
import bodyParser from "body-parser";
import cookies from "cookie-parser";

const APP = express();
console.log("adasdads");
APP.use(bodyParser.json({urlencoded:{ extended: true }}));


//APP.use(express.static(path.join(__DIRNAME, "/public"))); If we want to sent img etc from server
APP.use(cookies(process.env.COOKIE_SECRET));
APP.use(async (err, req, res, next) => {
    console.log(`${req.ip}: ${req.method} ${req.url}`);

    if (err instanceof SyntaxError && 'body' in err) {
        console.log("Bad syntax in request!");
        // Bad request
        return res.sendStatus(400);
    }

    next();
    console.log(`${req.ip}: ${res.statusCode}`);
});
routes(APP);

// Server Setup
const PORT = process.env.PORT || 9000;
const SERVER = http.createServer(APP);

SERVER.listen(PORT);
console.log("Server listing on port ", PORT);