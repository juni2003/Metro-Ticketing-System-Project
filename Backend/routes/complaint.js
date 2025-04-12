const express = require('express');
const router = express.Router();
const {
    createComplaint,
    getAllComplaints,
    getComplaintById,
    deleteComplaint
} = require('../controllers/complaint.controller');

router.post('/create-complaint', createComplaint);

router.get('/get/complaint?', getAllComplaints);

router.get('/:id', getComplaintById);

router.delete('/:id', deleteComplaint);

module.exports = router;
