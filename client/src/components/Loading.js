import React from "react";

function Loading() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      version='1'
      viewBox='0 0 128 35'
    >
      <g>
        <circle cx='17.5' cy='17.5' r='17.5'></circle>
        <animate
          attributeName='opacity'
          begin='0s'
          dur='1200ms'
          keyTimes='0;0.167;0.5;0.668;1'
          repeatCount='indefinite'
          values='0.3;1;1;0.3;0.3'
        ></animate>
      </g>
      <g>
        <circle cx='110.5' cy='17.5' r='17.5'></circle>
        <animate
          attributeName='opacity'
          begin='0s'
          dur='1200ms'
          keyTimes='0;0.334;0.5;0.835;1'
          repeatCount='indefinite'
          values='0.3;0.3;1;1;0.3'
        ></animate>
      </g>
      <g>
        <circle cx='64' cy='17.5' r='17.5'></circle>
        <animate
          attributeName='opacity'
          begin='0s'
          dur='1200ms'
          keyTimes='0;0.167;0.334;0.668;0.835;1'
          repeatCount='indefinite'
          values='0.3;0.3;1;1;0.3;0.3'
        ></animate>
      </g>
    </svg>
  );
}

export default Loading;
