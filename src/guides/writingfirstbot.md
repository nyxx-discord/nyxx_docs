---
title: Writing your first bot
author: l7ssha
timestamp: 2021-09-20
category: Guides
---

### Creating project

You can create a simple project using the built-in dart command `dart create`:

```bash
dart create -t console-simple your-project-name
```

</br>

Replace `your-project-name` with your desired name. 

This command will create few files that are needed to start a project. There will be a `pubspec.yaml` with basic project info and dependency declaration. There will also be a file created with name of your project in `bin` directory. This is the main file that you would have to run to start the bot.

</br>

To add Nyxx to your project, run `dart pub add nyxx`. Your `pubspec.yaml` file should then look similar to this:
```yaml
name: test
description: A simple command-line application.
version: 1.0.0
# homepage: https://www.example.com

environment:
  sdk: '>=2.14.2 <3.0.0'

dependencies:
  nyxx: ^3.0.0
  
dev_dependencies:
  lints: ^1.0.0
```

</br>

Now when if you execute the `dart pub get` command in the project's root directory, nyxx should be pulled from repos:
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
+ nyxx 3.0.0
+ path 1.8.0
+ pedantic 1.11.1
+ source_span 1.8.1
+ string_scanner 1.1.0
+ term_glyph 1.2.0
+ typed_data 1.3.0
Changed 14 dependencies!
```

</br>

### First code

With everything set up, we can now start coding our bot, but let's start with something easy.
This is simple bot which replies to `!ping` with `pong`.
```dart
void main() {
  final bot = NyxxFactory.createNyxxWebsocket("TOKEN", GatewayIntents.allUnprivileged);

  bot.onMessageReceived.listen((event) {
    if (event.message.content == "!ping") {
      event.message.channel.sendMessage(content: "Pong!");
    }
  });
}
```

</br>

Let's explain what each line does:

```dart
final bot = NyxxFactory.createNyxxWebsocket("TOKEN", GatewayIntents.allUnprivileged);
```
Here we are creating and starting a new client with your token and desired gateway intents.
In this case the bot will request all intents except privileged ones.

</br>

```dart
bot.onMessageReceived.listen((event) {
    if (event.message.content == "!ping") {
      event.message.channel.sendMessage(MessageBuilder.content("Pong!"));
    }
});
```
Here we are subscribing to the `onMessageReceived` stream which will 'deliver' new messages to the handler.
The function is invoked with `MessageEvent` objects which contain `Message` objects for you to use.

</br>

```dart
if (event.message.content == "!ping") {
  event.message.channel.sendMessage(MessageBuilder.content("Pong!"));
}
```
Here we check if the message's content is equal to `!ping` and if it is we'll send `pong` message to the same channel. To send messages we have to access the channel which is in form of a `Cacheable` object. This is because channel might not
be cached inside client. 
