import * as React from "react";
import useInterval from "../../hooks/useInterval";
import {
  DiscordDefaultOptions,
  DiscordMessage,
  DiscordMessages,
  DiscordOptionsContext,
  DiscordInteraction,
  DiscordMarkdown,
  _DiscordDefaultOptions,
} from "@discord-message-components/react";
import "@discord-message-components/react/styles";
import useIsBrowser from "@docusaurus/useIsBrowser";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const options: _DiscordDefaultOptions = {
  ...DiscordDefaultOptions,
  profiles: {
    l7ssha: {
      author: "l7ssha",
      avatar: "https://i.imgur.com/KZmUYEt.png",
      roleColor: "#5865f2",
    },
    mycoolbot: {
      author: "My Cool Bot",
      avatar: "red",
      roleColor: "rgb(235, 69, 158)",
      bot: true,
    },
  },
};

export default function ({
  lightTheme,
  prefix = "!",
}: {
  lightTheme?: boolean;
  prefix?: string;
}) {
  const browser = useIsBrowser();
  lightTheme ??= browser ? localStorage.getItem("theme") === "light" : true;
  const [light, setLight] = React.useState(lightTheme);
  useInterval(() => {
    setLight(browser ? localStorage.getItem("theme") === "light" : false);
  });
  return (
    <DiscordOptionsContext.Provider value={options}>
      <DiscordMessages lightTheme={light}>
        <DiscordMessage profile="l7ssha">{prefix}ping</DiscordMessage>
        <DiscordMessage profile="mycoolbot">Poong!</DiscordMessage>
      </DiscordMessages>
    </DiscordOptionsContext.Provider>
  );
}

export function PingCommandReplied({
  ping,
  prefix = "!",
  lightTheme,
}: {
  ping?: boolean;
  prefix?: string;
  lightTheme?: boolean;
}) {
  const browser = useIsBrowser();
  lightTheme ??= browser ? localStorage.getItem("theme") === "light" : true;
  const [light, setLight] = React.useState(lightTheme);
  useInterval(() => {
    setLight(browser ? localStorage.getItem("theme") === "light" : false);
  });
  return (
    <DiscordOptionsContext.Provider value={options}>
      <DiscordMessages lightTheme={light}>
        <DiscordMessage profile="l7ssha">{prefix}ping</DiscordMessage>
        <DiscordMessage profile="mycoolbot">
          <div slot="interactions">
            <DiscordInteraction profile="l7ssha" highlight={!!ping}>
              {prefix}ping
            </DiscordInteraction>
          </div>
          <DiscordMarkdown highlight={!!ping}>Poong!</DiscordMarkdown>
        </DiscordMessage>
      </DiscordMessages>
    </DiscordOptionsContext.Provider>
  );
}

export function PingCommandSlash({
  commandContent,
  content,
  lightTheme,
  ephemeral,
}: {
  commandContent?: string;
  content?: string;
  lightTheme?: boolean;
  ephemeral?: boolean;
}) {
  const browser = useIsBrowser();
  lightTheme ??= browser ? localStorage.getItem("theme") === "light" : true;
  const [light, setLight] = React.useState(lightTheme);
  useInterval(() => {
    setLight(browser ? localStorage.getItem("theme") === "light" : false);
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
          <DiscordMarkdown>{content}</DiscordMarkdown>
        </DiscordMessage>
      </DiscordMessages>
    </DiscordOptionsContext.Provider>
  );
}
