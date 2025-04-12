const express = require("express");
const router = express.Router();
const {
  createData,
  deleteData,
  getAllData,
  getSingleData,
  getTicketHistory,
  userTB,
  updateData,
  searchByAnyString,
  loginUser,
  checkDuplicate,
  getUserIDByUsername,
  updatePasswrod,
  updateEmail} = require("../controllers/user.controller");

router.post("/create-db", userTB);
router.post("/create-user", checkDuplicate, createData);
router.get("/get-all-user", getAllData);
router.get("/get-single-user/:id", getSingleData);
router.get("/get-user-id/:username", getUserIDByUsername);
router.patch("/update-user/:id", updateData);
router.delete("/delete-user/:id", deleteData);
router.get("/ticket-history/:username", getTicketHistory);
router.get("/search/:query", searchByAnyString);
router.post("/login", loginUser);
router.patch("/update-password/:username", updatePasswrod);
router.patch('/update-email/:username', updateEmail);

module.exports = router;
