/**
 * Default event handler for logOnResponse event.
 */
module.exports = function(response) {
    var vapor = this;

    var log = vapor.log;
    var config = vapor._config;

    var client = vapor._client;
    var steamFriends = vapor._steamFriends;
    var Steam = vapor._Steam;
    var utils = this._utils;

    switch(response.eresult) {
        case Steam.EResult.OK:
            // Resolve name and persona state
            var onlineState = utils.stringToEnum(config.state, Steam.EPersonaState);

            if(onlineState === null) {
                log.warn('State value "%s" in your config is set incorrectly.', config.state);
                log.warn('Defaulting to: Online');

                onlineState = Steam.EPersonaState.Online;
            }

            var displayName = config.displayName;

            log.info('%s logged in successfully.', displayName);

            // Set name and persona state
            steamFriends.setPersonaState(onlineState);
            steamFriends.setPersonaName(displayName);

            // Emit ready event
            vapor.emit('ready');

            // Call web login
            vapor._webLogOn(response.webapi_authenticate_user_nonce);

            break;

        case Steam.EResult.AccountLogonDenied:
        case Steam.EResult.AccountLoginDeniedNeedTwoFactor:
        case Steam.EResult.TwoFactorCodeMismatch:
            // Call disconnect manually so we don't receive 'error' event
            client.disconnect();

            vapor.emit('steamGuard', function(code) {
                if(response.eresult === Steam.EResult.AccountLogonDenied) {
                    vapor._loginOptions.auth_code = code;
                } else {
                    vapor._loginOptions.two_factor_code = code;
                }

                // Let's reconnect
                client.connect();
            });

            break;

        default:
            client.disconnect();

            log.error('Steam login error: %s.', utils.enumToString(response.eresult, Steam.EResult));

            var error = new Error('Login error.');
            error.eresult = response.eresult;
            vapor.emit('disconnected', error);
    }
};
