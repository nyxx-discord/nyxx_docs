import { PropsWithSlots } from "@discord-message-components/react";
import React, { ReactElement } from "react";
import OutboundMultiSelectChevron from "./OutboundMultiSelectChevron";

// import './style.module.css';

type DiscordMultiSelectProps = {
  options: string[];
  lightTheme?: boolean;
  disabled?: boolean;
} & PropsWithSlots;

export default function DiscordMultiSelect({
  options,
  children,
  lightTheme,
  disabled,
}: DiscordMultiSelectProps) {
  let classes = "discord-multiselect";
  if (lightTheme) classes += " discord-light-theme";
  if (disabled) classes += " discord-multiselect-disabled";
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

// export function DiscordMultiSelectOption({
//   children,
//   lightTheme,
// }: PropsWithSlots & { lightTheme?: boolean }): ReactElement {
//   return <div className="discord-multiselect-option">{children}</div>;
// }
