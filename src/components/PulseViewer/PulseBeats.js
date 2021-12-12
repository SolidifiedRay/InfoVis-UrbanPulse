import { useState } from 'react';
import { Stack, Box } from '@mui/material';
import Beat from './Beat';

import RankButton from './RankButton';

export default function PulseBeats({ NYCData, SFData, res }) {
  const defaultHourBeats = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  const [hourBeats, setHourBeats] = useState(defaultHourBeats);
  const defaultWeekBeats = [0, 0, 0, 0, 0, 0, 0];
  const [weekBeats, setWeekBeats] = useState(defaultWeekBeats);
  const defaultMonthBeats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const [monthBeats, setMonthBeats] = useState(defaultMonthBeats);

  const nycData = NYCData.features;
  const sfData = SFData.features;
  const data = [...nycData, ...sfData].sort((p1, p2) => p2.rank - p1.rank);

  const getBeatTypes = (p, res) => {
    let beats = [];
    const maxTime = p.resolutions[res].maxTime;
    const sigMaxTime = p.resolutions[res].sigMaxTime;
    for (var i = 0; i < maxTime.length; i++) {
      var b = maxTime[i] + sigMaxTime[i];
      beats.push(b);
    }
    return beats;
  };

  const filterBeats = (fbeats, cbeats) => {
    let filter = false;
    for (let i = 0; i < fbeats.length; i++) {
      if (fbeats[i] > cbeats[i]) {
        filter = true;
        return filter;
      }
    }
    return filter;
  };

  return (
    <div style={{ maxWidth: '100%' }}>
      <Stack direction="row" sx={{ ml: 2, mr: 2 }}>
        {res === 'HOUR' &&
          defaultHourBeats.map((h, index) => (
            <Stack sx={{ width: '100%' }} key={index}>
              <Box display="flex" alignItems="center" justifyContent="center">
                {index + 1}
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center">
                <RankButton
                  index={index}
                  beats={hourBeats}
                  setBeats={setHourBeats}
                />
              </Box>
            </Stack>
          ))}
        {res === 'DAYOFWEEK' &&
          defaultWeekBeats.map((h, index) => (
            <Stack sx={{ width: '100%' }} key={index}>
              <Box display="flex" alignItems="center" justifyContent="center">
                {index + 1}
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center">
                <RankButton
                  index={index}
                  beats={weekBeats}
                  setBeats={setWeekBeats}
                />
              </Box>
            </Stack>
          ))}

        {res === 'MONTH' &&
          defaultMonthBeats.map((h, index) => (
            <Stack sx={{ width: '100%' }} key={index}>
              <Box display="flex" alignItems="center" justifyContent="center">
                {index + 1}
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center">
                <RankButton
                  index={index}
                  beats={monthBeats}
                  setBeats={setMonthBeats}
                />
              </Box>
            </Stack>
          ))}
      </Stack>
      <div style={{ maxHeight: '53vh', overflowY: 'scroll' }}>
        {data.map((p, index) => {
          let result = <div key={p.rank}></div>;
          const currentBeats = getBeatTypes(p, res);
          const resBeats =
            res === 'HOUR'
              ? hourBeats
              : res === 'DAYOFWEEK'
              ? weekBeats
              : monthBeats;
          const defaultBeats =
            res === 'HOUR'
              ? defaultHourBeats
              : res === 'DAYOFWEEK'
              ? defaultWeekBeats
              : defaultMonthBeats;

          if (JSON.stringify(resBeats) === JSON.stringify(defaultBeats)) {
            result = (
              <Beat
                key={p.latLng}
                lat={p.latLng[0][0]}
                lng={p.latLng[0][1]}
                beats={currentBeats}
                scalarData={p.resolutions[res].scalars}
                res={res}
              />
            );
          } else if (!filterBeats(resBeats, currentBeats)) {
            result = (
              <Beat
                key={p.latLng}
                lat={p.latLng[0][0]}
                lng={p.latLng[0][1]}
                beats={currentBeats}
                scalarData={p.resolutions[res].scalars}
                res={res}
              />
            );
          }
          return result;
        })}
      </div>
    </div>
  );
}
