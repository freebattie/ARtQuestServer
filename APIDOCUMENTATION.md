# API Documentation

All routes may return `500 internal server errror`

## POST /api/login

Users can log in by providing their username and password.

The server responds with:

- `200 ok` with a session cookie, If the user exists and valid.
- `400 bad request`, If the data was incorrect or the data was malformed.

## POST /api/register

Register a new user to the service.

The server responds with:

- `200 ok` If the registration is successful
- `409 forbidden` If there already is a user with the supplied email

## GET /api/quest

Update quest progression with a scanned item

The server responds with:

- `200 ok` If the user has not sent the item before with the following body:
    

``` json
{
    "quest": 1, // quest id
    "size": 10, // total items to collect
    "collected": [1, 2], // ids of the collected items
    "reward": "rewardimage" // filename for the quest reward
}

```

- `400 bad request` If the data sent is malformed
- `401 unauthorized` If the request is missing a session cookie
- `409 conflict` If the user has already scanned the quest item
- `403 forbidden`If the session cookie is invalid


## POST /api/quest

Get existing quests and how far the user has progressed on each quest.

The request requires that a valid session cookie obtainable by `/api/login`.

The server responds with:

- `200 ok` with an array of objects with the following format:
    

``` json
{
    "id": 0,
    "name": "A Gallery",
    "description": "Here be The Scream",
    "totalItemCount": 10,
    "collectedItemCount": [3, 1]
}

```

- `401 unauthorized` If the request was sent without a session cookie
- `403 forbidden`If the request was sent with an invalid session cookie

## GET /api/info/:reward_id

Get all data related to the reward_id

The server responds with:

- `200 ok` if the user has collected the reward, the response body contains the following format:

```json
   {
      "title": "The Squeek",
      "description": "A bridge with a squeeking person",
      "filename": "squeekerfile"
   }
```

-- `401 not authorized` If the session cookie is missing

-- `403 forbidden` If the user has not received this reward
