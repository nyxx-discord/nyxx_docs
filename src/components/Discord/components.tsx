import {
  DiscordButton,
  DiscordButtonProps,
  DiscordButtons,
  DiscordDefaultOptions,
  DiscordInteraction,
  DiscordMarkdown,
  DiscordMention,
  DiscordMessage,
  DiscordMessages,
  DiscordOptionsContext,
  _DiscordDefaultOptions,
} from '@discord-message-components/react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import useInterval from '@site/src/hooks/useInterval';
import React, { PropsWithChildren } from 'react';

const options: _DiscordDefaultOptions = {
  ...DiscordDefaultOptions,
  profiles: {
    l7ssha: {
      author: 'l7ssha',
      avatar: 'https://i.imgur.com/KZmUYEt.png',
      roleColor: '#5865f2',
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

interface ComponentProps {
  lightTheme?: boolean;
  ephemeral?: boolean;
  commandContent?: string;
  content?: string;
  buttonsContent?: string[];
  buttonTypes?: DiscordButtonProps['type'][];
  urls?: string[];
  disabled: boolean[];
}

interface BaseCommandProps extends PropsWithChildren<Omit<ComponentProps, 'content'>> {
  author?: string;
  isCommand?: boolean;
}

export default function Component({
  lightTheme,
  ephemeral,
  commandContent,
  content,
  buttonsContent,
  buttonTypes,
  urls,
  disabled,
}: ComponentProps) {
  const browser = useIsBrowser();
  lightTheme ??= browser ? localStorage.getItem('theme') === 'light' : false;
  const [light, setLight] = React.useState(lightTheme);
  useInterval(() => {
    setLight(browser ? localStorage.getItem('theme') === 'light' : false);
  });
  return (
    <DiscordOptionsContext.Provider value={options}>
      <DiscordMessages lightTheme={light}>
        <DiscordMessage profile="mycoolbot">
          <DiscordInteraction
            slot="interactions"
            ephemeral={!!ephemeral}
            command={true}
            profile="l7ssha"
          >
            {commandContent}
          </DiscordInteraction>
          {content}
          <DiscordButtons>
            {buttonsContent &&
              buttonsContent.map((buttonContent, index) => (
                <DiscordButton
                  disabled={disabled && disabled[index]}
                  key={index}
                  type={buttonTypes && (buttonTypes[index] as any)}
                  url={urls && urls[index]}
                >
                  {buttonContent}
                </DiscordButton>
              ))}
          </DiscordButtons>
        </DiscordMessage>
      </DiscordMessages>
    </DiscordOptionsContext.Provider>
  );
}

export function BaseCommand({
  lightTheme,
  ephemeral,
  commandContent,
  children,
  author,
  isCommand = false,
  disabled = [],
  buttonTypes = [],
  buttonsContent,
  urls,
}: BaseCommandProps) {
  const browser = useIsBrowser();
  lightTheme ??= browser ? localStorage.getItem('theme') === 'light' : false;
  const [light, setLight] = React.useState(lightTheme);
  useInterval(() => {
    setLight(browser ? localStorage.getItem('theme') === 'light' : false);
  });
  return (
    <DiscordOptionsContext.Provider value={options}>
      <DiscordMessages lightTheme={light}>
        {!isCommand && (
          <DiscordMessage profile={author}>{commandContent}</DiscordMessage>
        )}
        <DiscordMessage profile="mycoolbot">
          {children ||
            (isCommand && (
                <DiscordInteraction
                  slot="interactions"
                  ephemeral={!!ephemeral}
                  command={true}
                  profile={author}
                >
                  {commandContent}
                </DiscordInteraction>
              ) &&
              buttonsContent && (
                <DiscordButtons>
                  {buttonsContent.map((buttonContent, index) => (
                    <DiscordButton
                      disabled={disabled && disabled[index]}
                      key={index}
                      type={buttonTypes && (buttonTypes[index] as any)}
                      url={urls && urls[index]}
                    >
                      {buttonContent}
                    </DiscordButton>
                  ))}
                </DiscordButtons>
              ))}
        </DiscordMessage>
      </DiscordMessages>
    </DiscordOptionsContext.Provider>
  );
}
