const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers");

router.get("/totalunits", controllers.sumCons);
router.get("/totalpaid", controllers.sumPaid);
router.get("/totalbal", controllers.getSumOfBal);
router.get("/usersbal", controllers.getTopBalance);
router.get("/users", controllers.getUsers);
router.post("/user", controllers.postUser);
router.get("/user/:id", controllers.getSingle);
router.delete("/user/:id", controllers.delUser);
router.put("/user/:id", controllers.updateTable);
module.exports = router;
