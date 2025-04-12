const Ticket = require('../models/ticket.model');
const Route = require('../models/route.model');
const User = require('../models/user.model'); // Assuming you have a user model

// Create a new ticket
const createTicket = async (req, res) => {
    const { user_id: _id, route_id } = req.body;

    try {
        const route = await Route.findById(route_id);
        if (!route) {
            throw new Error('Route not found');
        }

        const ticketPrice = route.price;

        const purchaseTime = new Date();

        const validUntil = new Date(purchaseTime);
        validUntil.setHours(validUntil.getHours() + 7);

        const ticket = await Ticket.create({ 
            user_id: _id, 
            route_id, 
            purchase_time: purchaseTime, 
            valid_until: validUntil 
        });

        await User.findByIdAndUpdate(_id, { $push: { ticket_history: ticket._id } });

        res.status(201).json({
            success: true,
            ticket,
            route_price: ticketPrice
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// TO get all tickets
const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json({
            success: true,
            tickets
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// TO get a single ticket
const getTicketById = async (req, res) => {
    const { id } = req.params;

    try {
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            throw new Error('Ticket not found');
        }
        const route = await Route.findById(ticket.route_id);

        res.status(200).json({
            success: true,
            ticket,
            route_price: route.price
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        });
    }
};

const checkTicket = async (req, res) => {
    const {id} =req.params

    try {
        if(!id){
            throw new Error("Invalid ID")
        }
        const ticket = await Ticket.findById(id)
        if(!ticket){
            throw new Error("Ticket not found")
        }
         // Get the current time
         const currentTime = new Date();

         // Check if the ticket is still valid
         if (currentTime > ticket.valid_until) {
             throw new Error("Ticket has expired");
         }

        res.status(200).json({
            success: true,
            ticket
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        })
    }
}



module.exports = {
    createTicket,
    checkTicket,
    getAllTickets,
    getTicketById,
};
