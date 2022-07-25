export type ThemeModelType = {
  backgroundColor: string;
  accentColor: string;
  inputColor: string;
  dockColor: string;
  windowColor: string;
  mode: 'light' | 'dark';
  textColor: string;
  iconColor: string;
};

export type WindowModelProps = {
  id: string;
  title?: string;
  glob?: boolean;
  zIndex: number;
  type: 'urbit' | 'dev';
  dimensions: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export type DimensionModelType = {
  x: number;
  y: number;
  width: number;
  height: number;
};
