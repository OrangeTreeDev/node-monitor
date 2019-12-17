'use strict';

const Collector = require('./lib/Collector');
const path = require('path');
const child_process = require('child_process');

module.exports = function(port = 3000, frequency = 1000) {
  // 启动工作进程，发送监控指标到客户端
  const modulePath = path.resolve(__dirname, './lib/worker.js');
  const indicatorProcess = child_process.fork(modulePath, [ port ]);
  
  const collector = new Collector(indicatorProcess, frequency);
  collector.start();
  
  indicatorProcess.on('exit', () => {
    collector.stop();
  });
};