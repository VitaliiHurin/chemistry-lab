const { Client } = require('node-json-rpc');
const { promisify } = require('util');
const uuidv4 = require('uuid/v4');

class RPC {
  constructor(conf) {
    this.clients = {};
    Object.values(conf).forEach((p) => {
      this.clients[p] = new Client({
        port: p.toString(),
        host: 'localhost',
        path: '/',
        strict: true
      });
    });
  }

  call(client, method, params) {
    const callASync = promisify(this.clients[client].call);
    return callASync({ "jsonrpc": "2.0", "method": method, "params": params, "id": uuidv4() });
  }
}

module.exports = RPC;