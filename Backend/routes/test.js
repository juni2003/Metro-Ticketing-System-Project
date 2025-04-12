const express = require("express");
const router = express.Router();
const {
  getHello,
  getHome,
  testDB,
  createData,
  getAllData,
  getSingleData,
  updateData
} = require("../controllers/test.controller");

router.get("/", (req, res) => {
  res.json({ mssg: "Hello, World!" });
});

router.get("/home", getHome);
router.get("/hello", getHello);

router.post("/create-test-data", testDB);

router.post("/create-test", createData);

router.get("/get-all-test", getAllData);

router.get("/get-single-test/:id", getSingleData)

router.patch('/update/:id', updateData)

module.exports = router;
