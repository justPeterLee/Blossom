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
  const queryText = `SELECT "garden"."id", "garden"."garden_name", "garden"."garden_created_at", "garden"."garden_type", "garden"."garden_theme", COUNT(*) FROM "plant" 
  JOIN "garden" ON "garden"."id" = "plant"."garden_id"
  WHERE "plant"."user_id" = $1 and "garden"."user_id" = $1
  GROUP BY "garden"."id";
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

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
