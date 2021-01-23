const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  project_id: Number,
  project_name: String,
  del_flg: Number,
  categories: [{ 
    type: Schema.Types.ObjectId,
    ref: 'Categories' 
  }]
});

const CategoriesSchema = new Schema({
  projects: {
    type: Schema.Types.ObjectId,
    ref: 'Projects' 
  },
  category_id: Number,
  category_name: String,
  del_flg: Number
});

const Projects = mongoose.model('Projects', ProjectsSchema);
const Categories = mongoose.model('Categories', CategoriesSchema);

module.exports = {Projects, Categories}