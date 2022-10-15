import * as React from "react";

const EqualizerAniLight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style={{
      margin: "auto",
      display: "block",
    }}

    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <g transform="rotate(180 50 50)">
      <rect x={6.111111111111111} y={12.5} width={10} height={40} fill="#0ea5e9">
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          times="0;0.33;0.66;1"
          dur="1s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="-0.25s"
        />
      </rect>
      <rect x={17.22222222222222} y={12.5} width={10} height={40} fill="#0ea5e9">
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          times="0;0.33;0.66;1"
          dur="1s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="-0.5s"
        />
      </rect>
      <rect x={28.333333333333336} y={12.5} width={10} height={40} fill="#0ea5e9">
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          times="0;0.33;0.66;1"
          dur="1s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="-0.625s"
        />
      </rect>
      <rect x={39.44444444444444} y={12.5} width={10} height={40} fill="#0ea5e9">
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          times="0;0.33;0.66;1"
          dur="1s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="-0.375s"
        />
      </rect>
      <rect x={50.55555555555556} y={12.5} width={10} height={40} fill="#0ea5e9">
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          times="0;0.33;0.66;1"
          dur="1s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="-0.75s"
        />
      </rect>
      <rect x={61.66666666666667} y={12.5} width={10} height={40} fill="#0ea5e9">
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          times="0;0.33;0.66;1"
          dur="1s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="0s"
        />
      </rect>
      <rect x={72.77777777777777} y={12.5} width={10} height={40} fill="#0ea5e9">
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          times="0;0.33;0.66;1"
          dur="1s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="-0.875s"
        />
      </rect>
      <rect x={83.88888888888889} y={12.5} width={10} height={40} fill="#0ea5e9">
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          times="0;0.33;0.66;1"
          dur="1s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="-0.125s"
        />
      </rect>
    </g>
  </svg>
);

export default EqualizerAniLight;
