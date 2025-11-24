---
title: Writing your first bot
description: Making a simple reply on mention bot
authors: l7ssha
date: 2021-09-20
category: tutorials
sidebar_position: 2
---

### Creating project

You can create a simple project using the built-in dart command `dart create`:

```
$ dart create -t console-simple your-project-name && cd ./your-project-name
```

Replace `your-project-name` with your desired name.

This command will create few files that are needed to start a project. There will be a
`pubspec.yaml` with basic project info and dependency declaration. There will also be a file created
with name of your project in `bin` directory. This is the main file that you would have to run to
start the bot.

To add nyxx to your project, run `dart pub add nyxx`. Your `pubspec.yaml` file should then look
similar to this:

```yaml title="pubspec.yaml"
name: your_project_name
description: A simple command-line application.
version: 1.0.0
# homepage: https://www.example.com

environment:
  sdk: ">=3.10.0 <4.0.0"

# Add regular dependencies here.
dependencies:
  nyxx: ^6.7.0

dev_dependencies:
  lints: ^6.0.0
```

Now, execute the `dart pub get` command in the project's root directory to fetch all the required
dependencies:

```
$ dart pub get
Resolving dependencies... 
Downloading packages... 
+ async 2.13.0
+ collection 1.19.1
+ crypto 3.0.7
+ eterl 1.1.0
+ http 1.6.0
+ http_parser 4.1.2
+ lints 6.0.0
+ logging 1.3.0
+ meta 1.17.0
+ nyxx 6.7.0
+ oauth2 2.0.5
+ path 1.9.1
+ runtime_type 1.1.0
+ source_span 1.10.1
+ string_scanner 1.4.1
+ term_glyph 1.2.2
+ typed_data 1.4.0
+ web 1.1.1
Changed 18 dependencies!
```

### Creating a bot account

For the next part of this tutorial, you'll need a **token** for your bot. See
[Creating a Bot Account](/tutorials/creating_a_bot_account) for details on how to do this.

### First code

With everything set up, we can now start coding our bot, but let's start with something easy.
This is simple bot which replies to messages mentioning the bot.

Here's the code for this, which we'll explain line by line:
```dart title="bin/your_project_name.dart"
import 'package:nyxx/nyxx.dart';

void main() async {
  final client = await Nyxx.connectGateway(
    'TOKEN', // Replace this with your bot's token
    GatewayIntents.allUnprivileged,
    options: GatewayClientOptions(plugins: [logging, cliIntegration]),
  );

  final botUser = await client.user.get();

  client.onMessageCreate.listen((event) async {
    if (event.mentions.contains(botUser)) {
      await event.message.channel.sendMessage(MessageBuilder(
        content: 'Hi There!',
        referencedMesssage: .reply(messageId: event.message.id),
      ));
    }
  });
}
```

First, we need to create a client that can connect to Discord's API. To do that, we use the
`Nyxx.connectGateway` method:
```dart
final client = await Nyxx.connectGateway(
  'TOKEN', // Replace this with your bot's token
  GatewayIntents.allUnprivileged,
  options: GatewayClientOptions(plugins: [logging, cliIntegration]),
);
```

The `connectGateway` method creates a client that can execute actions using the API and receive
events from Discord whenever something happens - such as a user sending a message. There are other
ways to use the API, but we won't look at those now.

The first parameter is the token that the bot will use to communicate with the API. This is the
token that was generated when you [created your bot account](#creating_a_bot_account). Because you
shouldn't ever publish your token, we recommend using an environment variable instead of hard-coding
the token value.

The second parameter are the intents your client wants to use. Intents are a way of selecting which
events you want Discord's API to send you - which can lighten the load on your bot when it gets
large. Since this bot isn't going to be handling thousands of users, we can just specify that we
want to receive all the unprivileged events.

<Info>

Notice that we use `GatewayIntents.allUnprivileged` instead of `GatewayIntents.all`. This is because
some intents require authorization from Discord to use as they provide access to potentially
sensitive information.

See [here](/tutorials/creating_a_bot_account#privileged-gateway-intents) to enable and use these. 

</Info>

The last parameter are the options we are using to configure our client. Client options allow you to
configure nyxx itself. For now, we just specify that we want to add the `logging` and
`cliIntegration` plugins to our client.

Next, in order to know whether the bot was mentioned, we need to know who the bot's user is. That's
what `user.get()` allows us to do:
```dart
final botUser = await client.user.get();
```

The client exposes `Manager`s for running operations on the API. In this case, we use the `users`
manager to fetch the current user (which will be the bot's user). There are other managers for other
types of entities: `channels`, `guilds`, `commands`...

Finally, we want to run code every time the bot receives a message to check if it was mentioned. For
that, we listen to the `onMessageCreate` stream:
```dart
client.onMessageCreate.listen((event) async {
  if (event.mentions.contains(botUser)) {
    await event.message.channel.sendMessage(MessageBuilder(
      content: 'Hi There!',
      referencedMessage: .reply(event.message.id),
    ));
  }
});
```

An event will be added to the `onMessageCreate` stream whenever a message that the bot can see is
created. The `MessageCreateEvent` event will contain the created `Message` as well as some extra
fields, like `mentions`.

In our case, we first check if the users mentioned in the event include our user:
```dart
if (event.mentions.contains(botUser)) {
  ...
}
```

If it does, then we want to send a message to the same channel the message was sent in:
```dart
await event.message.channel.sendMessage(MessageBuilder(
  content: 'Hi There!',
  referencedMessage: .reply(event.message.id),
));
```

The `sendMessage` method takes a `MessageBuilder` that describes the message that will be sent. In
this case, we specify the content of our message and a `referencedMessage`.

The `referencedMessage` parameter allows us to reply to a message (here, the message that mentioned the bot)
by giving its ID. Most entities - messages included - have an ID on Discord, which we access with
`message.id`.
