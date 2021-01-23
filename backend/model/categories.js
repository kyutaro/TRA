const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategoriesSchema = new Schema({
  projects: {
    type: Schema.Types.ObjectId,
    ref: 'Projects' 
  },
  category_id: Number,
  category_name: String,
  del_flg: Number
});

module.exports = mongoose.model('Categories', CategoriesSchema);