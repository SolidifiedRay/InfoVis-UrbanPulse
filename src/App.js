import { useState } from 'react';
import { Stack, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Map from './components/Map/Map';
import PulseBeats from './components/PulseViewer/PulseBeats';
import PulseExplorer from './components/PulseViewer/PulseExplorer';

import NYCData from './data/nyc/flickr-features.json';
import SFData from './data/sf/flickr-features.json';

function App() {
  const [res, setRes] = useState('HOUR');

  return (
    <div className="App">
      <Navbar title="Urban Pulse (Reproduce)" isTitle={true} setRes={setRes} />
      <Stack direction="row" sx={{ height: '96vh' }}>
        <Stack sx={{ width: '40%' }}>
          <Box sx={{ height: '50%' }}>
            <Map
              data={NYCData}
              lat={40.7324607}
              lng={-73.9887512}
              color="orange"
            />
          </Box>
          <Box sx={{ height: '50%' }}>
            <Map data={SFData} lat={37.773972} lng={-122.431297} color="blue" />
          </Box>
        </Stack>
        <Stack sx={{ width: '60%' }}>
          <div sx={{ height: '40%' }}>
            <Navbar title="Pulse Explorer" />
            <br />
            <PulseExplorer NYCData={NYCData} SFData={SFData} />
            <br />
          </div>
          <div sx={{ height: '60%', m: 2 }}>
            <Navbar title="Pulse Beats" />
            <PulseBeats NYCData={NYCData} SFData={SFData} res={res} />
          </div>
        </Stack>
      </Stack>
    </div>
  );
}

export default App;
