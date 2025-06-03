const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return /^\+?[\d\s-]+$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  budget: {
    type: Number,
    min: [0, 'Budget cannot be negative']
  },
  location: {
    type: String,
    trim: true
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost'],
    default: 'new'
  },
  notes: {
    type: String,
    trim: true
  },
  source: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

leadSchema.index({ email: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ score: -1 });

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead; 