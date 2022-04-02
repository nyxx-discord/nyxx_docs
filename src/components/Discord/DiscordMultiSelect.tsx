import { PropsWithSlots } from '@discord-message-components/react';
import React, { PropsWithChildren } from 'react';
import OutboundMultiSelectChevron from './OutboundMultiSelectChevron';

interface DiscordMultiSelectProps {
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

  children?: React.ReactNode;
}

export default function DiscordMultiSelect({
  options,
  children,
  lightTheme,
  disabled,
}: DiscordMultiSelectProps) {
  let classes = 'discord-multiselect';
  if (lightTheme) classes += ' discord-light-theme';
  if (disabled) classes += ' discord-multiselect-disabled';
  const [showDropdown, setShowDropdown] = React.useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className={classes}>
      <div className="discord-text">
        <span onClick={toggleDropdown} className="discord-placeholder">
          {children}
        </span>
        <OutboundMultiSelectChevron rotate={showDropdown && !disabled} />
      </div>
      {!disabled && showDropdown && (
        <div className="discord-multiselect-options">
          {options.map((option, index) => (
            <div key={index} className="discord-multiselect-option">
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
