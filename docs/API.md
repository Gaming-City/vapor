## Classes
<dl>
<dt><a href="#API">API</a></dt>
<dd></dd>
<dt><a href="#Utils">Utils</a></dt>
<dd></dd>
</dl>
<a name="API"></a>
## API
**Kind**: global class  

* [API](#API)
  * [new API(Vapor, pluginName)](#new_API_new)
  * [.shutdown()](#API+shutdown)
  * [.getClient()](#API+getClient) ⇒ <code>Object</code>
  * [.getHandler(handler)](#API+getHandler) ⇒ <code>Object</code>
  * [.getUtils()](#API+getUtils) ⇒ <code>Object</code>
  * [.getSteam()](#API+getSteam) ⇒ <code>Object</code>
  * [.getConfig(complete)](#API+getConfig) ⇒ <code>Object</code>
  * [.saveConfig(configObject)](#API+saveConfig)
  * [.emitEvent(event, data)](#API+emitEvent)
  * [.registerHandler(options, callback)](#API+registerHandler)
  * [.removeAllHandlers(options)](#API+removeAllHandlers)
  * [.getDataFolderPath()](#API+getDataFolderPath) ⇒ <code>string</code>
  * [.getLogger()](#API+getLogger) ⇒ <code>Object</code>

<a name="new_API_new"></a>
### new API(Vapor, pluginName)
API class constructor.
Instance of this class is passed to plugins exported function.


| Param | Type | Description |
| --- | --- | --- |
| Vapor | <code>Object</code> | Vapor instance. |
| pluginName | <code>string</code> | Specific plugin name which uses this API instance. |

<a name="API+shutdown"></a>
### apI.shutdown()
Disconnects from Steam network and completely shuts down Vapor process.

**Kind**: instance method of <code>[API](#API)</code>  
<a name="API+getClient"></a>
### apI.getClient() ⇒ <code>Object</code>
Returns active Steam client used by Vapor.

**Kind**: instance method of <code>[API](#API)</code>  
**Returns**: <code>Object</code> - Active Steam client.  
<a name="API+getHandler"></a>
### apI.getHandler(handler) ⇒ <code>Object</code>
Returns active Steam handler used by Vapor.

**Kind**: instance method of <code>[API](#API)</code>  
**Returns**: <code>Object</code> - Active Steam handler.  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>string</code> | Can be either 'steamUser', 'steamFriends', 'steamTrading', 'steamGameCoordinator' or 'steamGroups'. |

<a name="API+getUtils"></a>
### apI.getUtils() ⇒ <code>Object</code>
Returns Utils class.

**Kind**: instance method of <code>[API](#API)</code>  
**Returns**: <code>Object</code> - Instantiated Utils class.  
<a name="API+getSteam"></a>
### apI.getSteam() ⇒ <code>Object</code>
Returns Steam object.
This is useful for all the ESomething enums.

**Kind**: instance method of <code>[API](#API)</code>  
**Returns**: <code>Object</code> - Steam.  
<a name="API+getConfig"></a>
### apI.getConfig(complete) ⇒ <code>Object</code>
Returns Vapor config object.

**Kind**: instance method of <code>[API](#API)</code>  
**Returns**: <code>Object</code> - Config object.  

| Param | Type | Description |
| --- | --- | --- |
| complete | <code>Boolean</code> | If true, function will return complete Vapor config. Otherwise function will return only plugin-specific config. Defaults to false. |

<a name="API+saveConfig"></a>
### apI.saveConfig(configObject)
Saves config object back to file.

**Kind**: instance method of <code>[API](#API)</code>  

| Param | Type | Description |
| --- | --- | --- |
| configObject | <code>Object</code> | Configuration object to be saved. |

<a name="API+emitEvent"></a>
### apI.emitEvent(event, data)
Allows plugin to emit custom events via Vapors event emitter.

**Kind**: instance method of <code>[API](#API)</code>  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | Event name. |
| data | <code>\*</code> | Data. |

<a name="API+registerHandler"></a>
### apI.registerHandler(options, callback)
Allows plugin to register custom handler for any event.

**Kind**: instance method of <code>[API](#API)</code>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options object. |
| options.emitter | <code>string</code> | Can be either 'vapor', 'client', 'steamUser', 'steamFriends', 'steamTrading', 'steamGameCoordinator' or 'plugin'. |
| options.plugin | <code>string</code> | If emitter is plugin, this is plugin's name. |
| options.event | <code>string</code> | Event name. |
| callback | <code>function</code> | Callback function. |

**Example**  
```js
API.registerHandler({
        emitter: 'steam',
        event: 'friendMsg'
    },
    function(user, message, type) {
        if(type === Steam.EChatEntryType.ChatMsg) {
            log.info(user + " says: " + message);
        }
    }
);
```
<a name="API+removeAllHandlers"></a>
### apI.removeAllHandlers(options)
Allows plugin to remove all handlers for a specific event.

**Kind**: instance method of <code>[API](#API)</code>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options object. |
| options.emitter | <code>string</code> | Can be either 'vapor', 'client', 'steamUser', 'steamFriends', 'steamTrading', 'steamGameCoordinator' or 'plugin'. |
| options.plugin | <code>string</code> | If emitter is 'plugin', this is plugin's name. |
| options.event | <code>string</code> | Event name. |

<a name="API+getDataFolderPath"></a>
### apI.getDataFolderPath() ⇒ <code>string</code>
Returns plugin's data folder path.

**Kind**: instance method of <code>[API](#API)</code>  
**Returns**: <code>string</code> - Full path to plugin's data folder.  
<a name="API+getLogger"></a>
### apI.getLogger() ⇒ <code>Object</code>
Returns logger prefixed with plugin's name.

**Kind**: instance method of <code>[API](#API)</code>  
**Returns**: <code>Object</code> - Logger.  
<a name="Utils"></a>
## Utils
**Kind**: global class  

* [Utils](#Utils)
  * [new Utils(Vapor)](#new_Utils_new)
  * [.isAdmin(steamID)](#Utils+isAdmin) ⇒ <code>Boolean</code>
  * [.getShortPluginName(pluginName)](#Utils+getShortPluginName) ⇒ <code>string</code>
  * [.stringToEnum(string, enumList)](#Utils+stringToEnum) ⇒ <code>number</code>
  * [.enumToString(value, enumList)](#Utils+enumToString) ⇒ <code>string</code>
  * [.accountIDToSteamID(accountID)](#Utils+accountIDToSteamID) ⇒ <code>string</code>
  * [.steamIDToAccountID(steamID)](#Utils+steamIDToAccountID) ⇒ <code>number</code>
  * [.getTimestamp(unixTimestamp, format)](#Utils+getTimestamp) ⇒ <code>string</code>

<a name="new_Utils_new"></a>
### new Utils(Vapor)
Utils class constructor.
Instance of this class is available via [getUtils](#API+getUtils).


| Param | Type | Description |
| --- | --- | --- |
| Vapor | <code>Object</code> | Vapor instance. |

<a name="Utils+isAdmin"></a>
### utils.isAdmin(steamID) ⇒ <code>Boolean</code>
Returns whether a user is admin or not.

**Kind**: instance method of <code>[Utils](#Utils)</code>  
**Returns**: <code>Boolean</code> - Result.  

| Param | Type | Description |
| --- | --- | --- |
| steamID | <code>string</code> | User's Steam ID. |

<a name="Utils+getShortPluginName"></a>
### utils.getShortPluginName(pluginName) ⇒ <code>string</code>
Removes 'vapor-' prefix from plugin name.

**Kind**: instance method of <code>[Utils](#Utils)</code>  
**Returns**: <code>string</code> - Shortened plugin name.  

| Param | Type | Description |
| --- | --- | --- |
| pluginName | <code>string</code> | Plugin name. |

<a name="Utils+stringToEnum"></a>
### utils.stringToEnum(string, enumList) ⇒ <code>number</code>
Returns first enum value that matches the given string.

**Kind**: instance method of <code>[Utils](#Utils)</code>  
**Returns**: <code>number</code> - Enum value or null if not found.  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | Enum name. |
| enumList | <code>Object</code> | List of enums from the Steam object. |

**Example**  
```js
// returns 5, which is equal to Steam.EPersonaState.LookingToTrade
var tradeState = utils.stringToEnum("trade", Steam.EPersonaState);
client.setPersonaState(tradeState);
```
<a name="Utils+enumToString"></a>
### utils.enumToString(value, enumList) ⇒ <code>string</code>
Returns string description for the given enum value.

**Kind**: instance method of <code>[Utils](#Utils)</code>  
**Returns**: <code>string</code> - Enum string description or null if not found.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Enum value. |
| enumList | <code>Object</code> | List of enums from the Steam object. |

**Example**  
```js
// returns "LookingToTrade"
var stateDescription = utils.stringToEnum(5, Steam.EPersonaState);
```
<a name="Utils+accountIDToSteamID"></a>
### utils.accountIDToSteamID(accountID) ⇒ <code>string</code>
Converts account ID to 64 bit SteamID string.

**Kind**: instance method of <code>[Utils](#Utils)</code>  
**Returns**: <code>string</code> - Converted 64 bit SteamID.  

| Param | Type | Description |
| --- | --- | --- |
| accountID | <code>number</code> | User's account ID. |

<a name="Utils+steamIDToAccountID"></a>
### utils.steamIDToAccountID(steamID) ⇒ <code>number</code>
Converts 64 bit SteamID string to account ID.

**Kind**: instance method of <code>[Utils](#Utils)</code>  
**Returns**: <code>number</code> - Account ID.  

| Param | Type | Description |
| --- | --- | --- |
| steamID | <code>string</code> | 64 bit SteamID. |

<a name="Utils+getTimestamp"></a>
### utils.getTimestamp(unixTimestamp, format) ⇒ <code>string</code>
Converts unix timestamp into formatted timestamp.

The timestamp format is taken from Vapor's logs configuration.

**Kind**: instance method of <code>[Utils](#Utils)</code>  
**Returns**: <code>string</code> - Formatted timestamp.  

| Param | Type | Description |
| --- | --- | --- |
| unixTimestamp | <code>number</code> | Unix timestamp. |
| format | <code>string</code> | Timestamp format. |

