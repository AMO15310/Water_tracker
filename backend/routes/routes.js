const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllers");
router.get("/users", controller.getUsers);
router.post("/user", controller.postUser);
router.delete("/user/:id", controller.delUser);
router.put("/user/:id", controller.updateTable);
router.get("user/:id", controller.getSingle);
module.exports = router;
