import { createGlobalStyle, css } from 'styled-components';
import { ThemeModelType } from './logic/types';
import { ThemeType } from './theme';

type StyleProps = {
  theme: ThemeType;
  osTheme: ThemeModelType;
  blur: boolean;
};

export const InjectTheme = css`
  ${(props: StyleProps) => css`
    :root {
      --base-font: 'Rubik', sans-serif;
      --blur-enabled: ${props.blur ? 'blur(16px)' : 'none'};
      --background-color: ${props.osTheme.backgroundColor};
      --accet-color: ${props.osTheme.accentColor};
      --input-color: ${props.osTheme.inputColor};
      --dock-color: ${props.osTheme.dockColor};
      --window-color: ${props.osTheme.windowColor};
      --theme-mode: ${props.osTheme.mode};
      --text-color: ${props.osTheme.textColor};
      --icon-color: ${props.osTheme.iconColor};
    }
  `}
`;

export const GlobalStyle = createGlobalStyle<StyleProps>`
  * {
    box-sizing: border-box;
    font-family: "Rubik", sans-serif;
  }

  ${InjectTheme}
  
  body {
    background-color: ${(props) => props.theme.colors.bg.primary};
    transition: background-color 1s ease;
    color: ${(props) => props.theme.colors.text.primary};
    height: 100vh;
    width: 100vw;
    margin: 0;
  }
  
  li {
    list-style: none;
  }

  ul {
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
  }

  a {
    text-decoration: none;
    height: fit-content;
    width: fit-content;
    margin: 10px;
  }

  fieldset {
    border: 0;
  }

`;

export default { GlobalStyle };
