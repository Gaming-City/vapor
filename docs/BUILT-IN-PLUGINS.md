## Modules
<dl>
<dt><a href="#module_decline-friend-requests">decline-friend-requests</a></dt>
<dd><p>Automatically declines all friend requests except for admins.</p>
<p>Use this plugin if you don&#39;t want to deal with friends list.</p>
</dd>
<dt><a href="#module_decline-group-invites">decline-group-invites</a></dt>
<dd><p>Automatically declines all group invites.</p>
<p>Use this plugin if you don&#39;t want to deal with Steam group invites.</p>
</dd>
<dt><a href="#module_decline-trade-requests">decline-trade-requests</a></dt>
<dd><p>Automatically declines all trade requests.</p>
<p>Use this plugin if you don&#39;t want to deal with regular trading system.</p>
<p><strong>Remark:</strong> This plugin does not decline trade offers.</p>
</dd>
<dt><a href="#module_essentials">essentials</a></dt>
<dd><p>Automatically logs all major Steam events.</p>
</dd>
<dt><a href="#module_offline-messages">offline-messages</a></dt>
<dd><p>Automatically removes and logs all pending chat messages.</p>
<p>Use this plugin if you want to get rid of pending notifications
related to offline messages.</p>
</dd>
</dl>
<a name="module_decline-friend-requests"></a>
## decline-friend-requests
Automatically declines all friend requests except for admins.

Use this plugin if you don't want to deal with friends list.


| Param | Type | Description |
| --- | --- | --- |
| VaporAPI | <code>Object</code> | Instance of the API class. |

**Example**  
```js
bot.use(vapor.plugins.declineFriendRequests);
```
<a name="module_decline-group-invites"></a>
## decline-group-invites
Automatically declines all group invites.

Use this plugin if you don't want to deal with Steam group invites.


| Param | Type | Description |
| --- | --- | --- |
| VaporAPI | <code>Object</code> | Instance of the API class. |

**Example**  
```js
bot.use(vapor.plugins.declineGroupInvites);
```
<a name="module_decline-trade-requests"></a>
## decline-trade-requests
Automatically declines all trade requests.

Use this plugin if you don't want to deal with regular trading system.

**Remark:** This plugin does not decline trade offers.


| Param | Type | Description |
| --- | --- | --- |
| VaporAPI | <code>Object</code> | Instance of the API class. |

**Example**  
```js
bot.use(vapor.plugins.declineTradeRequests);
```
<a name="module_essentials"></a>
## essentials
Automatically logs all major Steam events.


| Param | Type | Description |
| --- | --- | --- |
| VaporAPI | <code>Object</code> | Instance of the API class. |

**Example**  
```js
bot.use(vapor.plugins.essentials);
```
<a name="module_offline-messages"></a>
## offline-messages
Automatically removes and logs all pending chat messages.

Use this plugin if you want to get rid of pending notifications
related to offline messages.


| Param | Type | Description |
| --- | --- | --- |
| VaporAPI | <code>Object</code> | Instance of the API class. |

**Example**  
```js
bot.use(vapor.plugins.offlineMessages);
```
