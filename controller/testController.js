import TestService from "../services/TestService.js";

export const getUserFromTestTable = async (req, res) => {
   const id = req.params.id; //get id from url
   const id2 = req.body.id; //get id from body
   const { rows } = await TestService.getUserFromTestTable(id);
   if (rows) {
      return res.json(rows);
   }
};

export const getAllUsersFromTestTable = async (req, res) => {
   if (!req.user) {
      return res.sendStatus(404);
   }
   const { role } = req.user;
   if (role != "admin") {
      return res.sendStatus(401);
   }
   const { rows } = await TestService.getAllUsersFromTestTable();
   if (rows) {
      return res.json(rows);
   }
};
