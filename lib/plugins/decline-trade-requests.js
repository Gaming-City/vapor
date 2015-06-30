/**
 * Automatically declines all trade requests.
 * @module decline-group-invites
 */
module.exports = function(VaporAPI) {

    var log = VaporAPI.getLogger();
    var client = VaporAPI.getClient();

    // Handle 'tradeProposed' event
    VaporAPI.registerHandler({
        emitter: 'steam',
        event: 'tradeProposed',
        callback: function(tradeID, steamID) {
            client.respondToTrade(tradeID, false);

            client.sendMessage(steamID, "Sorry, but I cannot accept regular trade requests.");

            if(client.users[steamID] !== undefined)
                log.info("I have declined a trade request from: " + client.users[steamID].playerName + " (" + steamID + ").");
            else
                log.info("I have declined a trade request from: " + steamID + ".");
        }
    });

};
