import LoginService from "../services/LoginService.js";

export const requestUser = async (req, res, next) => {
    const {userName} = req.signedCookies;
    const {rows} = await LoginService.requestUser(userName);
    console.log(rows);
    if (rows.length > 0) {
        req.user = {userName: rows[0].userName, role: rows[0].role};
    }

    next();
};

export const login = async (req, res) => {
    const {userName, password} = req.body;

    // 400 bad request
    if (userName === "" || password === "") {
        return res.sendStatus(400);
    }

    // Check user to database
    const {rows} = await LoginService.loginUser(userName, password);
    console.log(rows);

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
