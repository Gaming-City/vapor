<a name="Vapor"></a>
## Vapor
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| servers | <code>Array.&lt;Object&gt;</code> | List of Steam servers. You can set this property to use your own up-to-date list of servers. **Remark:** This property can be only set before calling [init](#Vapor+init) method. |


* [Vapor](#Vapor)
  * [new Vapor()](#new_Vapor_new)
  * [.init(config)](#Vapor+init)
  * [.use(plugin, data)](#Vapor+use)
  * [.connect()](#Vapor+connect)
  * [.disconnect()](#Vapor+disconnect)

<a name="new_Vapor_new"></a>
### new Vapor()
Main Vapor class.

Instance of this class is never created manually.

**Example**  
```js
var vapor = require('vapor');
var bot = vapor();
```
<a name="Vapor+init"></a>
### vapor.init(config)
Initializes Vapor instance.

This method is chainable.

Config properties:
* `username` - username used for logging in
* `password` - password used for logging in
* `loginKey` - can be used in place of password
* `rememberPassword` - if `true`, `loginKey` event will be emitted
* `displayName` - this is the name everyone else sees
* `state` - initial online state
* `admins` - array of SteamID64 strings

Only `username` and `password` are required. See 'helper.js' for defaults.

**Kind**: instance method of <code>[Vapor](#Vapor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | Configuration object. |

**Example**  
```js
var config = {
  username: 'myUsername',
  password: 'myPassword',
  displayName: 'Vapor Bot',
  state: 'Online',
  admins: [ '7656123456', '7656987654' ]
};
bot.init(config);
```
<a name="Vapor+use"></a>
### vapor.use(plugin, data)
Use Vapor plugin.

You can either specify a built-in plugin or use a custom plugin.

This method is chainable.

**Kind**: instance method of <code>[Vapor](#Vapor)</code>  

| Param | Type | Description |
| --- | --- | --- |
| plugin | <code>Object</code> | Plugin object. |
| data | <code>\*</code> | Extra data passed to VaporAPI. Use `object` for multiple values. |

<a name="Vapor+connect"></a>
### vapor.connect()
Connects Vapor to Steam network.

**Kind**: instance method of <code>[Vapor](#Vapor)</code>  
<a name="Vapor+disconnect"></a>
### vapor.disconnect()
Disconnects Vapor from Steam network.

**Kind**: instance method of <code>[Vapor](#Vapor)</code>  
