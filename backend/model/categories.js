const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategoriesSchema = new Schema({
  projects: {
    type: Schema.Types.ObjectId,
    ref: 'Projects' 
  },
  tasks: [{ /* 紐付けで親になる方は配列[]の形にする */
    type: Schema.Types.ObjectId,
    ref: 'Tasks' 
  }],
  category_name: String,
  del_flg: Number
});

module.exports = mongoose.model('Categories', CategoriesSchema);