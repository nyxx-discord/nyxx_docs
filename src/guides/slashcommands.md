---
title: slash commands
author: l7ssha
timestamp: 2021-09-21
category: guides
---

Slash commands is a new way of interacting with bots via chat using registered commands within discord API.
Such commands provide visual feedback in UI and are more tied to platform than classic text based command.

### Interactions extension

Before registering any commands you have to instantiate new instance of `Interactions` class, which is extension for
nyxx that provides slash command and message components functionality. 

```dart
final bot = Nyxx("<TOKEN>", GatewayIntents.allUnprivileged);
final interactions = Interactions(bot);
```

Interactions class contains all method and utils needed to register and handle slash commands.

### Registering commands

nyxx provides easy to use interface for registering commands in api and internal handler to privide functionality
to command. Command can be registered in API and added internally that bot can respond to them via web socket.

To register an command use `registerSlashCommand` method which takes instance of `SlashCommandBuilder` class.
`SlashCommandBuilder` provides all info needed for framework and API how to handle given slash command.

`SlashCommandBuilder` allows to build command with such properties:
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

To register `ping` command that responds with pong we can do something like that:
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

We specified name of command as `ping` and provided short description so user would now what commands does. We also invoked
`registerHandler` method that registers internal callback that command could be responded by bot. In that case we only
respond with MessageBuilder with content of `Pong!`.

#### Subcommands

Subcommands are handler by adding instances of `CommandOptionBuilder` to `SlashCommandBuilder` via `options` parameter
in the constructor. In discord API subcommands are just options in base command and there it is handled the same way.

`CommandOptionBuilder` has `registerHandler` which allows you to register callback that will be invoked when client
receives and interaction, just like base slash command.

> Note that `registerHandler` cannot be executed on `CommandOptionBuilder` that has other type than `CommandOptionType.subcommand`

So if we want to have command named `game` and few different games as subcommands to that command we can do something like that:
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

### Syncing commands

Registered commands needs to be synced with discords API. After calling `Interactions#syncOnReady` framework 
will perform bulk override of registered command which means that new commands will be added, existing will be updated,
and commands that are missing will be erased from the API. Global commands have ~1h long caching span, so they will 
be available after approx. 1 hour and guild command are available instantly.

#### sync types inside nyxx

Nyxx provides interface to customise syncing logic. There is `ICommandsSync` interface that implementation could be 
passed to `syncOnReady` to provide custom behavior on when to sync the commands. There are two built in implementations
of said interface: 
 - `ManualCommandSync` - which has only true/false switch if commands should be synced
 - `LockFileCommandSync` - creates lock file of registered command and syncs only if any of significant properties is changed

Default is `ManualCommandSync` and by default it is syncing command on each bot startup. So if you already registered your commands
and you won't make any further changes to its props then you can pass `ManualCommandSync` instance with false and commands
won't be synced with discord to avoid API abuse.

### Responding to commands

Initial response to slash command could be either response or acknowledge. Initial response must be sent within 3 seconds
from time that interaction is received otherwise it will fail in the UI. After acknowledging you can respond within 15 mins.

So to properly handle the interaction from code perspective you have to respond or acknowledge in 3 seconds and then respond in 15 mins.

```dart
..registerHandler((event) async {
  await event.acknowledge(); // After that you have 15 mins to event.respond

  await event.respond(MessageBuilder.content("Respond"));
});
```

#### ephemeral

Message could sent as ephemeral which means that message can be hidden for user that invoked the command in public chat,
like `Clyde` in discord client. 

`acknowledge` and `respond` have `hidden` optional parameter which allows to specify if command should be hidden or not.

```dart
..registerHandler((event) async {
  await event.acknowledge(); // After that you have 15 mins to event.respond

  await event.respond(MessageBuilder.content("Respond"));
});
```
