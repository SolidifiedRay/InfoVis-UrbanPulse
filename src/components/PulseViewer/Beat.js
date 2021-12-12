import React from 'react';
import LineChart from '../Chart/LineChart';
import { Stack, Box, Typography } from '@mui/material';

import RankButton from './RankButton';

export default function Beat({ lat, lng, beats, scalarData, res }) {
  const lineColor = lat > 40 ? 'orange' : 'blue';
  const city = lat > 40 ? 'NYC' : 'SF';

  return (
    <div>
      <Typography component="div" variant="h8">
        {`${city} [${lat}, ${lng}] `}
      </Typography>
      <LineChart scalarData={scalarData} lineColor={lineColor} res={res} />
      <Stack direction="row" sx={{ ml: 2 }}>
        {beats.map((b, i) => (
          <Stack sx={{ width: '100%' }} key={i}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <RankButton disable={true} color={b} />
            </Box>
          </Stack>
        ))}
      </Stack>
    </div>
  );
}
