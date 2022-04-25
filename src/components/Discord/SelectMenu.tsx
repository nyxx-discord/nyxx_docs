import {
  DiscordInteraction,
  DiscordMessage,
  DiscordMessages,
  DiscordOptionsContext,
} from '@discord-message-components/react';
import useInterval from '@site/src/hooks/useInterval';
import React, { type PropsWithChildren }from 'react';
import DiscordMultiSelect from './DiscordMultiSelect';
import options from './options';
import { ComponentProps } from './components';

interface SelectMenuProps extends PropsWithChildren<ComponentProps> {
  /**
   * The options to display in the menu.
   */
  menuOptions: string[];
}

export default function SelectMenu({
  lightTheme,
  ephemeral,
  commandContent,
  content,
  menuOptions,
  disabled,
  children,
}: SelectMenuProps) {
  React.useEffect(() => {
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
            command
            profile="harryet"
          >
            {commandContent}
          </DiscordInteraction>
          {content}
          <DiscordMultiSelect
            disabled={!!disabled}
            lightTheme={light}
            options={menuOptions}
          >
            {children}
          </DiscordMultiSelect>
        </DiscordMessage>
      </DiscordMessages>
    </DiscordOptionsContext.Provider>
  );
}
