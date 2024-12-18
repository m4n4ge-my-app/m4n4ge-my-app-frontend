import { RHFTextField } from '../formControllers/RHFTextField';
import { Link } from 'react-router-dom';
import Facebook from './images/facebook.png';
import Google from './images/google.png';
import GitHub from './images/github.png';
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { SigninSchema } from '../schemas/signinSchema';
import { useSignin } from '../../../hooks/useSignin';

const SignInForm = () => {
  const theme = useTheme();
  const userPassword = import.meta.env.VITE_DEMO_USER_EXPERT_PASSWORD as string;
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { handleSubmit } = useFormContext<SigninSchema>();
  const { signin, isLoading } = useSignin();

  const onsubmit = async (data: SigninSchema) => await signin(data);

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <Card>
        {/* Box container is to give responsive padding for various sizes */}
        <Box sx={{ p: { xs: 3, sm: 3, md: 4, xl: 5 } }}>
          {/* Grid is for giving spaces between rows and full widths within the grid container */}
          <Grid container spacing={3}>
            {/* Top area */}
            <Grid item xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
                sx={{ mb: { xs: -0.5, sm: 0.5 } }}
              >
                <Typography variant="h5">Sign In</Typography>
                <Typography
                  component={Link}
                  to="/signup"
                  variant="body2"
                  sx={{ textDecoration: 'none' }}
                  color="primary"
                >
                  {"Don't have an account?"}
                </Typography>
              </Stack>
            </Grid>

            {/* Form area */}
            <Grid item xs={12}>
              {/* Stack group for email/password login option */}
              <Stack spacing={2}>
                {/* Email Input */}
                <RHFTextField<SigninSchema>
                  name="email"
                  label="Email"
                  size="small"
                />
                {/* Password Input */}
                <RHFTextField<SigninSchema>
                  name="password"
                  label="Password"
                  type="password"
                  size="small"
                />
                {/* Forgot password link */}
                <Box display="flex" justifyContent="flex-end">
                  <Typography
                    component={Link}
                    to="/forgotpassword"
                    variant="body2"
                    sx={{ textDecoration: 'none' }}
                    color="primary"
                  >
                    Forgot password?
                  </Typography>
                </Box>

                {/* Signin button */}
                <Button
                  fullWidth
                  size="medium"
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={Boolean(isLoading)}
                  sx={{
                    '&:focus': {
                      outline: 'none',
                    },
                  }}
                >
                  Sign In
                </Button>

                {/* Guest signin option */}
                <Button
                  fullWidth
                  size="medium"
                  variant="contained"
                  color="primary"
                  disabled={Boolean(isLoading)}
                  onClick={() =>
                    signin({
                      email: 'expert_user@m4n4gemy.app',
                      password: userPassword,
                    })
                  }
                  sx={{
                    '&:focus': {
                      outline: 'none',
                    },
                  }}
                >
                  Continue as guest
                </Button>
              </Stack>

              {/*  Divider separating login methods */}
              <Divider sx={{ margin: '20px' }}>
                <Typography variant="caption">Sign in with</Typography>
              </Divider>

              {/* Stack group for ouath login */}
              <Stack
                direction="row"
                spacing={{ xs: 1, sm: 2 }}
                justifyContent="space-around"
                sx={{
                  '& .MuiButton-startIcon': {
                    mr: { xs: 0, sm: 1 },
                    ml: { xs: 0, sm: -0.5 },
                  },
                }}
              >
                <Tooltip title="Implementation coming soon">
                  <Button
                    variant="text"
                    startIcon={
                      <img
                        src={Google}
                        alt="Google"
                        style={{ width: '20px', height: '20px' }}
                      />
                    }
                    sx={{
                      '&:focus': {
                        outline: 'none',
                      },
                    }}
                    // href={baseUrl + '/api/auth/google'}
                  >
                    {!isSmallScreen ? 'Google' : ''}
                  </Button>
                </Tooltip>
                <Tooltip title="Implementation coming soon">
                  <Button
                    variant="text"
                    startIcon={
                      <img
                        src={GitHub}
                        alt="GitHub"
                        style={{ width: '20px', height: '20px' }}
                      />
                    }
                    sx={{
                      '&:focus': {
                        outline: 'none',
                      },
                    }}
                  >
                    {!isSmallScreen ? 'GitHub' : ''}
                  </Button>
                </Tooltip>
                <Tooltip title="Implementation coming soon">
                  <Button
                    variant="text"
                    startIcon={
                      <img
                        src={Facebook}
                        alt="Facebook"
                        style={{ width: '20px', height: '20px' }}
                      />
                    }
                    sx={{
                      '&:focus': {
                        outline: 'none',
                      },
                    }}
                  >
                    {!isSmallScreen ? 'Facebook' : ''}
                  </Button>
                </Tooltip>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </form>
  );
};

export default SignInForm;
