const Route = require("../models/route.model");
const mongoose = require("mongoose");

//To create route collection / table
const routeTB = async (req, res) => {
  const route_id = 1;
  const price = 30;
  const stations = [
    "Saddar",
    "Mareer Chowk",
    "Committee Chowk",
    "Liaquat Bagh",
    "Waris Khan",
    "Chandni Chowk",
    "Rehmanabad",
    "6th Road",
    "Shamsabad",
    "Faizabad",
    "I.J.P Road",
    "Potohar Station",
    "Khayaban-e-Johar",
    "Faiz Ahmed Faiz",
    "Kashmir Highway",
    "Chaman Metro Station",
    "Melody",
    "Centaurus",
    "Shaheed-e-Millat",
    "Parade Ground",
    "Pak Secretariat",
    "Parliament House",
  ];

  try {
    const route = await Route.create({ route_id, price, stations });

    if (!route) {
      throw new Error("Error creating route");
    }

    res.status(200).json({
      success: true,
      route,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

// creating a single route data
const createRoute = async (req, res) => {
  const { route_id, price, stations } = req.body;

  try {
    const route = await Route.create({ route_id, price, stations });

    if (!route) {
      throw new Error("Error creating route");
    }

    res.status(200).json({
      success: true,
      route,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

//To get single route data

const getSingleRoute = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      throw new Error("Invalid ID");
    }

    const route = await Route.findById(id);

    if (!route) {
      throw new Error("Error fetching data");
    }

    res.status(200).json({
      success: true,
      route,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

//To get all route data
const getAllRoute = async (req, res) => {
  try {
    const route = await Route.find();

    if (!route) {
      throw new Error("Error fetching route data");
    }

    res.status(200).json({
      success: true,
      route,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

//To update a whole data
const updateRoute = async (req, res) => {
  const { id } = req.params;

  const { route_id, price, stations } = req.body;

  try {
    const route = await Route.findByIdAndUpdate(
      id,
      { route_id, price, stations },
      { new: true }
    );

    if (!route) {
      throw new Error("Error updating route");
    }

    res.status(200).json({
      success: true,
      route,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

//To add a single station data
const addRouteStation = async (req, res) => {
  const { id } = req.params;
  const { stationName } = req.body;
  const station = stationName;

  try {
    if (!id) {
      throw new Error("Invalid ID");
    }
    const { stationName } = await Route.findById(id);

    if (!route) {
      throw new Error("Route not found");
    }

    stationName.push(station);

    route = await route.save();

    res.status(200).json({
      success: true,
      route,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

//To delete a route
const deleteRoute = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      throw new Error("Invalid ID");
    }

    const route = await Route.findByIdAndDelete(id);

    if (!route) {
      throw new Error("Error deleting route");
    }

    res.status(200).json({
      success: true,
      route,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

//to delete a single station data
const deleteRouteStation = async (req, res) => {
  const { id } = req.params;
  const { stationName } = req.body;

  try {
    let route = await Route.findById(id);

    if (!route) {
      throw new Error("Route station not found");
    }

    route.stations = route.stations.filter(
      (station) => station !== stationName
    );

    route = await route.save();

    res.status(200).json({
      success: true,
      route,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  addRouteStation,
  createRoute,
  deleteRoute,
  deleteRouteStation,
  getSingleRoute,
  getAllRoute,
  routeTB,
  updateRoute,
};
