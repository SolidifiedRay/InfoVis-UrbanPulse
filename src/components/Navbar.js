import * as React from 'react';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Navbar({ title, isTitle = false, setRes }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack direction={'row'} style={{ background: '#DEDEDE', height: '4vh' }}>
        <Typography
          component="div"
          sx={{ color: '#000000', fontWeight: 600, flexGrow: 1 }}
          variant="h7"
        >
          &nbsp; {title}
        </Typography>
        {isTitle && (
          <div sx={{ flexGrow: -1 }}>
            <RadioGroup
              row
              aria-label="gender"
              name="row-radio-buttons-group"
              defaultValue="HOUR"
            >
              <FormControlLabel
                value="HOUR"
                control={<Radio />}
                label="Hour"
                onClick={(e) => {
                  setRes(e.target.value);
                }}
              />
              <FormControlLabel
                value="DAYOFWEEK"
                control={<Radio />}
                label="Day Of Week"
                onClick={(e) => {
                  setRes(e.target.value);
                }}
              />
              <FormControlLabel
                value="MONTH"
                control={<Radio />}
                label="Month"
                onClick={(e) => {
                  setRes(e.target.value);
                }}
              />
            </RadioGroup>
          </div>
        )}
      </Stack>
    </Box>
  );
}
