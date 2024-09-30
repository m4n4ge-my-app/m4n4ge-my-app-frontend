import {
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useState } from 'react';

const ResumesForm = () => {
  const [mode, setMode] = useState('upload');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (_event: React.MouseEvent<HTMLElement>, newMode: string) => {
    if (newMode) {
      setMode(newMode);
    }
  };

  return (
    <Grid padding={1}>
      <Grid container item sx={{ justifyContent: 'flex-end' }}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleChange} //learned that argument passing here is automatically handled by MUI
          size="small"
          aria-label="mode selection"
        >
          <ToggleButton value="upload" aria-label="upload mode">
            <FilterDramaIcon
              fontSize="small"
              sx={{ marginRight: isMobile ? '0px' : '10px' }}
            />
            {isMobile ? '' : 'Upload'}
          </ToggleButton>
          <ToggleButton value="create" aria-label="create mode">
            <EditNoteIcon
              fontSize="small"
              sx={{ marginRight: isMobile ? '0px' : '10px' }}
            />{' '}
            {isMobile ? '' : 'Create'}
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid container item>
        {mode === 'upload' && <div>Upload</div>}
        {mode === 'create' && <div>Create</div>}
      </Grid>
    </Grid>
  );
};

export default ResumesForm;