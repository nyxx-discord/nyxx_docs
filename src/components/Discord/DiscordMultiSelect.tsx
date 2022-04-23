import React from 'react';
import OutboundMultiSelectChevron from './OutboundMultiSelectChevron';
import DiscordMultiSelectCss from './DiscordMultiselect.module.css';
import clsx from 'clsx';

interface DiscordMultiSelectProps extends React.PropsWithChildren<{}> {
  /**
   * The options to display in the menu.
   */
  options: string[];

  /**
   * Whether use the light theme.
   */
  lightTheme?: boolean;

  /**
   * Whether the select menu is disabled.
   */
  disabled?: boolean;
}

export default function DiscordMultiSelect({
  options,
  children,
  lightTheme,
  disabled,
}: DiscordMultiSelectProps) {
  const classes = clsx('discord-multiselect', {
    'discord-light-theme': lightTheme,
    'discord-multiselect-disabled': disabled,
  })
    .split(' ')
    .map((c) => DiscordMultiSelectCss[c])
    .join(' ');

  const [showDropdown, setShowDropdown] = React.useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className={classes}>
      <div className={DiscordMultiSelectCss['discord-text']}>
        <span
          onClick={toggleDropdown}
          className={DiscordMultiSelectCss['discord-placeholder']}
        >
          {children}
        </span>
        <OutboundMultiSelectChevron rotate={showDropdown && !disabled} />
      </div>
      {!disabled && showDropdown && (
        <div className={DiscordMultiSelectCss['discord-multiselect-options']}>
          {options.map((option, index) => (
            <div
              key={index}
              className={DiscordMultiSelectCss['discord-multiselect-option']}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
