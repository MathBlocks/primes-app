import { css } from 'styled-components'

export const theme = {
  grey: [
    '#131313',
    '#181818',
    '#2d2d2d',
    '#9f9898',
    '#c4bfbf',
    '#f5f5f5',
  ],
  red: '#ff6b6b',
  orange: '#ffa27b',
  green: '#4ec895',
  purple: '#4959e9',
  dropShadow1: css`
    box-shadow: -4px 4px 10px 0 rgba(0, 0, 0, 0.25);
  `,
  dropShadow2: css`
    box-shadow: -6px 6px 22px 0 rgba(0, 0, 0, 0.55);
  `,
}
