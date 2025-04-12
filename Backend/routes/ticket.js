const express = require("express");
const router = express.Router();
const {
  createTicket,
  checkTicket,
  getAllTickets,
  getTicketById,
} = require("../controllers/ticket.controller");

router.post("/create-ticket", createTicket);

router.get("/check-ticket/:id", checkTicket);

router.get("/all-tickets", getAllTickets);

router.get("/ticket/:id", getTicketById);


module.exports = router;
