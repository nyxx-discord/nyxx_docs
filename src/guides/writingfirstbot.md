---
title: writing your first bot
author: l7ssha
timestamp: 2021-09-20
category: guides
---

### Creating project

You can create simple project using built-in dart command `dart create`.

```bash
dart create -t console-simple your-project-name
```

Replace `your-project-name` with your desired name. 

Command will create few files that are needed to start a project. There would be `pubspec.yaml` with basic project info
and dependencies declarations. There will be also created file with name of your project in `bin` directory. This is
main file that you would have to run to start the bot.

But let's start from `pubspec.yaml` file. To add nyxx to your project add
```
nyxx: ^2.0.0
```
under dependencies directive. Your file should look something like that:
```yaml
name: test
description: A simple command-line application.
version: 1.0.0
# homepage: https://www.example.com

environment:
  sdk: '>=2.14.2 <3.0.0'

dependencies:
  nyxx: ^2.0.0
  
dev_dependencies:
  lints: ^1.0.0
```

Now when if you execute `dart pub get` command in project's root directory, nyxx should be pulled from repos:
```
$ dart pub get
Resolving dependencies...
+ async 2.8.2
+ charcode 1.3.1
+ collection 1.15.0
+ http 0.13.3
+ http_parser 4.0.0
+ logging 1.0.2
+ meta 1.7.0
+ nyxx 2.0.0-rc.15
+ path 1.8.0
+ pedantic 1.11.1
+ source_span 1.8.1
+ string_scanner 1.1.0
+ term_glyph 1.2.0
+ typed_data 1.3.0
Changed 14 dependencies!
```

### First code

With basic setup done and working we can now start coding our bot, but let's start with something easy.
This is simple bot which replies to `!ping` with `pong`.
```dart
void main() {
  final bot = Nyxx("TOKEN", GatewayIntents.allUnprivileged);

  bot.onMessageReceived.listen((event) {
    if (event.message.content == "!ping") {
      event.message.channel.sendMessage(content: "Pong!");
    }
  });
}
```

Let's explain what each line does:

```dart
final bot = Nyxx("TOKEN", GatewayIntents.allUnprivileged);
```
Here we are creating and starting new client with your token and desired gateway intents.
In that case bot will request all intents except privileged ones.

```dart
bot.onMessageReceived.listen((event) {
    if (event.message.content == "!ping") {
      event.message.channel.sendMessage(MessageBuilder.content("Pong!"));
    }
});
```
Here we are subscribing to `onMessageReceived` stream which will 'deliver' new messages to bind handler.
Event is invoked with `MessageEvent` object which contains `Message` object for your usage.

```dart
if (event.message.content == "!ping") {
  event.message.channel.sendMessage(MessageBuilder.content("Pong!"));
}
```
We are checking if message's content is equal to `!ping` and if true we'll send `pong` message in original message channel.
To send message we have to access channel which is in form of `Cacheable` object. This is because channel might not
be cached inside client. 
