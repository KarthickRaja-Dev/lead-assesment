const Lead = require('../models/Lead');

// Helper function to calculate lead score
const calculateLeadScore = (lead) => {
  let score = 0;
  
  // Budget weight (40%)
  if (lead.budget) {
    // Score higher for larger budgets (assuming max budget of 1M)
    score += (lead.budget / 1000000) * 40;
  }

  // Location match (30%)
  // Simple scoring - presence of location adds points
  if (lead.location) {
    score += 30;
  }

  // Form completeness (30%)
  const requiredFields = ['name', 'email', 'phone', 'budget', 'location'];
  const filledFields = requiredFields.filter(field => lead[field]);
  score += (filledFields.length / requiredFields.length) * 30;

  // Ensure score is between 0-100
  return Math.min(Math.max(Math.round(score), 0), 100);
};

// Create new lead
exports.createLead = async (req, res) => {
  try {
    const leadData = req.body;
    
    // Calculate lead score
    leadData.score = calculateLeadScore(leadData);
    
    const lead = await Lead.create(leadData);
    
    res.status(201).json({
      success: true,
      data: lead
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all leads with filtering and sorting
exports.getLeads = async (req, res) => {
  try {
    const query = {};
    const sort = {};

    // Filter by budget range
    if (req.query.budget_min) {
      query.budget = { $gte: parseFloat(req.query.budget_min) };
    }
    if (req.query.budget_max) {
      query.budget = { ...query.budget, $lte: parseFloat(req.query.budget_max) };
    }

    // Filter by location
    if (req.query.location) {
      query.location = new RegExp(req.query.location, 'i');
    }

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by score range
    if (req.query.score_min) {
      query.score = { $gte: parseFloat(req.query.score_min) };
    }
    if (req.query.score_max) {
      query.score = { ...query.score, $lte: parseFloat(req.query.score_max) };
    }

    // Sorting
    if (req.query.sort) {
      const sortField = req.query.sort.startsWith('-') ? 
        req.query.sort.substring(1) : req.query.sort;
      const sortOrder = req.query.sort.startsWith('-') ? -1 : 1;
      sort[sortField] = sortOrder;
    } else {
      // Default sort by score descending
      sort.score = -1;
    }

    const leads = await Lead.find(query)
      .sort(sort)
      .select('-__v');

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get single lead
exports.getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    res.status(200).json({
      success: true,
      data: lead
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update lead
exports.updateLead = async (req, res) => {
  try {
    const leadData = req.body;
    
    // Recalculate score if relevant fields are updated
    if (leadData.budget || leadData.location) {
      const currentLead = await Lead.findById(req.params.id);
      const updatedLead = { ...currentLead.toObject(), ...leadData };
      leadData.score = calculateLeadScore(updatedLead);
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      leadData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    res.status(200).json({
      success: true,
      data: lead
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete lead
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
