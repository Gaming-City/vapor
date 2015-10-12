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
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pluginName | <code>string</code> | Name of the plugin which uses this specific API instance. |
| data | <code>Object</code> | Data object that is passed to API instance via `Vapor.use` method. |


* [API](#API)
  * [new API(Vapor, pluginName, data)](#new_API_new)
  * [.connect()](#API+connect)
  * [.disconnect()](#API+disconnect)
  * [.getClient()](#API+getClient) ⇒ <code>SteamClient</code>
  * [.getHandler(handler)](#API+getHandler) ⇒ <code>Object</code>
  * [.getUtils()](#API+getUtils) ⇒ <code>[Utils](#Utils)</code>
  * [.getSteam()](#API+getSteam) ⇒ <code>Steam</code>
  * [.getConfig()](#API+getConfig) ⇒ <code>Object</code>
  * [.getPlugins()](#API+getPlugins) ⇒ <code>Array.&lt;string&gt;</code>
  * [.emitEvent(event, ...args)](#API+emitEvent)
  * [.registerHandler(options, callback)](#API+registerHandler)
  * [.hasHandler(options)](#API+hasHandler)
  * [.removeAllHandlers(options)](#API+removeAllHandlers)
  * [.getLogger()](#API+getLogger) ⇒ <code>Object</code>
  * [.webLogOn()](#API+webLogOn)

<a name="new_API_new"></a>
### new API(Vapor, pluginName, data)
API class constructor.

Instance of this class is passed to plugins exported function as the only argument.


| Param | Type | Description |
| --- | --- | --- |
| Vapor | <code>Vapor</code> | Vapor instance. |
| pluginName | <code>string</code> | Specific plugin name which uses this API instance. |
| data | <code>Object</code> | Data object that is passed to API instance. |

<a name="API+connect"></a>
### apI.connect()
Connect to Steam network.

**Kind**: instance method of <code>[API](#API)</code>  
<a name="API+disconnect"></a>
### apI.disconnect()
Disconnect from Steam network.

**Kind**: instance method of <code>[API](#API)</code>  
<a name="API+getClient"></a>
### apI.getClient() ⇒ <code>SteamClient</code>
Returns active Steam client used by Vapor.

**Kind**: instance method of <code>[API](#API)</code>  
**Returns**: <code>SteamClient</code> - Active Steam client.  
<a name="API+getHandler"></a>
### apI.getHandler(handler) ⇒ <code>Object</code>
Returns active Steam handler used by Vapor.

**Kind**: instance method of <code>[API](#API)</code>  
**Returns**: <code>Object</code> - Active Steam handler.  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>string</code> | Can be either `steamUser`, `steamFriends`, `steamTrading` or `steamGroups`. |

<a name="API+getUtils"></a>
### apI.getUtils() ⇒ <code>[Utils](#Utils)</code>
Returns instance of Utils class.

**Kind**: instance method of <code>[API](#API)</code>  
**Returns**: <code>[Utils](#Utils)</code> - Instantiated Utils class.  
<a name="API+getSteam"></a>
### apI.getSteam() ⇒ <code>Steam</code>
Returns Steam object.

This is especially useful for all the ESomething enums.

**Kind**: instance method of <code>[API](#API)</code>  
**Returns**: <code>Steam</code> - Steam.  
<a name="API+getConfig"></a>
### apI.getConfig() ⇒ <code>Object</code>
Returns Vapor config object.

**Kind**: instance method of <code>[API](#API)</code>  
**Returns**: <code>Object</code> - Config object.  
<a name="API+getPlugins"></a>
### apI.getPlugins() ⇒ <code>Array.&lt;string&gt;</code>
Returns array of names of loaded plugins.

**Kind**: instance method of <code>[API](#API)</code>  
**Returns**: <code>Array.&lt;string&gt;</code> - Array of plugin names.  
<a name="API+emitEvent"></a>
### apI.emitEvent(event, ...args)
Allows plugin to emit custom events via Vapor's event emitter.

This function allows to pass multiple data arguments.

Also see [registerHandler](#API+registerHandler).

**Kind**: instance method of <code>[API](#API)</code>  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | Event name. |
| ...args | <code>\*</code> | Data arguments. |

**Example**  
```js
API.emitEvent('myCustomPluginEvent', someString, someObject);
```
<a name="API+registerHandler"></a>
### apI.registerHandler(options, callback)
Allows plugin to register custom handler for any event.

Also see [emitEvent](#API+emitEvent).

**Kind**: instance method of <code>[API](#API)</code>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options object. |
| options.emitter | <code>string</code> | Can be either `vapor`, `client`, `steamUser`, `steamFriends`, `steamTrading`, `plugin` or `*` (which stands for 'any'). |
| options.plugin | <code>string</code> | If emitter is `plugin`, this is plugin's name. Use `*` for any. |
| options.event | <code>string</code> | Event name. |
| callback | <code>function</code> | Callback function. |

**Example**  
```js
// Listen to 'friendMsg' event emitted by 'steamFriends'
API.registerHandler({
        emitter: 'steamFriends',
        event: 'friendMsg'
    },
    function(user, message, type) {
        if(type === Steam.EChatEntryType.ChatMsg) {
            console.log(user + " says: " + message);
        }
    }
);

// Listen to another plugin's custom event
API.registerHandler({
        emitter: 'plugin',
        plugin: 'another-plugin-name'
        event: 'myCustomPluginEvent'
    },
    function(someString, someObject) {
        console.log(someString, someObject);
    }
);

// Listen to any 'debug' event
API.registerHandler({
        emitter: '*',
        event: 'debug'
    },
    function() {
        console.log(arguments);
    }
);
```
<a name="API+hasHandler"></a>
### apI.hasHandler(options)
Returns true if there is at least one handler for the given event, false otherwise.

**Kind**: instance method of <code>[API](#API)</code>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> &#124; <code>string</code> | Options object or event name. |
| options.emitter | <code>string</code> | Can be either `vapor`, `client`, `steamUser`, `steamFriends`, `steamTrading`, `plugin` or `*` (which stands for 'any'). |
| options.plugin | <code>string</code> | If emitter is `plugin`, this is plugin's name. Use `*` for any. |
| options.event | <code>string</code> | Event name. |

**Example**  
```js
if(API.hasHandler({emitter: 'steamFriends', event: 'friendMsg'})) {
    // do something ...
}

if(API.hasHandler('readFile')) {
    // we can safely emit this event to read a file
}
```
<a name="API+removeAllHandlers"></a>
### apI.removeAllHandlers(options)
Allows plugin to remove all handlers for a specific event.

**Kind**: instance method of <code>[API](#API)</code>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options object. |
| options.emitter | <code>string</code> | Can be either `vapor`, `client`, `steamUser`, `steamFriends`, `steamTrading`, `plugin` or `*` (which stands for 'any'). |
| options.plugin | <code>string</code> | If emitter is `plugin`, this is plugin's name. Use `*` for any. |
| options.event | <code>string</code> | Event name. |

<a name="API+getLogger"></a>
### apI.getLogger() ⇒ <code>Object</code>
Returns wrapper for emitting 'message:*' events prefixed with plugin's name.

Available levels:
* log.debug
* log.info
* log.warn
* log.error

**Kind**: instance method of <code>[API](#API)</code>  
**Returns**: <code>Object</code> - Logger.  
**Example**  
```js
var log = VaporAPI.getLogger();

log.info('This is a regular info message...');
log.warn('...and this is a warning message.');
log.debug('String %s works too!', 'formatting');
```
<a name="API+webLogOn"></a>
### apI.webLogOn()
Calls Vapor's internal webLogOn method.

Listen to `cookies` event to receive new array of cookies and sessionid.

You should call this function ONLY if you believe cookies have expired, e.g.
you logged into your account from another IP / browser and you are getting
HTTP 403 etc.

You do NOT have to call this method on startup as it's automatically called
by Vapor after successfully logging in.

**Kind**: instance method of <code>[API](#API)</code>  
<a name="Utils"></a>
## Utils
**Kind**: global class  

* [Utils](#Utils)
  * [new Utils(Vapor)](#new_Utils_new)
  * [.isAdmin(steamID)](#Utils+isAdmin) ⇒ <code>Boolean</code>
  * [.getUserDescription(steamID, format)](#Utils+getUserDescription) ⇒ <code>string</code>
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

<a name="Utils+getUserDescription"></a>
### utils.getUserDescription(steamID, format) ⇒ <code>string</code>
Returns easy-to-read user description.

Format allows placeholders:
* `%username` - for Steam username
* `%steamid64` - for 64 bit SteamID
* `%accountid` - for account ID

**Kind**: instance method of <code>[Utils](#Utils)</code>  
**Returns**: <code>string</code> - User's description.  

| Param | Type | Description |
| --- | --- | --- |
| steamID | <code>string</code> | User's Steam ID. |
| format | <code>string</code> | Format string. |

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
steamFriends.setPersonaState(tradeState);
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

**Kind**: instance method of <code>[Utils](#Utils)</code>  
**Returns**: <code>string</code> - Formatted timestamp.  

| Param | Type | Description |
| --- | --- | --- |
| unixTimestamp | <code>number</code> | Unix timestamp. |
| format | <code>string</code> | Timestamp format. |

