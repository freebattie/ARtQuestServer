import * as Services from "../services/CreateService.js"

export async function register(req, res) {
    // Verify username
    const {userName, password} = req.body;
    if (userName === "" || password === "") {
        return res.sendStatus(403);
    }

    let exists = await Services.userExists(userName);

    console.log("User does " + (exists ? "" : "not ") + "exist");

    if (exists) {
        res.status(409);
        res.send("User already exists");
    }
        // Create user
    // Role is hardcoded because the registration form is only for normal users
    else if (await Services.addUser(userName, password, "casual") === true) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }

}
