const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
  project_name: String,
  category_id: Number,
  task_id: Number,
  del_flg: Number
});

module.exports = mongoose.model('Project', ProjectSchema);