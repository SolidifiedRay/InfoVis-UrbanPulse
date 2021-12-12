import React from 'react';
import { Stack } from '@mui/material';
import ScatterChart from '../Chart/ScatterChart';

export default function PulseExplorer({ NYCData, SFData }) {
  return (
    <Stack direction="row">
      <ScatterChart resolution="HOUR" NYCData={NYCData} SFData={SFData} />
      <ScatterChart
        disableYAxis={true}
        resolution="DAYOFWEEK"
        NYCData={NYCData}
        SFData={SFData}
      />
      <ScatterChart
        disableYAxis={true}
        resolution="MONTH"
        NYCData={NYCData}
        SFData={SFData}
      />
    </Stack>
  );
}
