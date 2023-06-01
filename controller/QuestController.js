import * as QuestService from "../services/QuestService.js";

export async function getAllQuests(req, res) {
  console.log("getAllQuests()");
  return res.sendStatus(503);
}

export async function updateQuest(req, res) {
  console.log("updateQuest()");
  const { userName } = req.signedCookies;
  const { quest, item } = req.body;

  if (quest === "" || item === "") {
    return res.sendStatus(400);
  }
  else {

    let progress = await QuestService.updateQuestItem(userName, { quest_id: quest, item_id: item });

    return res.send(progress);
  }
}
