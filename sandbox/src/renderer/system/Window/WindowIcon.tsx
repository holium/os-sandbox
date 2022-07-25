import { FC } from 'react';
import { rgba } from 'polished';

import { IconButton, Icons, IconTypes } from 'renderer/components';

interface WindowIconProps {
  icon: IconTypes;
  bg: string;
  iconColor: string;
  disabled?: boolean;
  size?: number;
  onClick: (...params: any) => void;
  fillWithBg?: boolean;
}

export const WindowIcon: FC<WindowIconProps> = (props: WindowIconProps) => {
  const { size, disabled, icon, bg, iconColor, onClick, fillWithBg } = props;
  return (
    <IconButton
      isDisabled={disabled}
      size={size}
      initial={{ background: rgba(bg, 0) }}
      whileHover={{ background: rgba(bg, 0.2), fill: bg }}
      transition={{ background: 0.2, fill: 0.2 }}
      hoverFill={fillWithBg ? bg : iconColor}
      onPointerDown={(evt: any) => {
        evt.stopPropagation();
      }}
      onDrag={(evt: any) => {
        evt.stopPropagation();
      }}
      onClick={onClick}
      color={rgba(iconColor, 0.4)}
    >
      <Icons name={icon} />
    </IconButton>
  );
};

WindowIcon.defaultProps = {
  size: 24,
};
