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
  const queryText = `SELECT * FROM "plant" WHERE "user_id" = $1`;

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

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
