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
  const queryText = `SELECT * FROM "garden" WHERE "user_id" = $1`;
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
  }
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
