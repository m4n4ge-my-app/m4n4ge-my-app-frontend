import {
  Box,
  Button,
  Grid,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import TextLogo from '../../logo/TextLogo';
import { Link } from 'react-router-dom';
import './landing.scss';
import Logo from '../../logo/Logo';
import Features from './Features';
import { useState } from 'react';
import { callToAction } from './callToAction';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import DataObjectIcon from '@mui/icons-material/DataObject';

const LandingGrid = () => {
  const [isInterested, setIsInterested] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container className="landingContainer">
      <Grid
        container
        item
        xs={12}
        className="navbar"
        alignItems="center"
        justifyContent="space-between"
        padding="2%"
      >
        <Grid item xs={6} sm={4} md={2} onClick={() => setIsInterested(false)}>
          <Link to="/" style={{ textDecoration: 'none', cursor: 'pointer' }}>
            <Box
              display={{ xs: 'block', sm: 'block', md: 'block', lg: 'none' }}
            >
              <Logo />
            </Box>
            <Box display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block' }}>
              <TextLogo />
            </Box>
          </Link>
        </Grid>
        <Grid item xs={6} sm={8} md={10} container justifyContent="flex-end">
          <Box pr={{ xs: 2, sm: 3 }}>
            {isSmallScreen ? (
              <Link to="/signin">
                <LoginIcon sx={{ fontSize: 30, color: '#407BFF' }} />
              </Link>
            ) : (
              <Link to="/signin">
                <Button variant="outlined" color="primary">
                  Sign In
                </Button>
              </Link>
            )}
          </Box>

          <Box pr={{ xs: 2, sm: 3 }}>
            {isSmallScreen ? (
              <Link to="/signup">
                <AppRegistrationIcon sx={{ fontSize: 30, color: '#407BFF' }} />
              </Link>
            ) : (
              <Link to="/signup">
                <Button variant="contained" color="primary">
                  Sign Up
                </Button>
              </Link>
            )}
          </Box>
        </Grid>
      </Grid>
      {!isInterested && (
        <Grid
          container
          spacing={3}
          className="bodySection"
          style={{ position: 'relative' }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: '#264a99',
                fontWeight: 'bold',
                margin: '10% 15% 5% 12%',
              }}
            >
              {callToAction.title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#6695ff',
                fontWeight: 'normal',
                marginBottom: '20px',
                margin: '0% 15% 5% 15%',
              }}
            >
              Simplify your job application process.{' '}
              <span className="keyword1">Manage</span>,{' '}
              <span className="keyword2">track</span>, and{' '}
              <span className="keyword3">automate </span>
              applications, prepare for interviews with{' '}
              <span className="keyword4">AI</span> simulations, and store
              multiple resume versions. Your data is secure and privacy is our
              priority. Stay organized and increase your chances of landing your
              dream job. Curious to know more? click below to explore our
              features.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsInterested(true)}
              sx={{ width: '200px', margin: '0% 15% 5% 15%' }}
            >
              Learn More
            </Button>
          </Grid>
          {!isSmallScreen && (
            <Grid
              item
              sm={12}
              md={6}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img
                src={callToAction.image}
                alt="Call to action"
                style={{
                  maxWidth: '550px',
                  maxHeight: '550px',
                  height: 'auto',
                  width: 'auto',
                  margin: '5% 15% 5% 15%',
                }}
              />
            </Grid>
          )}

          <a href="https://github.com/orgs/m4n4ge-my-app/repositories">
            <Tooltip title="Curious about the behind-the-scenes?">
              <Box
                pr={{ xs: 3, sm: 5, md: 6 }}
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: 0,
                  cursor: 'pointer',
                }}
              >
                <DataObjectIcon sx={{ fontSize: 30, color: '#407BFF' }} />
              </Box>
            </Tooltip>
          </a>
        </Grid>
      )}
      {isInterested && <Features />}
    </Grid>
  );
};

export default LandingGrid;
