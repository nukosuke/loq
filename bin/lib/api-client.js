'use strict';
var http = require('http');

module.exports = class ApiClient {
  constructor(host, port) {
    this.host = host;
    this.port = port;
  }

  setHost(host) {
    this.host = host;
    return `host = [${this.host}]`;
  }

  setPort(port) {
    this.port = port;
    return `port = [${this.port}]`;
  }

  getHost() {
    return `host = [${this.host}]`;
  }

  getPort() {
    return `port = [${this.port}]`;
  }

  authenticate(identifier, password) {
    var req = http.request({
      hostname: this.host,
      port: this.port,
      path: '/api/authenticate/token',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }, res => {
      res.on('data', chunk => {
        var response = JSON.parse(chunk.toString());
        this.JWT = response.JWT;
      });
      res.on('end', () => console.log(`get JWT ${this.JWT}`));
    });

    req.on('error', err => console.log(err));
    req.write(JSON.stringify({ identifier, password }));
    req.end();
  }

  getJWT() {
    return `JWT = ${this.JWT}`;
  }
}
