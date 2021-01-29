const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TasksSchema = new mongoose.Schema({
  categories: {
    type: Schema.Types.ObjectId,
    ref: 'Categories' 
  },
  task_name: String,
  work_time: String,
  del_flg: Number
});

module.exports = mongoose.model('Tasks', TasksSchema);