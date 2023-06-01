import * as QuestService from "../services/QuestService.js";

export async function getAllQuests(req, res) {
    console.log("getAllQuests()");
    return res.sendStatus(503);
}

export async function updateQuest(req, res) {
    console.log("updateQuest()");
    const {userName} = req.signedCookies;
    const {quest, item} = req.body;

    console.log(userName);
    if (userName === undefined) {
        // 401 Unauthorized
        return res.sendStatus(403);

    } else if (quest === "" || item === "") {
        // Bad request
        return res.sendStatus(400);

    } else {
        try {
            let progress = await QuestService.updateQuestItem(userName, {quest_id: quest, item_id: item});

            if (progress !== null) {
                return res.send(progress);
            } else {
                // 409 Conflict
                return res.sendStatus(409);
            }

        } catch (error) {
            // 500 Internal server error
            return res.sendStatus(500);
        }
    }

}
