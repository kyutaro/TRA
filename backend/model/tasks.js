const mongoose = require('mongoose')

const TasksSchema = new mongoose.Schema({
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories' },
  task_name: String,
  worktime: String,
  del_flg: Number
});

module.exports = mongoose.model('Tasks', TasksSchema);