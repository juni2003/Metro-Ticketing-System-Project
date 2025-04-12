const Complaint = require('../models/complaint.model');
const mongoose = require('mongoose');

const createComplaint = async (req, res) => {
    const { user_id, subject, message } = req.body;
    const complaint_details = message;
    try {
        const complaint = await Complaint.create({ user_id, subject, complaint_details });

        if (!complaint) {
            throw new Error('Error creating complaint');
        }

        res.status(201).json({
            success: true,
            complaint
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};


const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().populate('user_id route_id');

        res.status(200).json({
            success: true,
            complaints
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

const getComplaintById = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID');
        }

        const complaint = await Complaint.findById(id).populate('user_id route_id');

        if (!complaint) {
            throw new Error('Complaint not found');
        }

        res.status(200).json({
            success: true,
            complaint
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// const updateComplaintStatus = async (req, res) => {
//     const { id } = req.params;
//     const { status } = req.body;

//     try {
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             throw new Error('Invalid ID');
//         }

//         const complaint = await Complaint.findByIdAndUpdate(id, { status }, { new: true });

//         if (!complaint) {
//             throw new Error('Error updating complaint status');
//         }

//         res.status(200).json({
//             success: true,
//             complaint
//         });
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             error: error.message
//         });
//     }
// };

const deleteComplaint = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID');
        }

        const complaint = await Complaint.findByIdAndDelete(id);

        if (!complaint) {
            throw new Error('Error deleting complaint');
        }

        res.status(200).json({
            success: true,
            message: 'Complaint deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    createComplaint,
    getAllComplaints,
    getComplaintById,
    deleteComplaint
};