import React from 'react';
import { RADIALCOLORS } from '../../../consts';

const GreenStatic = () => {
  return (
    <svg
      width="69"
      height="21"
      viewBox="0 0 69 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect
        opacity="0.7"
        x="0.685547"
        width="68"
        height="21"
        rx="1"
        fill="#EAEAEA"
      />
      <path
        d="M0.685547 12.929C9.37632 12.929 8.35387 9.47584 18.5783 9.47584C28.8027 9.47584 26.2466 15.9524 34.9374 15.9524C43.6282 15.9524 45.531 10.929 52.3189 10.929C58.9072 10.929 59.9948 5 68.6855 5"
        stroke="url(#paint0_linear)"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="34.6855"
          y1="5"
          x2="34.6855"
          y2="15.9524"
          gradientUnits="userSpaceOnUse">
          <stop stop-color="#8AFF6C" />
          <stop offset="1" stop-color="#02C751" />
        </linearGradient>

        <linearGradient id="storage">
          <stop offset="0%" stopColor={RADIALCOLORS.blue} />
          <stop offset="100%" stopColor="#02A4FF" />
        </linearGradient>

        <linearGradient id="status-green">
          <stop offset="0%" stopColor={RADIALCOLORS.green} />
          <stop offset="100%" stopColor="#8AFF6C" />
        </linearGradient>

        <linearGradient id="status-orange">
          <stop offset="0%" stopColor={RADIALCOLORS.orange} />
          <stop offset="100%" stopColor="#FFA715" />
        </linearGradient>

        <linearGradient id="status-red">
          <stop offset="0%" stopColor={RADIALCOLORS.red} />
          <stop offset="100%" stopColor="#FF7B7B" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default GreenStatic;
