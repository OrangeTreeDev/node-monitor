'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');

const server = http.createServer((req, res) => {
  const indexPath = path.resolve(__dirname, '../client/build/index.html')
  if (req.url === '/') {
    const stream = fs.createReadStream(indexPath);
    res.statusCode = 200;
    stream.pipe(res);
    return;
  }
  
  const resourcePath = path.resolve(__dirname, `../client/build${req.url}`);
  fs.stat(resourcePath, (err) => {
    let filePath = resourcePath; 
    if (err) { // 默认返回html资源
      filePath = indexPath;
    }
    res.statusCode = 200;
    fs.createReadStream(filePath).pipe(res);
  });
});

const io = require('socket.io')(server); // 创建socket

module.exports = {
  io,
  server
};
