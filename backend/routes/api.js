const express = require('express');
const router = express.Router();
const systemLogger = require ('../config/log4js-config');
const Const = require ('../config/const');
const projectController = require ('../controller/project');

router.get('/v1', function(req, res, next) {
  systemLogger.debug("TOPの中");
  projectController.getProjectDList(res);
});

router.post('/v1/project/add', function(req, res, next) {
  systemLogger.debug("projectAddの中");
  projectController.addProject(req, res);
});

router.post('/v1/project/init', function(req, res, next) {
  systemLogger.debug("projectInitの中");
  projectController.getProjectData(req, res);
});

router.post('/v1/task/fetch', function(req, res, next) {
  systemLogger.debug("taskGetの中");
  console.log("taskGetの中");
  projectController.getTaskData(req, res);
});

router.post('/v1/category/add', function(req, res, next) {
  systemLogger.debug("categoryAddの中");
  projectController.addCategory(req, res);
});

router.post('/v1/task/add', function(req, res, next) {
  systemLogger.debug("taskAddの中");
  projectController.addTask(req, res);
});

/* フロントでは使わない。開発用のAPI */
if(Const.devFlg) {
  router.get('/v1/project/save', function(req, res, next) {
    console.log("projectSaveの中");
    systemLogger.debug("projectSaveの中");
    projectController.saveProjectAndCategory(res);
  });

  router.get('/v1/category/save', function(req, res, next) {
    console.log("categorySaveの中");
    systemLogger.debug("categorySaveの中");
    projectController.saveCategory(res);
  });

  router.get('/v1/task/save', function(req, res, next) {
    console.log("taskSaveの中");
    systemLogger.debug("taskSaveの中");
    projectController.saveTask(res);
  });
}

module.exports = router;
