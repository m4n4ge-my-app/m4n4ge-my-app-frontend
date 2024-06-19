import { Grid, Typography } from '@mui/material';
import AnalogClock from 'analog-clock-react';
import moment from 'moment';

const MotivationBar = () => {
  const today = moment();
  const dayOfWeek = today.format('dddd');
  const restOfDate = today.format('MMMM D, YYYY');
  const options = {
    useCustomTime: false,
    width: '150px',
    border: false,
    borderColor: '#ffffff',
    baseColor: '#ffffff',
    centerColor: '#ffffff',
    centerBorderColor: '#40ff64',
    handColors: {
      second: '#407bff',
      minute: '#ff40da',
      hour: '#ffc440',
    },
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={4}>
        <Typography variant="h4">{dayOfWeek}</Typography>
        <Typography variant="h6">{restOfDate}</Typography>
        <AnalogClock {...options} />
      </Grid>
      <Grid item xs={12} sm={8}>
        {/* Content for the right column */}
        <div>Right Column</div>
      </Grid>
    </Grid>
  );
};

export default MotivationBar;