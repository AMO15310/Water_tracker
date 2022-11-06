const express = require("express");
const router = express.Router();
const {
  getSingle,
  getUsers,
  postUser,
  delUser,
  updateTable,
} = require("../controllers/controllers");
router.get("/users", getUsers);
router.post("/user", postUser);
router.get("/user/:id", getSingle);
router.delete("/user/:id", delUser);
router.put("/user/:id", updateTable);
module.exports = router;
