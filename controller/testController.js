import TestService from "../services/testService";

export const getUserFromTestTable = async (req, res) => {
  const id = req.params.id; //get id from url
  const id2 = req.body.id; //get id from body
  const { rows } = await TestService.getUserFromTestTable(id);
  if (rows) {
    return res.json(new SuccRes("user was found", rows));
  }
};
