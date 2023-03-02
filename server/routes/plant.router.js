const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
/**
 * GET route template
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  // GET route code here
  const user = req.user;
  const queryText = `SELECT * FROM "plant" WHERE "user_id" = $1;`;

  if (req.isAuthenticated()) {
    pool
      .query(queryText, [user.id])
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
    const plantId = req.params.id;
    const queryText = `SELECT "scientific_name", "sunlight_level", "water_level", "sci_origin", "sci_maintenance", "sci_cycle", "sci_type", "sci_soil", "sci_growth_rate", "scientific_color" FROM "plant_info" 
        JOIN "plant" ON "plant"."plant_info_id" ="plant_info"."id"
        WHERE "plant"."id" = $1;`;

    pool
      .query(queryText, [plantId])
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
