---
title: migration to nyxx_* 3.x
author: l7ssha
timestamp: 2021-12-17
category: migration
---

`3.0.0` includes some big changes which are breaking to most of the code from previous version.
This guide is going to be broken into parts for each library.

Biggest change for each library are new entities model which incorporates interfaces for each class provided by library.
Interfaces are now exposed instead of concrete implementations of class which allows easier extending, mocking and replacing nyxx
and its components.

### nyxx

- `INyxxFactory` and `connect` in INyxx

  Since this release only way to spawn a new instance of nyxx is via `NyxxFactory` via `createNyxxWebsocket` which creates
  new instance of `INyxxWebsocket` which is like old `Nyxx` and `createNyxxRest` which creates new instance of nyxx that won't
  connect to websocket and will operate in REST only mode.

  Another big change in that regard is addition of new method `connect` on both `INyxxRest` and `INyxxWebsocket` which delegates
  some logic from constructors of each class to make possible to implement other features.

- `Interface-based entity model`

  Concrete implementations of classes are now hidden and interfaces are exposed.
  Here, nothing should particularly change but keep in mind you are now receiving not `User` but `IUser` which represents
  user entity, but it's completely transparent on what it can do but hides how its achieved. It allows us to modify underlying
  logic more easily.

- `Plugin system`

  This version ships with first iteration of plugin system which allows creating small and lightweight addons for library.
  Functionality which was previously default is now moved to 3 plugins that are provided by default and developer needs to
  specify what plugin he wants to use. Plugins provided by default are:
   - `CliIntegration`
   - `IgnoreExceptions`
   - `Logging`

  Example usage of plugins:
  ```dart
  final bot = NyxxFactory.createNyxxWebsocket("<TOKEN>", GatewayIntents.allUnprivileged)
    ..registerPlugin(Logging())
    ..connect();
  ```
  Now there are 3 hooks that are exposed for developers:
  ```dart
  FutureOr<void> onRegister(INyxx nyxx, Logger logger) async {}
  FutureOr<void> onBotStart(INyxx nyxx, Logger logger) async {}
  FutureOr<void> onBotStop(INyxx nyxx, Logger logger) async {}
  ```
  Future version of nyxx will add more hooks and ways of extending nyxx functionality.

- Improved cache

  `SnowflakeCache` is completely rewritten and now implements `MapMixin<Snowflake, T>` which allows using cache as a normal Map.
  Old `SnowflakeCache`, `ChannelCache` and `MessageCache` were removed.

- Using nyxx in REST only mode

  Its now possible to use nyxx in REST only mode using `INyxxRest` instance. nyxx won't connect to network and will be able
  to only send requests via REST.

- Added support for text messages in voice channels. See: `ITextVoiceTextChannel`
- Auth header is now only sent when needed. `IHttpEndpoints.sendRawRequests` allows specifying if request should have auth header injected
- Implemented thread channel edit functionality. See: `IThreadChannel.edit`
- Nyxx won't call exit() anymore - that allows using nyxx in flutter without any problems 
- Official support for Dart 2.15.x
