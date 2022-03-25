import {
  DiscordButton,
  DiscordButtonProps,
  DiscordButtons,
  DiscordDefaultOptions,
  DiscordInteraction,
  DiscordMarkdown,
  DiscordMessage,
  DiscordMessages,
  DiscordOptionsContext,
  _DiscordDefaultOptions,
} from '@discord-message-components/react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import useInterval from '@site/src/hooks/useInterval';
import * as React from 'react';
import DiscordMultiSelect from './DiscordMultiSelect';
import options from './options';

export default function Component({
  lightTheme,
  ephemeral,
  commandContent,
  content,
  menuOptions,
  buttonTypes,
  urls,
  disabled,
  children,
}: {
  lightTheme?: boolean;
  ephemeral?: boolean;
  commandContent?: string;
  content?: string;
  menuOptions?: string[];
  buttonTypes?: DiscordButtonProps['type'][];
  urls?: string[];
  disabled?: boolean;
  children?: React.ReactNode;
}) {
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
