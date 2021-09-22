---
title: message components
author: HarryET
timestamp: 2021-09-22
category: guides
---

Message components allow for interactivity between a message sent by a bot and the user recieveing it. You can add buttons, links, select menus & multiselects.

### Interactions extension

Before you use message componenets you have to instantiate new instance of `Interactions` class, which is extension for
nyxx that provides slash command and message components functionality.

```dart
final bot = Nyxx("<TOKEN>", GatewayIntents.allUnprivileged);
final interactions = Interactions(bot);
```

Interactions class contains all method and utils needed to send and manage messages with componenets.


