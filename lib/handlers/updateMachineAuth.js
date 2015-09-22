var Misc = require('../misc.js');

/**
 * Default event handler for updateMachineAuth event.
 * @param {CMsgClientUpdateMachineAuth} message Message.
 * @param {function} callback Callback function.
 */
module.exports = function(message, callback) {
    this.emit('message:info', 'Received new SteamGuard sentry file.');
    this.emit('writeFile', this._sentryFile, message.bytes, function(error) {
        // Only accept the sentry file if we managed to persist it first
        if(!error) {
            callback({sha_file: Misc.getSHA(message.bytes)});
        }
    });
};
