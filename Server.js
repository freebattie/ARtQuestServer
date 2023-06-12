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
// import {fileURLToPath} from "url"; // Needed if we want to send pictures
// import path from "path"; // Needed if we want to send pictures

// const __FILENAME = fileURLToPath(import.meta.url); // Needed if we want to send pictures
// const __DIRNAME = path.dirname(__FILENAME); // Needed if we want to send pictures

dotenv.config();

import routes from "./Routes.js";
import http from "http";
import bodyParser from "body-parser";
import cookies from "cookie-parser";

const APP = express();
console.log("adasdads");
APP.use(bodyParser.json({urlencoded:{ extended: true }}));


//APP.use(express.static(path.join(__DIRNAME, "/public"))); // Needed if we want to send pictures
APP.use(cookies(process.env.COOKIE_SECRET));
APP.use(async (err, req, res, next) => {
    console.log(`${req.ip}: ${req.method} ${req.url}`);

    // Error handling for malformed http message (mainly aimed for json errors)
    if (err instanceof SyntaxError && 'body' in err) {
        console.log("Bad syntax in request!");
        // 400 Bad request
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