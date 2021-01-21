const systemLogger = require ('../config/log4js-config');
const Const = require ('../config/const');
const mongoose = require('mongoose');
const Project = require('./../model/project');

module.exports = {
  getProjectDList: function (res) {
    mongoose.connect(Const.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    
    Project.find({del_flg: 0}, (err, ret) => {
      if (err) console.error(err);
      mongoose.disconnect();
      return res.send(ret);
    });
  },
  
  getProjectData: function (res) {
    mongoose.connect(Const.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    
    Project.find({del_flg: 0}, (err, ret) => {
      if (err) console.error(err);
      mongoose.disconnect();
      return res.send(ret);

    });
  },

  addProject: function (req, res) {
    mongoose.connect(Const.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    const projectSave = new Project({ project_name: req.body.addProjectName, del_flg: 0 });
    projectSave.save((err, ret) => {
      if (err) console.error(err)
      console.log(ret)
      mongoose.disconnect();
      return res.send(ret);
    });
  }
};
