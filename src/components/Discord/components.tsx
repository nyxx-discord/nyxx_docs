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
import React, { PropsWithChildren, ReactNode } from 'react';
import options from './options';

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

/**
 * Options for the `BaseCommand` component.
 */
interface BaseCommandProps
  extends PropsWithChildren<Omit<ComponentProps, 'content'>> {
  author?: string;
  /**
   * Whether the command is a slash command (Yeah, I know.. very explicit)
   */
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

const If = ({ condition, children }: { condition: boolean; children: any }) => {
  if (condition) return children;
  return null;
};

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
        <If condition={!isCommand}>
          <DiscordMessage profile={author}>{commandContent}</DiscordMessage>
        </If>
        <DiscordMessage profile="mycoolbot">
          {children}
          {!!isCommand && (
            <DiscordInteraction
              slot="interactions"
              ephemeral={!!ephemeral}
              command={true}
              profile={author}
            >
              {commandContent}
            </DiscordInteraction>
          )}
        </DiscordMessage>
      </DiscordMessages>
    </DiscordOptionsContext.Provider>
  );
}
