/** #======================================================#
 *  #    Program or program file : LoginController.js
 *  #    Description: Receives API call for Login
 *  #    Author: Bjarte
 *  #    Date: Unknown
 *  #    Version 1.0
 *  #======================================================#
 * */

import LoginService from "../services/LoginService.js";

/**
 * @description takes a cookie for approval and adds it to the requests (for the next task in line)
 * @param       req - The whole received HTTP message with headers and body
 * @param       res - The whole responding HTTP message with headers and body
 * @param       next - "function" call to the next step in Router.js */
export const requestUser = async (req, res, next) => {
    console.log("requestUser()");
    const {email} = req.signedCookies;
    const {rows} = await LoginService.requestUser(email);

    if (rows.length > 0) {
        req.user = {userName: rows[0].userName, role: rows[0].role};
    }

    next();
};

/** @description methode to check login for user, will sign a secure cookie
 * @param       req - The whole received HTTP message with headers and body
 * @param       res - The whole responding HTTP message with headers and body */
export const login = async (req, res) => {
    console.log("login()");
    const {userName, password} = req.body;

    // 400 bad request
    if (userName === "" || password === "") {
        return res.sendStatus(400);
    }

    // Check user to database
    const {rows} = await LoginService.loginUser(userName, password);

    // 400 Bad Request
    if (rows.length < 1) {
        res.sendStatus(400);

        //     User successful
    } else {
        res.cookie("userName", rows[0].email, {signed: true});
        res.cookie("role", rows[0].role, {signed: true});
        res.sendStatus(200);
    }
};
