import { Box } from '@mui/material';

import { BarChart } from '@/components/BarChart';
import { WakatimeAllTimeSinceToday } from '@/services/wakatime/all-time-since-today';
import { WakatimeStats } from '@/services/wakatime/stats';
import { parseWakaTimeText } from '@/utils/time';

import { Text } from '../../Typography';

export type MDXCodingStatesProps = {
  wakatimeAllTimeSinceToday: WakatimeAllTimeSinceToday;
  wakatimeStats: WakatimeStats;
};

const MDXCodingStats = ({
  wakatimeAllTimeSinceToday,
  wakatimeStats
}: MDXCodingStatesProps) => {
  return (
    <Box
      sx={{
        mt: 2,
        mb: 5
      }}
    >
      <Text size='md' sx={{ mb: 5 }}>
        Since{' '}
        {new Date(
          wakatimeAllTimeSinceToday?.data.range.start || 0
        ).getFullYear()}
        , I&apos;ve spent
        <Text
          component='span'
          size='lg'
          color='primary'
          fontWeight={600}
          sx={{ mx: 1 }}
        >
          {parseWakaTimeText(
            wakatimeAllTimeSinceToday?.data.text || '',
            ' Hrs',
            ' Mins'
          )}
        </Text>
        on coding.
      </Text>
      <Text component='h3' size='xl' fontWeight={500} sx={{ mb: 3 }}>
        Last 30 Days
      </Text>
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: { xs: 'repeat(4, auto)', md: 'repeat(2, auto)' },
          gridTemplateColumns: { xs: 'repeat(1, auto)', md: 'repeat(2, 1fr)' },
          gridAutoFlow: 'column',
          alignItems: 'flex-start',
          rowGap: 4,
          columnGap: 8
        }}
      >
        <BarChart
          title='Programming Languages'
          color='linear-gradient(90deg, var(--palette-blue-500), var(--palette-cyan-450))'
          data={
            wakatimeStats
              ? wakatimeStats.data.languages.slice(0, 5).map(language => ({
                  label: language.name,
                  score: language.percent,
                  value: language.text
                }))
              : []
          }
        />
        <BarChart
          title='Machines'
          color='linear-gradient(90deg, var(--palette-red-350), var(--palette-yellow-400))'
          data={
            wakatimeStats
              ? wakatimeStats.data.machines.slice(0, 5).map(machine => ({
                  label: machine.name,
                  score: machine.percent,
                  value: machine.text
                }))
              : []
          }
        />
        <BarChart
          title='Coding Editors'
          color='linear-gradient(90deg, var(--palette-purple-550), var(--palette-pink-350))'
          data={
            wakatimeStats
              ? wakatimeStats.data.editors.slice(0, 5).map(editor => ({
                  label: editor.name,
                  score: editor.percent,
                  value: editor.text
                }))
              : []
          }
        />
        <BarChart
          title='Operating Systems'
          color='linear-gradient(90deg, var(--palette-indigo-350), hsl(269, 100%, 78%))'
          data={
            wakatimeStats
              ? wakatimeStats.data.operating_systems.slice(0, 5).map(os => ({
                  label: os.name,
                  score: os.percent,
                  value: os.text
                }))
              : []
          }
        />
      </Box>
    </Box>
  );
};

export default MDXCodingStats;
