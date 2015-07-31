/**
 * Dependencies.
 */
var fs = require('fs');
var path = require('path');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var https = require('https');
var crypto = require('crypto');

var mkdirp = require('mkdirp');
var Steam = require('steam');
var SteamGroups = require('steam-groups');
var SteamCrypto = require('steam-crypto');

var API = require('./api');
var Utils = require('./utils');
var appinfo = require('../package.json');

/**
 * Export Vapor module.
 * @type {Vapor}
 */
module.exports = Vapor;

/**
 * Vapor class.
 * @constructor
 */
function Vapor() {
    // Array of loaded plugins - built-in and external
    this.loadedPlugins = [];

    // Login options object
    this.loginOptions = {};
}

// Make Vapor an event emitter
util.inherits(Vapor, EventEmitter);

Vapor.prototype.init = function(config) {
    // Store the config
    this.config = config;

    // Init logger
    this.log = require('./logger')(config);

    // Let's go
    this.log.info('Initializing %s v%s', appinfo.name, appinfo.version);

    // Create necessary folder structure
    createFolderStructure(config.dataDir);

    // Setup paths
    this.serverListPath = path.join(config.dataDir, 'misc', 'servers.json');
    this.sentryFilePath = path.join(config.dataDir, 'sentry', config.username + '.sentry');

    // Parse server list if we have one
    if(fs.existsSync(this.serverListPath)) {
        try {
            Steam.servers = JSON.parse(fs.readFileSync(this.serverListPath));
        } catch(error) {
            this.log.warn('Failed to load server list from cache.');
            this.log.warn(error);
        }
    }

    // Utils can be used by Vapor too
    this.utils = new Utils(this);

    // This is useful for enums
    this.Steam = Steam;

    // Main steam client
    this.client = new Steam.SteamClient();

    // Handlers
    this.steamUser = new Steam.SteamUser(this.client);
    this.steamFriends = new Steam.SteamFriends(this.client);
    this.steamTrading = new Steam.SteamTrading(this.client);
    this.steamGameCoordinator = new Steam.SteamGameCoordinator(this.client);

    // Extra handlers
    this.steamGroups = new SteamGroups(this.client);

    // Register core handlers
    require('./handlers')(this);
};

Vapor.prototype.use = function(identifier, plugin, data) {
    // Check arguments
    if(typeof identifier !== 'string') {
        throw new Error('Provided argument "identifier" is not type of string in "Vapor.use"');
    }

    if(typeof plugin !== 'function') {
        throw new Error('Provided argument "plugin" is not type of function in "Vapor.use"');
    }

    // Do not allow 2 plugins to share the same identifier
    if(!!~this.loadedPlugins.indexOf(identifier)) {
        this.log.warn('Plugin %s is already loaded. Please check your settings.', identifier);
        return;
    }

    plugin(Object.seal(new API(this, identifier, data)));

    this.loadedPlugins.push(identifier);

    this.log.info('"%s" has been loaded successfully.', identifier);
};

/**
 * Connects Vapor to Steam network.
 */
Vapor.prototype.connect = function() {
    this.log.info('Connecting to Steam network: %s (%s)', this.config.displayName, this.config.username);

    // Let's connect to Steam
    this.client.connect();
};

/**
 * Disconnects Vapor from Steam network.
 */
Vapor.prototype.disconnect = function() {
    this.log.info('Disconnecting and shutting down.');
    this.client.disconnect();
};

/**
 * Internal webLogOn method.
 *
 * Adopted from node-steam v0.6.8 by seishun.
 * @param  {string}   webLoginKey Login key provided by the logOn method.
 */
Vapor.prototype.webLogOn = function(webLoginKey) {
    var self = this;

    var sessionKey = SteamCrypto.generateSessionKey();

    var data = 'steamid=' + self.client.steamID +
        '&sessionkey=' + sessionKey.encrypted.toString('hex').replace(/../g, '%$&') +
        '&encrypted_loginkey=' + SteamCrypto.symmetricEncrypt(new Buffer(webLoginKey), sessionKey.plain).toString('hex').replace(/../g, '%$&');

    var options = {
        hostname: 'api.steampowered.com',
        path: '/ISteamUserAuth/AuthenticateUser/v1',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.length
        }
    };

    var req = https.request(options, function(res) {
        if (res.statusCode === 200) {
            res.on('data', function(chunk) {
                var response = JSON.parse(chunk);

                var cookies = [
                    'sessionid=' + crypto.randomBytes(12).toString('hex'),
                    'steamLogin=' + response.authenticateuser.token,
                    'steamLoginSecure=' + response.authenticateuser.tokensecure
                ];

                self.log.info('Received new web cookies.');
                self.cookies = cookies;
                self.emit('cookies', cookies);
            });
        } else {
            self.log.warn('Received status %d in "webLogOn". Retrying...', res.statusCode);

            self.steamUser.requestWebAPIAuthenticateUserNonce(function(nonce) {
                self.webLogOn(nonce.webapi_authenticate_user_nonce);
            });

            return;
        }
    });

    req.on('error', function() {
        self.log.warn('Request in "webLogOn" failed. Retrying...');

        self.webLogOn(webLoginKey);
    });

    req.end(data);
};

/**
 * Creates necessary folder structure.
 */
function createFolderStructure(dataDir) {
    var paths = [
        dataDir,
        path.join(dataDir, 'logs'),
        path.join(dataDir, 'misc'),
        path.join(dataDir, 'plugins'),
        path.join(dataDir, 'sentry')
    ];

    paths.forEach(function(path) {
        mkdirp.sync(path);
    });
}
