const express = require('express');
const app = express();
const systemLogger = require ('../config/log4js-config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const Project = require('./../model/project');

// var Project = mongoose.model('Project', ProjectSchema);

// mongoose.connect('mongodb://localhost:27017/TRA', { useNewUrlParser: true, useUnifiedTopology: true });
// app.use(bodyParser.urlencoded({ extended:false }));
// app.use(bodyParser.json());

module.exports = {
  getProjectData: function (res) {
    systemLogger.debug("getProjectDataの中");
    // Project.find(function (err, result) {
    //   if (!err) {
    //     systemLogger.debug("getProjectData：成功");
    //     // systemLogger.debug(res.json(result));
    //     return res.json(result);
    //   } else {
    //     systemLogger.debug("getProjectData：失敗");
    //     return res.status(500).send("get all user faild.");
    //   }
    // });
  },
};
