import * as Services from "../services/CreateService.js"

export async function register(req, res) {
  // Verify username
  let { wanted_name: wanted_name, pass } = req.body;

  if (Services.userExists(wanted_name)) {
    res.status(409);
    res.send("User already exists");
  }
  // Create user
  else if (Services.addUser(wanted_name, pass).await == true) {
    res.sendStatus(200);
  }

  else {
    res.sendStatus(500);
  }

}
