import { SvgIcon, SvgIconProps } from '@mui/material';

import { DevIconName, DevIcons } from '.';

export type DevSvgIconProps = SvgIconProps & {
  name: DevIconName;
};

const DevSvgIcon = ({ name, ...rest }: DevSvgIconProps) => {
  return <SvgIcon component={DevIcons[name].icon} inheritViewBox {...rest} />;
};

export default DevSvgIcon;
