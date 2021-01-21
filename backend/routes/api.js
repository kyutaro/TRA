const express = require('express');
const router = express.Router();
const systemLogger = require ('../config/log4js-config');
const projectController = require ('../controller/project');

/* GET users listing. */
router.get('/v1', function(req, res, next) {
  systemLogger.debug("TOPの中");
  projectController.getProjectDList(res);
});

router.get('/v1/project/init', function(req, res, next) {
  systemLogger.debug("projectInitの中");
  projectController.getProjectData(res);
});

router.post('/v1/project/add', function(req, res, next) {
  systemLogger.debug("projectAddの中");
  projectController.addProject(req, res);
});

router.post('/v1/category/add', function(req, res, next) {
  systemLogger.debug("categoryAddの中");
  res.send('/category/addのAPIの応答に成功しました！');
});

router.post('/v1/task/add', function(req, res, next) {
  systemLogger.debug("taskAddの中");
  res.send('/task/addのAPIの応答に成功しました！');
});

module.exports = router;
