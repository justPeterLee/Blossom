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
  const queryText = `SELECT "garden"."garden_table_id", "garden"."garden_name", "garden"."garden_created_at", "garden"."garden_type", "garden"."garden_theme", COUNT(*) FROM "plant" 
  JOIN "garden" ON "garden"."garden_table_id" = "plant"."garden_id"
  WHERE "plant"."user_id" = $1 and "garden"."user_id" = $1
  GROUP BY "garden"."garden_table_id";
  `;
  if (req.isAuthenticated()) {
    pool
      .query(queryText, [user.id])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log("Error with getting user's garden data, ", err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

// GET Garden Filter
router.get("/:id", rejectUnauthenticated, (req, res) => {
  if (req.isAuthenticated) {
    const user = req.user;
    const gardenId = req.params.id;
    const queryText = `SELECT "plant"."plant_table_id", "plant"."plant_name", "plant_info"."scientific_name" FROM "plant_info" 
    JOIN "plant" ON "plant"."plant_info_id" = "plant_info"."plant_info_table_id" 
    WHERE "plant"."user_id" = $1 AND "plant"."garden_id" = $2;`;

    pool
      .query(queryText, [user.id, gardenId])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log("Error with getting garden filter data: ", err);
        res.sendStatus(500)
      });
  }
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
