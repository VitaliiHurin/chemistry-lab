const { Client } = require('node-json-rpc');
const { promisify } = require('util');
const uuidv4 = require('uuid/v4');

class RPC {
  constructor(conf) {
    this.clients = {};
    conf.forEach(({port}) => {
      this.clients[port] = new Client({
        port: port.toString(),
        host: 'localhost',
        path: '/',
        strict: true
      });
    });
  }
  
  call(client, method, params) {
    const callASync = promisify(this.clients[client.port].call);
    return callASync({ "jsonrpc": "2.0", "method": method, "params": params, "id": uuidv4() });
  }
}

module.exports = RPC;