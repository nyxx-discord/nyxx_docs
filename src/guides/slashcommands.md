---
title: Slash commands
author: l7ssha
timestamp: 2021-09-21
category: Guides
---

Slash commands are a new way of interacting with bots via chat using commands registered on the Discord API.
Such commands provide visual feedback in the UI and are more tied to the platform than classic text based commands.

</br>

### Interactions extension

Before registering any commands you have to instantiate new instance of the `Interactions` class, which is an extension for
Nyxx that provides slash command and message components functionality. 

```dart
final bot = Nyxx("<TOKEN>", GatewayIntents.allUnprivileged);
final interactions = Interactions(bot);
```

</br>

The `Interactions` class contains all the methods and utils needed to register and handle slash commands.

</br>

### Registering commands

Nyxx provides an easy to use interface for registering commands to the Discord API and internal handlers to provide functionality to a command. Commands can be registered on the API and added internally so that the bot can respond to them via websocket.

</brs>

To register an command use the `registerSlashCommand` method which takes instance of the `SlashCommandBuilder` class.
`SlashCommandBuilder` provides all the information needed for the framework and API about how to handle a given slash command.

</br>

`SlashCommandBuilder` allows you to build commands with the following properties:
```dart
/// Command name to be shown to the user in the Slash Command UI
final String name;

/// Command description shown to the user in the Slash Command UI
final String? description;

/// If people can use the command by default or if they need permissions to use it.
final bool defaultPermissions;

/// The guild that the slash Command is registered in. This can be null if its a global command.
Snowflake? guild;

/// The arguments that the command takes
List<CommandOptionBuilder> options;

/// Permission overrides for the command
List<ICommandPermissionBuilder>? permissions;

/// Target of slash command if different that SlashCommandTarget.chat - slash command will
/// become context menu in appropriate context
SlashCommandType type;
```

</br>

This example registers a `ping` command that responds with `"pong"`:
```dart
// Creates instance of slash command builder with name, description and sub options.
// Its used to synchronise commands with discord and also to be able to respond to them.
// SlashCommandBuilder allows to register handler for slash command that you will be able
// to respond to command event.
final singleCommand = SlashCommandBuilder("ping", "Simple command that responds with `pong`", [])
  ..registerHandler((event) async {
    // Handler accepts a function with parameter of SlashCommandInteraction which contains
    // all of the stuff needed to respond to interaction.
    // From there you have two routes: ack and then respond later or respond immediately without ack.
    // Sending ack will display indicator that bot is thinking and from there you will have 15 mins to respond to
    // that interaction.
    await event.respond(MessageBuilder.content("Pong!"));
  });
```

</br>

We specified the name of the command as `ping` and provided a short description so that the user would now what the command does. We also invoked the `registerHandler` method that registers an internal callback so that the command could be responded to by the bot. In that case we only respond with a `MessageBuilder` with a content of `Pong!`.

</br>

#### Subcommands

Subcommands are handled by adding instances of `CommandOptionBuilder` to `SlashCommandBuilder` via the `options` parameter
in the constructor. In the Discord API, subcommands are just options in a base command and are handled in the same way.

`CommandOptionBuilder` has a `registerHandler` method which allows you to register callback that will be invoked when client receives an interaction, just like the base slash command.

> Note that `registerHandler` cannot be executed on `CommandOptionBuilder` that has a type other than `CommandOptionType.subcommand`.

</br>

For example, if we want to have a command named `game` and few different games as subcommands:
```dart
// If you want your command to have subcommand you don't need to register handler
// for main handler because only sub commands will be invokable.
// In list for options you can create new instances of sub commands with
// commands handlers that command could be responded by bot.
final subCommand = SlashCommandBuilder("game", "This is example game command", [
  subCommandFlipGame
]);

// Subcommand event handler receives same SlashCommandInteraction parameter with all
// info and tools need to respond to an interaction
final subCommandFlipGame = CommandOptionBuilder(CommandOptionType.subCommand, "coinflip", "Coin flip game")
  ..registerHandler((event) async {
    final result = Random().nextBool() ? "tail" : "heads";

    await event.respond(MessageBuilder.content("You flipped: $result"));
  });
```

</br>

### Syncing commands

Registered commands need to be synced with Discord's API. After calling `Interactions#syncOnReady`, the `nyxx_interactions` framework will perform a  bulk override of registered command which means that new commands will be added, existing commands will be updated, and commands that are missing will be erased from the API. Global commands have ~1h long caching span, so they will be available after approx. 1 hour and guild commands are available instantly.

</br>

#### Sync types inside nyxx

Nyxx provides an interface to customise syncing logic. Classes implementing `ICommandsSync` can be passed to `Interactions#syncOnReady` to customise how syncing behaves. `nyxx_interactions` provides two options by default:
 - `ManualCommandSync`: A `true`/`false` switch indicating whether commands should be synced;
 - `LockFileCommandSync`: Creates a lock file storing registered commands and only sync if significant changes have been made.

The default is `ManualCommandSync` and by default commands sync on each bot startup, so if you already registered your commands and you won't make any further changes to their properties you can pass `ManualCommandSync` instance with `false` and commands won't be synced with Discord to avoid API abuse.

</br>

### Responding to commands

The initial response to a slash command interaction can either be a response or an acknowledgement. The initial response must be sent within 3 seconds or the commands will be marked as failed in the user's UI, but after acknowledging you can respond for up to 15 minutes.


So, to properly handle the interaction from a code perspective you have to respond or acknowledge in 3 seconds and then respond in 15 mins:

```dart
..registerHandler((event) async {
  await event.acknowledge(); // After that you have 15 mins to call event.respond

  await event.respond(MessageBuilder.content("Respond"));
});
```

</br>

#### Ephemeral responses

Messages can sent as ephemeral responses which means that the message will only be visible for the user that invoked the command in public chat, like `Clyde` in the Discord client. 

`acknowledge` and `respond` have an optional parameter `hidden` which allows to specify if the response should be ephermal or not:

```dart
..registerHandler((event) async {
  await event.acknowledge(); // After that you have 15 mins to event.respond

  await event.respond(MessageBuilder.content("Respond"), hidden: true);
});
```
