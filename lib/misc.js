var path = require('path');
var crypto = require('crypto');
var mkdirp = require('mkdirp');
var extend = require('extend');

var Misc = {};

Misc.DATA_LOG_DIR = 'logs';
Misc.DATA_MISC_DIR = 'misc';
Misc.DATA_PLUGIN_DIR = 'plugins';
Misc.DATA_SENTRY_DIR = 'sentry';

Misc.DEFAULT_CONFIG =  {
    displayName: '[Vapor] Automated Steam Client',
    admins: [],
    state: 'Online',
    logs: {
        dateFormat: 'YYYY-MM-DD HH:mm:ss',
        consoleLevel: 'debug',
        fileLevel: 'debug'
    },
    dataDir: './data',
    stdinSteamGuard: true
};

Misc.verifyConfig = function(config) {
    var extended = extend(true, {}, this.DEFAULT_CONFIG, config);

    // Only username and password are crucial
    if(!extended.username) {
        throw new Error('Config error: "username" not set.');
    }

    if(!extended.password) {
        throw new Error('Config error: "password" not set.');
    }

    return extended;
};

Misc.createFolderStructure = function(dataDir) {
    var paths = [
        dataDir,
        path.join(dataDir, this.DATA_LOG_DIR),
        path.join(dataDir, this.DATA_MISC_DIR),
        path.join(dataDir, this.DATA_PLUGIN_DIR),
        path.join(dataDir, this.DATA_SENTRY_DIR)
    ];

    paths.forEach(function(path) {
        mkdirp.sync(path);
    });
};

Misc.getSHA = function(bytes) {
    return crypto.createHash('sha1').update(bytes).digest();
};

module.exports = Misc;
