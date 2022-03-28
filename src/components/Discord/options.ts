import {
  _DiscordDefaultOptions,
  DiscordDefaultOptions,
} from '@discord-message-components/react';

const options: _DiscordDefaultOptions = {
  ...DiscordDefaultOptions,
  profiles: {
    l7ssha: {
      author: 'l7ssha',
      avatar: 'https://i.imgur.com/KZmUYEt.png',
      roleColor: '#5865f2',
    },
    harryet: {
      author: 'HarryET',
      avatar: 'https://github.com/HarryET.png',
      roleColor: '#f2b749',
    },
    abitofevrything: {
      author: 'Abitofevrything',
      avatar: 'https://github.com/abitofevrything.png',
      roleColor: '#48bebe',
    },
    mycoolbot: {
      author: 'My Cool Bot',
      avatar: 'red',
      roleColor: 'rgb(235, 69, 158)',
      bot: true,
    },
    rapougnac: {
      author: 'Rapougnac',
      avatar: 'https://github.com/Rapougnac.png',
      roleColor: '#f35959',
    },
  },
};

export default options;
