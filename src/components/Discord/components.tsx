import {
  DiscordButton,
  DiscordButtonProps,
  DiscordButtons,
  DiscordInteraction,
  DiscordMessage,
  DiscordMessages,
  DiscordOptionsContext,
  _DiscordDefaultOptions,
} from '@discord-message-components/react';
import useInterval from '@site/src/hooks/useInterval';
import React, { PropsWithChildren, useEffect } from 'react';
import options from './options';

export interface ComponentProps {
  /**
   * Whether use the light theme.
   */
  lightTheme?: boolean;

  /**
   * Whether the command is ephemeral.
   */
  ephemeral?: boolean;

  /**
   * The content of the command.
   * Example: `"Author" used /ping`
   */
  commandContent?: string;

  /**
   * The content of the message.
   */
  content?: string;

  /**
   * The content of the buttons.
   */
  buttonsContent?: string[];

  /**
   * The types of the buttons.
   * `'link' | 'success' | 'danger' | 'primary' | 'secondary'`
   */
  buttonTypes?: DiscordButtonProps['type'][];

  /**
   * The urls of the buttons if the button type is `'link'`.
   */
  urls?: string[];

  /**
   * Whether the buttons are disabled.
   */
  disabled: boolean[];
}

/**
 * Options for the `BaseCommand` component.
 */
interface BaseCommandProps
  extends PropsWithChildren<Omit<ComponentProps, 'content'>> {
  /**
   * The name of the author that used the command.
   */
  author?: string;

  /**
   * Whether the command is a slash command (Yeah, I know.. very explicit)
   */
  isCommand?: boolean;

  /**
   * Whether to reply to the command.
   */
  reply?: boolean;

  /**
   * Whether mention the author on reply.
   */
  mention?: boolean;
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
  useEffect(() => {
    lightTheme ??= localStorage.getItem('theme') === 'light';
  });
  const [light, setLight] = React.useState(lightTheme);
  useInterval(() => {
    setLight(localStorage.getItem('theme') === 'light');
  });
  return (
    <DiscordOptionsContext.Provider value={options}>
      <DiscordMessages lightTheme={light}>
        <DiscordMessage profile="mycoolbot">
          <DiscordInteraction
            slot="interactions"
            ephemeral={!!ephemeral}
            command={true}
            profile="harryet"
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
  reply = false,
  mention = true,
}: BaseCommandProps) {
  useEffect(() => {
    lightTheme ??= localStorage.getItem('theme') === 'light';
  });
  const [light, setLight] = React.useState(lightTheme);
  useInterval(() => {
    setLight(localStorage.getItem('theme') === 'light');
  });
  return (
    <DiscordOptionsContext.Provider value={options}>
      <DiscordMessages lightTheme={light}>
        <If condition={!isCommand}>
          <DiscordMessage profile={author}>{commandContent}</DiscordMessage>
        </If>
        <DiscordMessage profile="mycoolbot">
          {children}
          {(!!isCommand || !!reply) && (
            <DiscordInteraction
              slot="interactions"
              ephemeral={!!ephemeral}
              command={!!isCommand}
              profile={author}
              highlight={!!mention && !isCommand}
            >
              {commandContent}
            </DiscordInteraction>
          )}
        </DiscordMessage>
      </DiscordMessages>
    </DiscordOptionsContext.Provider>
  );
}
