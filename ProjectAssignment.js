const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  project_code: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  start_date: Date
});

module.exports = mongoose.model('ProjectAssignment', assignmentSchema);
