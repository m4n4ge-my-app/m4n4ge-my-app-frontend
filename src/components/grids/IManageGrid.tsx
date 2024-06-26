import { Grid, Typography } from '@mui/material';
import { Item } from './utils/MuiItem';

interface Props {
  formLabel: string;
  listLabel: string;
}

const IManageGrid = ({ formLabel, listLabel }: Props) => {
  return (
    <Grid container spacing={0} sx={{ padding: '25px', marginTop: '100px' }}>
      <Grid container item spacing={2.5} className="">
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h6" className="label" gutterBottom>
            {formLabel}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Item className="addBox" sx={{ border: 'none' }}>
            This is a form container
          </Item>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h6" className="label" gutterBottom>
            {listLabel}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Item className="listBox" sx={{ border: 'none' }}>
            This is a list container
          </Item>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default IManageGrid;
