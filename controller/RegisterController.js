import * as Services from "../services/CreateService.js";

export async function register(req, res) {
  // Verify username
  const { email, password } = req.body;
  if (email === "" || password === "") {
    return res.sendStatus(403);
  }

  let exists = await Services.userExists(email);

  console.log("User does " + (exists ? "" : "not ") + "exist");

  if (exists) {
    res.status(409);
    res.send("User already exists");
  }
  // Create user
  // Role is hardcoded because the registration form is only for normal users
  else if ((await Services.addUser(email, password, "casual")) === true) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
}
