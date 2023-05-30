import * as Services from "../services/CreateService.js"

export async function register(req, res) {
  // Verify username
  if (Services.userExists()) {
    res.status(409);
    res.send("User already exists");
  }
  // Create user
  else if (Services.addUser().await == true) {
    res.sendStatus(200);
  }

  else {
    res.sendStatus(500);
  }

}
