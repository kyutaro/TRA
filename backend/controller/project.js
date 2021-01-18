const express = require('express');
const app = express();
const systemLogger = require ('../config/log4js-config');
const mongoose = require('mongoose');
const Project = require('./../model/project');

// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended:false }));
// app.use(bodyParser.json());

module.exports = {
  getProjectData: function (res) {
    mongoose.connect('mongodb://localhost:27017/TRA', { useNewUrlParser: true, useUnifiedTopology: true });
    
    Project.find({task: "test"}, (err, ret) => {
      if (err) console.error(err);
      for (let val of ret) {
        console.log("中身：");
        console.log(val);
      }
      mongoose.disconnect();
      return res.send(ret);

    });
  },
  addProject: function (res) {
    const projectSave = new Project({project_id:2, task:"test2", worktime:"00:00:00", del_flg:0});
    projectSave.save(err => {
      if (err) console.error(err)
      console.log('saved')
      mongoose.disconnect();
    });
  }
};
