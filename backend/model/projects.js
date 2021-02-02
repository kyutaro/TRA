const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  project_name: String,
  del_flg: Number,
  categories: [{ 
    type: Schema.Types.ObjectId,
    ref: 'Categories' 
  }]
});

module.exports = mongoose.model('Projects', ProjectsSchema);