---
title: Intents
author: L7ssha
timestamp: 2021-09-21
category: guides
sidebar_position: 4
---

Gateway intents were introduced so bot developers could choose which events they want to receive. If you don't want
to receive certain events you can just omit its intent and they won't be sent to your bot.

> More on intents: [https://discord.com/developers/docs/topics/gateway#gateway-intents](https://discord.com/developers/docs/topics/gateway#gateway-intents)

<br />

### Specifying intents

Since `nyxx` 2.x passing intents is required in nyxx constructor. You can pass the int value or you can pass
constant values from `GatewayIntents` class combined with a binary OR (`|`):

<br />

For example, the following code would only recieve guild message or private message events,

```dart
final bot = NyxxFactory.createNyxxWebsocket("TOKEN", GatewayIntents.guildMessages | GatewayIntents.directMessages);
```

<br />

### More on bit fields

Discord Intents and Permissions are stored in integers and calculated using bitwise operations.
If you want to dive deeper into what's happening behind the curtains, check the [Wikipedia page](https://en.wikipedia.org/wiki/Bit_field).
