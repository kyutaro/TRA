const express = require('express');
const router = express.Router();
const systemLogger = require ('../config/log4js-config');
const projectController = require ('../controller/project');

/* GET users listing. */
router.get('/v1', function(req, res, next) {
  res.send('respond with a resource API');
});

// const app = express();
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/TRA', { useNewUrlParser: true, useUnifiedTopology: true });
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended:false }));
// app.use(bodyParser.json());

// const ProjectSchema = new mongoose.Schema({
//   project_id: Number,
//   // category_id: Number,
//   task: 'String',
//   worktime: 'String',
//   del_flg: Number
// });
// const Project = mongoose.model('Project', ProjectSchema);

// const projectSave = new Project({project_id:2, task:"test2", worktime:"00:00:00", del_flg:0});
// projectSave.save(err => {
//   if (err) console.error(err)
//   console.log('saved')
//   // mongoose.disconnect();
// });

// const yourSchema = new mongoose.Schema({ name: 'String', size: 'String' });
// const Tank = mongoose.model('Tank', yourSchema); // default 接続  tanks
// 書類の作成
//const small = new Tank({name: 'Yasu2', size: 'large2'});
// small.save(err => {
//   if (err) console.error(err)
//   console.log('saved')
//   // mongoose.disconnect();
// });

// Tank.find({size: 'large2'}).where({name: 'Yasu2'}).exec((err, docs) => {
//   if (err) console.error(err);
//   for (let val of docs) {
//     console.log(val);
//     mongoose.disconnect();
//   }
// })


router.get('/v1/project/init', function(req, res, next) {
  systemLogger.debug("projectInitの中");
  let aa = projectController.getProjectData(res);
  // Project.find({task: "test"}, function(err, docs) {
  //   if (err) console.error(err);
  //   console.log(docs);
  //   for (let val of docs) {
  //     console.log(val);
  //     mongoose.disconnect();
  //   }
  // });
  res.send(aa);
});

router.post('/v1/project/add', function(req, res, next) {
  systemLogger.debug("projectAddの中");
  res.send('/project/addのAPIの応答に成功しました！');
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
