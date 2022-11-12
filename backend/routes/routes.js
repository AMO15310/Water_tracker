const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers");
const verifyToken = require("../middleware/middleware");

router.get("/totalunits", verifyToken, controllers.sumCons);
router.get("/totalpaid", verifyToken, controllers.sumPaid);
router.get("/totalbal", verifyToken, controllers.getSumOfBal);
router.get("/usersbal", verifyToken, controllers.getTopBalance);
router.get("/users", verifyToken, controllers.getUsers);
router.post("/user", verifyToken, controllers.postUser);
router.get("/user/:id", verifyToken, controllers.getSingle);
router.delete("/user/:id", controllers.delUser);
router.put("/user/:id", verifyToken, controllers.updateTable);
router.post("/signup", controllers.signUp);
router.post("/login", controllers.login);
router.patch("/changepass", verifyToken, controllers.ChangePass);
module.exports = router;
