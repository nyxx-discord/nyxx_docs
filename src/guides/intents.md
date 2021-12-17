---
title: intents
author: l7ssha
timestamp: 2021-09-21
category: guides
---

Gateway intents were introduced so bot developers could choose what event they want to receive. If you don't want
to receive certain event you could just omit its intent and they won't be sent to your bot.

> More on intents: [https://discord.com/developers/docs/topics/gateway#gateway-intents](https://discord.com/developers/docs/topics/gateway#gateway-intents)

### Specifying intents

Since `nyxx 2.x` passing intents is required in Nyxx constructor. You can pass precalculated int value or you can pass
or'ed constant values from `GatewayIntents` class.

```dart
final bot = Nyxx("TOKEN", GatewayIntents.guildMessages | GatewayIntents.directMessages);
```

With intents from example above we would receive only message create events from guild and direct messages.

### More on bit fields

Discord Intents and Permissions are stored in integer and calculated using bitwise operations. 
If you want to dive deeper into what's happening behind the curtains, check the [Wikipedia](https://en.wikipedia.org/wiki/Bit_field).
