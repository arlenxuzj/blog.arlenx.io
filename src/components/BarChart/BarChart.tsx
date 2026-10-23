import { Box, Stack } from '@mui/material';
import { parseWakaTimeText } from '@/utils/time';
import { Text } from '../Typography';

export type BarProps = {
  label: string;
  color: string;
  score: number;
  value: string;
};

export type BarChartProps = {
  title: string;
  color: string;
  data: { label: string; score: number; value: string }[];
};

export const Bar = ({ color, score, label, value }: BarProps) => {
  return (
    <Stack
      direction='row'
      sx={{
        gap: 2,
        alignItems: 'center',
        wordBreak: 'break-word'
      }}
    >
      <Text
        size='sm'
        sx={{
          color: 'text.secondary',
          fontWeight: 500,
          flexBasis: '30%'
        }}
      >
        {label}
      </Text>
      <Box
        sx={{
          flexBasis: '45%'
        }}
      >
        <Box
          sx={{
            height: 8,
            background: color,
            width: `${score}%`,
            borderRadius: 4
          }}
        />
      </Box>
      <Text
        size='xs'
        sx={{
          color: 'text.secondary',
          fontWeight: 400,
          flexBasis: '25%'
        }}
      >
        {parseWakaTimeText(value)}
      </Text>
    </Stack>
  );
};

const BarChart = ({ title, color, data }: BarChartProps) => {
  return (
    <Stack
      sx={{
        gap: 1,
        justifyContent: 'center'
      }}
    >
      <Text
        size='sm'
        sx={{
          color: 'text.primary',
          fontWeight: 700,
          mb: 2
        }}
      >
        {title}
      </Text>
      {data.map(item => (
        <Bar
          key={item.label}
          color={color}
          label={item.label}
          score={item.score}
          value={item.value}
        />
      ))}
    </Stack>
  );
};

export default BarChart;
