---
title: migration to nyxx_* 3.x
author: l7ssha
timestamp: 2021-12-17
category: guides
---

`3.0.0` includes some big changes which are breaking to most of the code from previous version.
This guide is going to be broken into parts for each library.

> Biggest change for each library are new entities model which incorporates interfaces for each class provided by library.

The biggest change for all libraries is new entities model - concrete implementation and internal logic is hidden behind interfaces 
and only said interfaces are accessible by end user of library. This allows easier extending, mocking and replacing nyxx
and its components.

## nyxx

#### `INyxxFactory` and `connect` in INyxx

  Since this release the only way to spawn a new instance of nyxx is via `NyxxFactory`'s method `createNyxxWebsocket` which creates
  new instance of `INyxxWebsocket` which is comparable to old `Nyxx`. The `createNyxxRest` method creates a new instance of nyxx that won't
  connect to websocket and will operate in REST only mode.

  Another big change in that regard is addition of new method `connect` on both `INyxxRest` and `INyxxWebsocket` which delegates
  some logic from constructors of each class to make possible to implement other features.

#### `Interface-based entity model`

  Concrete implementations of classes are now hidden and interfaces are exposed.
  Here, nothing should particularly change but keep in mind that you are now receiving not `User` but `IUser` which represents
  the user entity, but it's completely transparent on what it can do but hides internal implementation. It allows us to modify underlying
  logic more easily.

#### `Plugin system`

  This version ships with first iteration of plugin system which allows creating small and lightweight addons for library.
  Functionality which was previously default is now moved to 3 plugins that are provided by default and developer needs to
  specify what plugin they want to use. Plugins provided by default are:
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

#### Improved cache

  `SnowflakeCache` is completely rewritten and now implements `MapMixin<Snowflake, T>` which allows using cache as a normal Map.
  Old `SnowflakeCache`, `ChannelCache` and `MessageCache` were removed.

#### Using nyxx in REST only mode

It's now possible to use nyxx in REST only mode using `INyxxRest` instance - nyxx won't connect to gateway and only
REST API calls will be accessible.

#### Other changes

- Added support for text messages in voice channels. See: `ITextVoiceTextChannel`
- Auth header is now only sent when needed. `IHttpEndpoints.sendRawRequests` allows specifying if request should have auth header injected
- Implemented thread channel edit functionality. See: `IThreadChannel.edit`
- Nyxx won't call exit() anymore - that allows using nyxx in flutter without any problems 
- Official support for Dart 2.15.x

## nyxx_interactions

#### IInteractions

Similarly to main nyxx library to nyxx_interactions you have to use `IInteractions.create` method because constructor is hidden from public API.
`create` function also accepts instance of `InteractionBackend` instead of `INyxx` instance due to upcoming HTTP interactions support.
This allows us to create additional backends for interactions or to alter existing ones for wider compatibility and extensibility.

#### `Interface-based entity model`

Concrete implementations of classes are now hidden and interfaces are exposed.
Here, nothing should particularly change but keep in mind that you are now receiving not `User` but `IUser` which represents
the user entity, but it's completely transparent on what it can do but hides internal implementation. It allows us to modify underlying
logic more easily.

```dart
/// Where bot is instance of INyxx
IInteractions.create(WebsocketInteractionBackend(bot));
```

Currently, only websocket backend is available (`WebsocketInteractionBackend`). In the future backend for HTTP interactions will be added.

#### Improved autocomplete handling

Autocomplete handlers can be now registered on instance of `CommandOptionBuilder` instead globally on IInteractions. This allows registering
autocomplete handler per command option instead of globally per given option name. In the future we are planning to provide shortcuts for
creating autocomplete command options to simplify code.

#### Other changes
- Fixed various bugs with registering commands and their permissions.
- Add ability to remove guild commands from given guild completely. Previously this behavior was not possible.

## nyxx_commander

#### ICommander

Similarly to main nyxx library to nyxx_commander you have to use `ICommander.create` method because 
constructor is hidden from public API.

#### `Interface-based entity model`

Concrete implementations of classes are now hidden and interfaces are exposed.
Here, nothing should particularly change but keep in mind that you are now receiving not `User` but `IUser` which represents
the user entity, but it's completely transparent on what it can do but hides internal implementation. It allows us to modify underlying
logic more easily.

#### Other changes
- Fixed bugs with invalid behavior of registering commands

## nyxx_extensions
- Use minified version of emojis endpoint
- `filterEmojiDefinitions` from `emoji` library now returns `Stream<EmojiDefinition>`
- Export library for each file (part of `Interface-based entity model` for whole library stack)

## nyxx_lavalink

#### `Interface-based entity model`

Concrete implementations of classes are now hidden and interfaces are exposed.
Here, nothing should particularly change but keep in mind that you are now receiving not `User` but `IUser` which represents
the user entity, but it's completely transparent on what it can do but hides internal implementation. It allows us to modify underlying
logic more easily.

External and internal API hadn't changed since previous version.
