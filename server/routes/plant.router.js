const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
/**
 * GET route template
 */


// Show Plants (GET)
router.get("/", rejectUnauthenticated, (req, res) => {
  // GET route code here
  if (req.isAuthenticated()) {
    const user = req.user;
    const queryText = `SELECT "plant"."id", "plant"."plant_name", "plant_info"."scientific_name" FROM "plant_info" 
    JOIN "plant" ON "plant"."plant_info_id" = "plant_info"."id" 
    JOIN "user" ON "user"."id" = "plant"."user_id"
    WHERE "user"."id" = $1 AND "plant"."user_id" = $2;`;
    pool
      .query(queryText, [user.id, user.id])
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        console.log("Error with GETing user plants: ", err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

// Filter by Garden (GET)
router.get("/filter/garden/:id", rejectUnauthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    const gardenId = req.params.id;
    const queryText = `SELECT * FROM "plant" WHERE "garden_id" = $1;`;

    pool
      .query(queryText, [gardenId])
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        console.log("Error with GETing filtered garden plants: ", err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

// GET selected plant
router.get("/selected/:id", rejectUnauthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    const plantId = req.params.id;
    const queryText = `SELECT * FROM "plant" WHERE "id" = $1;`;

    pool
      .query(queryText, [plantId])
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        console.log("Error with getting selected plant: ", err);
      });
  } else {
    console.log("Unauthenticated");
    res.sendStatus(403);
  }
});

// GET plant info
router.get("/info/:id", rejectUnauthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user
    const plantId = req.params.id;
    const queryText = `SELECT * FROM "plant" 
    JOIN "plant_info" ON "plant_info"."id" = "plant"."plant_info_id"
    WHERE "plant"."user_id" = $1 AND "plant"."id" = $2;`;

    pool
      .query(queryText, [plantId, user.id])
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        console.log("Error with GETing plant info: ", err);
        res.sendStatus(500);
      });
  } else {
    console.log("Unauthenticated");
    res.sendStatus(403);
  }
});
/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
