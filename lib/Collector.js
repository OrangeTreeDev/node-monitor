'use strict';

const os = require('os');

function Collector(indicatorProcess, frequency = 1000) {
  this.indicatorProcess = indicatorProcess;
  this.frequency = frequency;
  this.interval = null;
}

Collector.prototype.start = function() {
  this.interval = setInterval(() => {
    const sys_mem_usage_rate = (os.totalmem() - os.freemem()) / os.totalmem();
    const v8_heap_usage_rate = process.memoryUsage().heapUsed / process.memoryUsage().heapTotal;
    const currentTimestamp = Date.now();
    const message = [
      {
        type: 'sys_mem_usage_rate',
        value: [currentTimestamp, sys_mem_usage_rate],
      },
      {
        type: 'v8_heap_usage_rate',
        value: [currentTimestamp, v8_heap_usage_rate],
      }
    ];
    this.indicatorProcess.send(message);
  }, this.frequency);
}

Collector.prototype.stop = function() {
  this.interval && clearInterval(this.interval);
}

module.exports = Collector;