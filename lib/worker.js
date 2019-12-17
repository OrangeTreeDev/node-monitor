'use strict';
const IndicatorEmitter = require('./IndicatorEmitter');
const { server, io } = require('./socketServer');

server.listen(process.argv[2]);

const descriptor = {
  sys_mem_usage_rate: 'indicator:sys_mem_usage_rate',
  v8_heap_usage_rate: 'indicator:v8_heap_usage_rate',
};
const indicatorEmitter = new IndicatorEmitter(descriptor);

process.on('message', (indicators) => {
  if(Array.isArray(indicators)) {
    indicators.forEach((indicator) => {
      // 设置指标值
      indicatorEmitter[indicator.type] = indicator.value;
    });
  }
});

function bindIoSocket() {
  Object.keys(descriptor).forEach(key => {
    const eventName = descriptor[key];
    indicatorEmitter.on(eventName, (data) => io.emit(eventName, data));
  });
}
bindIoSocket();