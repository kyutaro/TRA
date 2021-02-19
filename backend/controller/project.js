const systemLogger = require ('../config/log4js-config');
const Const = require ('../config/const');
const mongoose = require('mongoose');
const Projects = require('./../model/projects');
const Categories = require('./../model/categories');
const Tasks = require('./../model/tasks');

module.exports = {
  workTimeToSeconds: 0, /* カウント時間 */
  setIntervalId: 0, /* カウント用関数のID管理のための変数 */
  getProjectDList: function (res) {
    mongoose.connect(Const.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    
    Projects.find({del_flg: 0}, (err, ret) => {
      if (err) console.error(err);
      console.log(ret);
      mongoose.disconnect();
      return res.send(ret);
    });
  },
  
  addProject: function (req, res) {
    mongoose.connect(Const.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    const projecstSave = new Projects({
      _id: new mongoose.Types.ObjectId(),
        project_name: req.body.addProjectName,
        del_flg: 0 
    });
    projecstSave.save((err, ret) => {
      if (err) console.error(err)
      console.log(ret)
      mongoose.disconnect();
      return res.send(ret);
    });
  },

  getProjectData: function (req, res) {
    mongoose.connect(Const.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    Categories
    .find({ projects: req.body.projectId })
    .populate('projects')
    .exec(function (err, ret) {
      if (err) return handleError(err);
      mongoose.disconnect();
      return res.send(ret);
    });
  },

  getTaskData: function (req, res) {
    mongoose.connect(Const.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    Tasks
    .find({ categories: req.body.categoryId })
    .populate('categories')
    .exec(function (err, ret) {
      if (err) return handleError(err);
      mongoose.disconnect();
      return res.send(ret);
    });
  },

  addCategory: function (req, res) {
    mongoose.connect(Const.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    const categories = new Categories({
      projects: req.body.projectId,
      category_name: req.body.categoryName,
      del_flg: 0
    });
    
    categories.save(function (err, ret) {
      if (err) console.log(err);
      return res.send(ret);
    });
  }, 

  addTask: function (req, res) {
    mongoose.connect(Const.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    const tasks = new Tasks({
      categories: req.body.categoryId, /* ここにcategoriesコレクションの_idを入れる */
      task_name: req.body.taskName,
      work_time: '00:00:00',
      del_flg: 0
    });
    
    tasks.save(function (err, ret) {
      if (err) console.log(err);
      return res.send(ret);
    });
  }, 

  taskStart: function (req, res) {
    console.log("taskStartの中");
    workTimeToSeconds = req.body.workTimeToSeconds;
    setIntervalId = setInterval(this.cntWorkTime, 1000);
    
    return res.send('tasStart sunccess!')
  },

  cntWorkTime: function () {
    workTimeToSeconds++
  },

  taskStop: function (req, res) {
    clearInterval(setIntervalId);

    let workTime = this.secondsToworkTime();
    this.insertWorktime(req.body.taskId, workTime, res);
  },

  secondsToworkTime: function() {
    let hour = Math.floor(workTimeToSeconds / 3600)
    let minutes = Math.floor((workTimeToSeconds % 3600) / 60)
    let seconds = ((workTimeToSeconds % 3600) % 60)

    // 画面上で時間表記が0:0:0と一桁で表記されるのを防ぐ
    if(hour < 10) {
      hour = "0" + String(hour)
    } else {
      hour = String(hour)
    }
    if(minutes < 10) {
      minutes = "0" + String(minutes)
    } else {
      minutes = String(minutes)
    }
    if(seconds < 10) {
      seconds = "0" + String(seconds)
    } else {
      seconds = String(seconds)
    }

    return String(hour) + ":" + String(minutes) + ":" + String(seconds)
  },

  insertWorktime: function(taskId, workTime, res) {
    mongoose.connect(Const.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    Tasks.findByIdAndUpdate({ _id: taskId }, { $set: {work_time: workTime} }, { new : false }, (err, ret) => {
      if (err) console.log(err);
      mongoose.disconnect();
      return res.send("update success!");
    });
  },

///////////////////////////////////////////////////////////
/* 本番では使わない。開発用のAPI */
  saveProjectAndCategory: function (res) {
    mongoose.connect(Const.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    const projects = new Projects({
      _id: new mongoose.Types.ObjectId(),
      project_name: 'Alan Smith',
      del_flg: 0,
    });
    
    projects.save(function (err) {
      if (err) console.log(err);
    
      const categories1 = new Categories({
        projects: projects._id,
        category_id: 2,
        category_name: 'Alan Royale',
        del_flg: 0
      });
    
      categories1.save(function (err, ret) {
        if (err) console.log(err);
        return res.send(ret);
      });
    });
  },

  saveCategory: function (res) {
    mongoose.connect(Const.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    const categories = new Categories({
      projects: '600b94d3ab53021f74fdbaee', /* ここにprojectコレクションの_idを入れる */
      category_name: 'Alan Alan Alan',
      del_flg: 0
    });
    
    categories.save(function (err, ret) {
      if (err) console.log(err);
      return res.send(ret);
    });
  },

  saveTask: function (res) {
    mongoose.connect(Const.mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    const tasks = new Tasks({
      categories: '6013ab0884f90256c89ca340', /* ここにcategoriesコレクションの_idを入れる */
      task_name: 'Task Alan Alan',
      work_time: '00:00:00',
      del_flg: 0
    });
    
    tasks.save(function (err, ret) {
      if (err) console.log(err);
      return res.send(ret);
    });
  }
///////////////////////////////////////////////////////////
};
