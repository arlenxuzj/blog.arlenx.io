import { Stack, Tooltip } from '@mui/material';

import { DevIconName, DevIcons, DevSvgIcon } from '../../Icon';
import { ExternalLink } from '../../Link';

export type MDXDevIconSetProps = {
  names?: DevIconName[];
  fontSize?: number;
};

export type MDXDevIconProps = Required<Omit<MDXDevIconSetProps, 'names'>> & {
  name: DevIconName;
  label: string;
  href?: string;
};

export const MDXDevIcon = (props: MDXDevIconProps) => {
  const { name, label, fontSize, href } = props;

  const Icon = (name: DevIconName) => {
    switch (name) {
      case 'Mdx':
        return (
          <DevSvgIcon
            name={name}
            sx={{
              width: fontSize * 0.8 * 2.25,
              height: fontSize * 0.8
            }}
          />
        );
      case 'Poetry':
        return (
          <DevSvgIcon
            name={name}
            sx={{
              fontSize: fontSize * 0.8
            }}
          />
        );
      case 'Ubuntu':
        return (
          <DevSvgIcon
            name={name}
            sx={{
              fontSize,
              marginBottom: '-4px'
            }}
          />
        );
      case 'Vercel':
        return (
          <DevSvgIcon
            name={name}
            sx={{
              fontSize: fontSize * 0.9
            }}
          />
        );
      default:
        return (
          <DevSvgIcon
            name={name}
            sx={{
              fontSize
            }}
          />
        );
    }
  };

  return (
    <ExternalLink
      key={name}
      href={href || DevIcons[name].href}
      color='text.primary'
    >
      <Tooltip title={label}>
        <span>{Icon(name)}</span>
      </Tooltip>
    </ExternalLink>
  );
};

const MDXDevIconSet = ({ names, fontSize = 24 }: MDXDevIconSetProps) => {
  if (!names) {
    return (
      <Stack
        direction='row'
        gap={2}
        flexWrap='wrap'
        alignItems='center'
        sx={{
          color: 'text.primary',
          mt: 2,
          mb: 5,
          lineHeight: 0
        }}
      >
        {(Object.keys(DevIcons) as DevIconName[]).map((name: DevIconName) => (
          <MDXDevIcon
            key={name}
            name={name}
            label={DevIcons[name].label}
            fontSize={fontSize}
          />
        ))}
      </Stack>
    );
  }

  const icons = names.filter(name => DevIcons[name]);

  if (!icons.length) {
    return null;
  }

  return (
    <Stack
      direction='row'
      gap={2}
      flexWrap='wrap'
      alignItems='center'
      sx={{
        color: 'text.primary',
        mt: 2,
        mb: 5,
        lineHeight: 0
      }}
    >
      {icons.map((name: DevIconName) => (
        <MDXDevIcon
          key={name}
          name={name}
          label={DevIcons[name].label}
          fontSize={fontSize}
        />
      ))}
    </Stack>
  );
};

export default MDXDevIconSet;
