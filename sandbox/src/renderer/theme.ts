import { lighten, darken, rgba } from 'polished';

export const fonts = {
  body: '"Rubik", sans-serif',
  heading: '"Rubik", sans-serif',
  monospace: 'Source Code Pro, monospace',
};

export const fontByName = {
  Rubik: '"Rubik", sans-serif',
  Oxanium: 'Oxanium',
  'Source Code Pro': 'Source Code Pro, monospace',
  Inter: 'Inter, sans-serif',
};

export const fontSizes = [
  '0.702rem', // 0 == 10px
  '0.79rem', //  1 == 12px
  '0.889rem', // 2 == 14px
  '1rem', //     3 == 16px
  '1.125rem', // 4
  '1.266rem', // 5
  '1.424rem', // 6
  '1.602rem', // 7
  '1.802rem', // 8
  '2.027rem', // 9
  '2.281rem', // 10
];

export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
};

export const lineHeights = {
  solid: 'normal',
  title: '1.25rem',
  copy: '1.5rem',
};

export const letterSpacings = {
  default: 'normal',
  tracked: '0.04em',
};

export const space = [0, 4, 8, 12, 16, 20, 24, 28, 32];
export const sizes = [8, 16, 24, 32, 64, 128, 256, 512, 768, 1024, 1536];

export const breakpoints = ['40em', '56em', '64em'];
export const breakpointsPx = [500, 600, 768, 992, 1200]; // mobile, small, tablets, laptops, larger laptops

export const transition = '0.2s ease';
export const transitionFast = '0.05s ease';

export const input = {
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: 4,
};
// TODO make elevation theme specific
export const elevations = {
  none: 'none',
  one: '0px 0px 4px rgba(0, 0, 0, 0.06)',
  two: '0px 0px 9px rgba(0, 0, 0, 0.12)',
  three: '0px 0px 9px rgba(0, 0, 0, 0.18)',
  lifted:
    '0 0 0 1px rgb(16 22 26 / 10%), 0 0 0 rgb(16 22 26 / 0%), 0 1px 1px rgb(16 22 26 / 20%)',
};

export const containers = {
  rounderBorderRadius: 9,
  outerBorderRadius: 6,
  innerBorderRadius: 4,
};
export const radii = {
  large: '0.5rem',
  medium: '0.25rem',
  small: '0.125rem',
};

// TODO restructure to generate type in an elegant way
export const theme = {
  light: {
    space,
    sizes,
    elevations,
    fonts,
    fontByName,
    fontSizes,
    fontWeights,
    lineHeights,
    letterSpacings,
    breakpoints,
    breakpointsPx,
    transition,
    transitionFast,
    input,
    radii,
    containers,
    colors: {
      brand: {
        primary: '#4E9EFD',
        secondary: '#EF9134',
        neutral: '#F3F3F3',
        accent: '#DB7C00',
        muted: rgba('#4E9EFD', 0.1),
      },
      ui: {
        primary: '#262626',
        secondary: '#757575',
        tertiary: '#FAFAFA',
        quaternary: '#FFFFFF',
        disabled: '#DEDEDE',
        intent: {
          default: '#F1F3F4',
          // info: '#97A3B2',
          info: '#83909F',
          success: '#0FC383',
          caution: '#FFBC32',
          alert: '#FF6240',
        },
        borderColor: '#E6E6E6', // #e3e3e3
        borderHover: '#DADADA',
        input: {
          background: '#FFFFFF',
          secondary: '#FAFAFA',
          borderColor: 'rgba(0, 0, 0, 0.1)',
          borderHover: 'rgba(0, 0, 0, 0.2)',
        },
      },
      os: {
        tray: 'rgba(0, 0, 0, 0.05)',
        base: '#000000',
      },
      bg: {
        primary: '#FBFBFB',
        secondary: '#FFFFFF',
        tertiary: '#f1f1f2',
        blendedBg: rgba('#FFFFFF', 0.5),
        inset: '#F5F5F5',
        toolbar: '#F1F3F4',
        divider: '#DBDBDB',
        body: '#DBDBDB',
      },
      icon: {
        app: '#85898E',
        bgButton: rgba('#85898E', 0.5),
        toolbar: '#71757A',
      },
      text: {
        primary: '#333333',
        secondary: '#656565',
        tertiary: '#5D6064',
        disabled: '#999999',
        placeholder: 'rgba(0, 0, 0, 0.5)',
        white: '#FFFFFF',
        inverse: '#FFFFFF',
        error: '#D0421B',
        success: '#138000',
      },
      highlights: {
        primaryHighlight: darken(0.05, '#4E9EFD'),
        primaryExtraHighlight: darken(0.1, '#4E9EFD'),
        bgHighlight: darken(0.075, '#FFFFFF'),
        bgSoftHighlight: darken(0.05, '#FFFFFF'),
        bgClearHighlight: rgba('#FFFFFF', 0.2),
      },
    },
  },
  dark: {
    space,
    sizes,
    elevations,
    fonts,
    fontByName,
    fontSizes,
    fontWeights,
    lineHeights,
    letterSpacings,
    breakpoints,
    breakpointsPx,
    transition,
    transitionFast,
    input,
    radii,
    containers,
    colors: {
      brand: {
        primary: '#4E9EFD',
        secondary: '#EF9134',
        accent: '#FDB447',
        muted: rgba('#4E9EFD', 0.2),
      },
      ui: {
        primary: '#FFFFFF',
        secondary: '#A1A1A1',
        tertiary: '#26343F',
        quaternary: '#24313B',
        disabled: '#25343F',
        intent: {
          info: '#97A3B2',
          success: '#0FC383',
          caution: '#FFBC32',
          alert: '#F93939',
        },
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderHover: 'rgba(0, 0, 0, 0.3)',
        input: {
          background: '#1D2932',
          secondary: '#1D2932',
          borderColor: 'rgba(0, 0, 0, 0.2)',
          borderHover: 'rgba(0, 0, 0, 0.3)',
        },
      },
      os: {
        tray: 'rgba(255, 255, 255, 0.05)',
        base: '#FFFFFF',
      },
      bg: {
        primary: '#212D36',
        secondary: '#2A3843',
        tertiary: '#212E37',
        blendedBg: rgba('#2A3843', 0.4),
        inset: '#1c2128',
        toolbar: '#1D2932',
        divider: '#09151E',
        body: '#1D2932',
      },
      icon: {
        app: '#FFFFFF50',
        toolbar: '#A2A8AC',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#A0A9B0',
        tertiary: '#C1C7CC',
        disabled: '#868E94',
        placeholder: 'rgba(255, 255, 255, 0.5)',
        inverse: '#262626',
        white: '#FFFFFF',
        error: '#FF4D4D',
        success: '#1CBD00',
      },
      highlights: {
        primaryHighlight: lighten(0.05, '#4E9EFD'),
        primaryExtraHighlight: lighten(0.1, '#4E9EFD'),
        bgHighlight: darken(0.01, '#212D36'),
        bgSoftHighlight: darken(0.005, '#212D36'),
        bgClearHighlight: rgba('#212D36', 0.2),
      },
    },
  },
};

export type ThemeType = typeof theme.light;

export default theme;
