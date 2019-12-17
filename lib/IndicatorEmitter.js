'use strict';

const EventEmitter = require('events');

function IndicatorEmitter(descriptor) {
  EventEmitter.call(this);
  this.descriptor = descriptor;

  this.defineReactive();   
}

// 继承EventEmitter
IndicatorEmitter.prototype = Object.create(EventEmitter.prototype);

IndicatorEmitter.prototype.constructor = IndicatorEmitter;
// 将指标描述转换为set/get形式
IndicatorEmitter.prototype.defineReactive = function() {
  const keys = Object.keys(this.descriptor);
  keys.forEach(key => {
    Object.defineProperty(this, key, {
      get() {
        return this[`_${key}`];
      },
      set(val) { // 触发指标变化事件
        this.emit(this.descriptor[key], val);
        this[`_${key}`] = val;
      }
    });
  });
}
module.exports = IndicatorEmitter;