declare module '@discord-message-components/react' {
  import type { ReactElement, PropsWithChildren, ReactNode, Context } from 'react';

  interface Avatars {
    blue: string;
    gray: string;
    green: string;
    orange: string;
    red: string;
    [key: string]: string;
  }

  interface Profile {
    author?: string;
    avatar?: string;
    bot?: boolean;
    roleColor?: string;
  }

  interface DiscordMessageOptions {
    avatars: Avatars;
    defaultMode: 'cozy' | 'compact';
    defaultTheme: 'dark' | 'light';
    profiles: { [key: string]: Profile | undefined };
  }

  interface _DiscordDefaultOptions {
    avatars: Avatars & { default: string };
    defaultMode: 'cozy' | 'compact';
    profiles: { [key: string]: Profile | undefined };
  }

  const DiscordDefaultOptions: _DiscordDefaultOptions;
  const DiscordOptionsContext: Context<_DiscordDefaultOptions>;

  type PropsWithSlots = PropsWithChildren<{ slot?: string }>;
  type DiscordEmbedFieldProps = PropsWithChildren<{
    inline?: boolean;
    fieldTitle?: string;
  }>;

  interface AuthorInfoProps {
    author?: string;
    bot?: boolean;
    roleColor?: string;
  }

  interface DiscordButtonProps extends PropsWithSlots {
    disabled?: boolean;
    image?: string;
    type?: 'link' | 'success' | 'danger' | 'primary' | 'secondary';
    url?: string;
  }

  interface DiscordEmbedProps {
    authorIcon?: string;
    authorName?: string;
    authorUrl?: string;
    borderColor?: string;
    embedTitle?: string;
    image?: string;
    footerIcon?: string;
    thumbnail?: string;
    timestamp?: Date | string;
    url?: string;
  }

  interface DiscordInteractionProps extends PropsWithSlots {
    author?: string;
    avatar?: string;
    bot?: boolean;
    command?: boolean;
    edited?: boolean;
    ephemeral?: boolean;
    highlight?: boolean;
    profile?: string;
    roleColor?: string;
  }

  type DiscordMentionProps = PropsWithChildren<{
    highlight?: boolean;
    profile?: string;
    roleColor?: string;
    type?: string;
  }>;

  type DiscordMessageProps = PropsWithChildren<{
    author?: string;
    avatar?: string;
    bot?: boolean;
    edited?: boolean;
    profile?: string;
    roleColor?: string;
    timestamp?: Date | string;
  }>;

  type DiscordMessagesProps = PropsWithChildren<{
    compactMode?: boolean;
    lightTheme?: boolean;
  }>;

  interface DiscordReactionProps {
    active?: boolean;
    count?: number;
    image?: string;
    name?: string;
  }

  export function AuthorInfo(
    props: AuthorInfoProps & { className: string }
  ): ReactElement;
  export function DiscordButton(props: DiscordButtonProps): ReactElement;
  export function DiscordButtons(props: PropsWithSlots): ReactElement;
  export function DiscordEmbed(
    props: DiscordButtonProps & PropsWithSlots
  ): ReactElement;
  export function DiscordEmbedField(
    props: DiscordEmbedFieldProps
  ): ReactElement;
  export function DiscordEmbedFields(props: PropsWithSlots): ReactElement;
  export function DiscordInteraction(
    props: DiscordInteractionProps
  ): ReactElement;
  export function DiscordMarkdown(props: {
    children?: ReactNode;
    highlight?: boolean;
  }): ReactElement;
  export function DiscordMention(props: DiscordMentionProps): ReactElement;
  export function DiscordMessage(
    props: DiscordMessageProps & { compactMode?: boolean }
  ): ReactElement;
  export function DiscordMessages(props: DiscordMessagesProps): ReactElement;
  export function DiscordReaction(props: DiscordReactionProps): ReactElement;
  export function DiscordReactions(props: PropsWithSlots): ReactElement;
}

declare module '@discord-message-components/react/styles' {}
