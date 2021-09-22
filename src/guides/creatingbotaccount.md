---
title: Creating a Bot Account
author: One-Nub
timestamp: 2021-09-22
category: guides
---

### Creating a bot account
To get started with Nyxx, you'll need a Discord bot account!

- Head to the [Discord developers](https://discord.com/developers) site.
You'll be prompted to login if you aren't already.
- Once you are signed in, you should be redirected to the [applications](https://discord.com/developers/applications) page.
- Look towards to the top right and click the **New Application** button.
- Type in a name for the application, this will be the initial name of your bot account.
- On the left menu, select the **Bot** tab, then look to the right and click the **Add Bot** button.
- You will be presented with a menu asking if you *really* want to add a bot, which we do so click **Yes, do it!**

### Getting your bot's token
_WARNING: Do NOT share or publish this token anywhere publically. If you do, anyone will be able to use your bot account to perform any bot actions - such as banning users and leaving guilds._

- Once your bot account is made, on that same **Bot** tab, there will be a section labeled **Token**.
- For utilizing the token within Nyxx, press the **Copy** button and paste it into your code where the token is stored, or any other place you may store it.
- In the event you share your token, be sure to press the **Regenerate** button so the old token can't be used anymore.

### Inviting your bot to a server
Now that we've gotten this far, it's probably important that we invite the bot to your server to actually test commands in!

- First, head to the **OAuth2** tab found in the left menu on your bot's application page.
- Then scroll down to the OAuth2 URL Generator and select the **bot** checkbox.
- Scroll down some more so you can see the Bot Permissions page. This is where you get to select which permissions your bot has when it joins a server. For basic usage, select the **View Channels and Send Messages** permissions, and then scroll up to the generated URL and click the **Copy** button on the right. 
- Finally, head to that URL in your browser and add your bot!