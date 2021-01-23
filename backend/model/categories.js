const mongoose = require('mongoose')

const CategoriesSchema = new mongoose.Schema({
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tasks' },
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Projects' },
  category_name: String,
  del_flg: Number
});

module.exports = mongoose.model('Categories', CategoriesSchema);