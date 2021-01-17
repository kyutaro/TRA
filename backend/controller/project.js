const express = require('express');
const app = express();
const systemLogger = require ('../config/log4js-config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Project = require('./../model/project');

mongoose.connect('mongodb://localhost:27017/TRA', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

module.exports = {
  getProjectData: function (res) {
    systemLogger.debug("getProjectDataの中");
    Project.find({task: "test"}, function(err, docs) {
      if (err) console.error(err);
      console.log(docs);
      for (let val of docs) {
        console.log(val);
        mongoose.disconnect();
      }
  
        // systemLogger.debug("getProjectData：成功");
        // systemLogger.debug(result);
        // return res.json(result);
    });
  },
};
