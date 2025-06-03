const express = require('express')

const router = express.Router();
const {authenticate, checkOwnership} = require('../middleware/auth')

const {
    getAllEvents,
    updateEvent,
    createEvent,
    deleteEvent
} = require('../controller/Event')


router.get('/', authenticate, getAllEvents);
router.post('/', authenticate, createEvent);
router.put('/', authenticate, checkOwnership, updateEvent);
router.delete('/', authenticate, checkOwnership, deleteEvent);

module.exports = router;