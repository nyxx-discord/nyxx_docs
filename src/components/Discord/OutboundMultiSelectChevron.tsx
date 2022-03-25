import React, { ReactElement } from 'react';

export default function ({ rotate }: { rotate?: boolean }): ReactElement {
  return (
    <span className={`outbound-chevron-icon ${!!rotate ? 'rotate' : ''}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z"
        ></path>
      </svg>
    </span>
  );
}
