const express = require("express")
const router = express.Router()
const { addRouteStation,
    createRoute,
    deleteRoute,
    deleteRouteStation,
    getSingleRoute,
    getAllRoute,
    routeTB,
    updateRoute, } = require("../controllers/route.controller")

router.post("/create-db", routeTB )

router.post("/create-route", createRoute)

router.get("/get-all-route", getAllRoute)

router.get("/get-single-route/:id", getSingleRoute)

router.patch("/update-route/:id", updateRoute)

router.delete("/delete-route/:id", deleteRoute)

router.post("/add-route-station/:id", addRouteStation)

router.delete("/delete-route-station/:id", deleteRouteStation)



module.exports = router;


