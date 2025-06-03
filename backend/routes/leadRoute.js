const express = require('express');
const router = express.Router();
const {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead
} = require('../controllers/leadController');

// Base route: /api/leads

// Create new lead
router.post('/', createLead);

// Get all leads with filtering and sorting
router.get('/', getLeads);

router.get('/:id', getLead);

// Update lead
router.put('/:id', updateLead);

// Delete lead
router.delete('/:id', deleteLead);

module.exports = router;
