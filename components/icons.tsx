import type { ReactNode } from 'react'

const Svg = ({ size = 16, children }: { size?: number; children: ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
)

export const ArrowOut = () => (
  <Svg>
    <path d="M5 11 11 5M6 5h5v5" />
  </Svg>
)

export const ArrowRight = () => (
  <Svg>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </Svg>
)

export const ArrowLeft = () => (
  <Svg>
    <path d="M13 8H3M7 4 3 8l4 4" />
  </Svg>
)

export const ArrowUp = () => (
  <Svg size={12}>
    <path d="M8 13V3M4 7l4-4 4 4" />
  </Svg>
)

export const Check = () => (
  <Svg>
    <path d="m3 8.5 3.2 3L13 4.5" />
  </Svg>
)

export const Close = () => (
  <Svg>
    <path d="m4 4 8 8M12 4l-8 8" />
  </Svg>
)

export const Contrast = () => (
  <Svg size={18}>
    <circle cx="8" cy="8" r="5.5" />
    <path d="M8 2.5v11" />
    <path d="M8 4.5a3.5 3.5 0 0 1 0 7z" fill="currentColor" stroke="none" />
  </Svg>
)
