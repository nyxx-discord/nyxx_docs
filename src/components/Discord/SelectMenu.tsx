import {
  DiscordButtonProps,
  DiscordInteraction,
  DiscordMessage,
  DiscordMessages,
  DiscordOptionsContext,
} from '@discord-message-components/react';
import useInterval from '@site/src/hooks/useInterval';
import * as React from 'react';
import DiscordMultiSelect from './DiscordMultiSelect';
import options from './options';
import { ComponentProps } from './components';

interface SelectMenuProps extends React.PropsWithChildren<ComponentProps> {
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
  buttonTypes,
  urls,
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
            command={true}
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
