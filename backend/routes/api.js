var express = require('express');
var router = express.Router();
const systemLogger = require ('../config/log4js-config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("通ってる？");
  systemLogger.debug("resssss：");
  systemLogger.debug(res);
  res.send('respond with a resource API');
});

module.exports = router;
