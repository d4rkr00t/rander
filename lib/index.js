'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var Rander = (function () {
  function Rander(options, imports) {
    if (options === undefined) options = {};

    _classCallCheck(this, Rander);

    this.options = options;
    this.imports = imports;
    this.messages = imports.messages;
    this.request = imports.request;

    this.config = this.loadConfig(options.homeDir);
  }

  Rander.prototype.requirePlugin = function requirePlugin(transportName) {
    try {
      return require('rander-' + transportName);
    } catch (e) {
      this.messages.error('Module with transportName \'rander-' + transportName + '\' is not installed, try run npm i -g rander-' + transportName);
    }
  };

  Rander.prototype.setup = function setup(transportName, params) {
    var transport = this.requirePlugin(transportName);

    if (!transport) return;

    if (!transport.setup) {
      this.messages.error('Module \'rander-' + transportName + '\' doesn\'t have setup handler');
      return;
    }

    transport.setup(params, this.getTransportConfig(transportName), this.imports);
  };

  Rander.prototype.run = function run(transportName, params) {
    var transport = this.requirePlugin(transportName);

    if (!transport) return;

    if (!transport.run) {
      this.messages.error('Module \'rander-' + transportName + '\' doesn\'t have run handler');
      return;
    }

    transport.run(params, this.getTransportConfig(transportName), this.imports);
  };

  Rander.prototype.loadConfig = function loadConfig(homeDir) {
    var configPath = _path2['default'].join(homeDir, '.randerrc');

    if (_fs2['default'].existsSync(configPath)) {
      return JSON.parse(_fs2['default'].readFileSync(configPath));
    }

    return {};
  };

  Rander.prototype.getTransportConfig = function getTransportConfig(transportName) {
    return this.config[transportName] || {};
  };

  return Rander;
})();

exports['default'] = Rander;
module.exports = exports['default'];