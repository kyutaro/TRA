const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
  project_id: Number,
  // category_id: Number,
  task: String,
  worktime: String,
  del_flg: Number
});

module.exports = mongoose.model('Project', ProjectSchema);