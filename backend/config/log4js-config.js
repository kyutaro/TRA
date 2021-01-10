const log4js = require('log4js');

// ログ出力設定
log4js.configure({
  appenders: {
    system: {type: 'file', filename: 'system.log'}
  },
  categories: {
    default: {appenders:['system'], level: 'debug'}
  }
});

// ログカテゴリはdefaultを指定する
var systemLogger = log4js.getLogger();

module.exports = systemLogger;
