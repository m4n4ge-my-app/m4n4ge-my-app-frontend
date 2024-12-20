//external imports
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Badge, Fab, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';

//local imports
import { setFocusedApplication } from '../../state/application/applicationSlice';
import { notifications as _notification } from '../notification/notifications';
import NotificationMenu from '../notification/NotificationMenu';
import coverLetter from './baseLayerImages/coverletter.png';
import description from './baseLayerImages/description.png';
import dashboard from './baseLayerImages/dashboard.png';
import interview from './baseLayerImages/interview.png';
import settings from './baseLayerImages/settings.png';
import calendar from './baseLayerImages/calendar.png';
import archive from './baseLayerImages/archive.png';
import profile from './baseLayerImages/profile.png';
import todos from './baseLayerImages/todolist.png';
import resume from './baseLayerImages/resume.png';
import search from './baseLayerImages/search.png';
import assist from './baseLayerImages/assist.png';
import { RootState } from '../../state/store';
import add from './baseLayerImages/add.png';
import theme from '../../theme';
import './baselayer.scss';

interface Props {
  type: string;
  children: React.ReactNode;
}

const BaseLayer = ({ type, children }: Props) => {
  const user = useSelector((state: RootState) => state.user);
  const [lightMode, setLightMode] = React.useState(false);
  const [notifications, setNotifications] = useState<null | any>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // Dynamically set the CSS variable
    switch (type) {
      case 'add':
        document.documentElement.style.setProperty(
          '--background-image-url',
          `url(${add})`
        );
        break;
      case 'dashboard':
        document.documentElement.style.setProperty(
          '--background-image-url',
          `url(${dashboard})`
        );
        break;
      case 'resume':
        document.documentElement.style.setProperty(
          '--background-image-url',
          `url(${resume})`
        );
        break;
      case 'coverLetter':
        document.documentElement.style.setProperty(
          '--background-image-url',
          `url(${coverLetter})`
        );
        break;
      case 'jobDescriptions':
        document.documentElement.style.setProperty(
          '--background-image-url',
          `url(${description})`
        );
        break;
      case 'calendar':
        document.documentElement.style.setProperty(
          '--background-image-url',
          `url(${calendar})`
        );
        break;
      case 'todos':
        document.documentElement.style.setProperty(
          '--background-image-url',
          `url(${todos})`
        );
        break;
      case 'search':
        document.documentElement.style.setProperty(
          '--background-image-url',
          `url(${search})`
        );
        break;
      case 'assist':
        document.documentElement.style.setProperty(
          '--background-image-url',
          `url(${assist})`
        );
        break;
      case 'interview':
        document.documentElement.style.setProperty(
          '--background-image-url',
          `url(${interview})`
        );
        break;
      case 'archive':
        document.documentElement.style.setProperty(
          '--background-image-url',
          `url(${archive})`
        );
        break;
      case 'profile':
        document.documentElement.style.setProperty(
          '--background-image-url',
          `url(${profile})`
        );
        break;
      case 'settings':
        document.documentElement.style.setProperty(
          '--background-image-url',
          `url(${settings})`
        );
        break;
      default:
        document.documentElement.style.setProperty(
          '--background-image-url',
          `url(${resume})`
        );
        break;
    }
  }, [type]);

  useEffect(() => {
    //below is random notifications numbers showing for expert user. TODO: replace these with actual parameters when these features are developed
    if (user.user?.email === 'expert_user@m4n4gemy.app') {
      setNotifications(_notification);
    } else {
      setNotifications(null);
    }
  }, [user]);

  const clearForms = () => {
    dispatch(setFocusedApplication(null));
  };

  return (
    <div className="pageContainer">
      <div className="left">{children}</div>
      <div className="right">
        <div className="iconsGroup">
          <Link to="/add" onClick={clearForms}>
            <Tooltip title="Add application record" placement="left">
              <Fab
                size="small"
                color="primary"
                aria-label="add"
                sx={{ marginBottom: '20px' }}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </Link>
          <Badge
            badgeContent={notifications ? notifications.length : null}
            color="primary"
            overlap="circular"
            onClick={handleNotificationClick}
          >
            <NotificationsNoneIcon
              sx={{ fontSize: '25px', color: theme.palette.primary.main }}
            />
          </Badge>
          <NotificationMenu
            open={open}
            handleClose={handleNotificationClose}
            anchorEl={anchorEl}
            notifications={notifications}
            user={user}
          />
          <Link to="/automated">
            <SmartToyOutlinedIcon
              sx={{ fontSize: '25px', color: theme.palette.primary.main }}
            />
          </Link>
          <Link to="/settings">
            <SettingsOutlinedIcon
              sx={{ fontSize: '25px', color: theme.palette.primary.main }}
            />
          </Link>
          <IconButton
            onClick={() => setLightMode(!lightMode)}
            sx={{ '&:focus': { outline: 'none' } }}
          >
            {lightMode === true ? (
              <LightModeOutlined
                sx={{ fontSize: '25px', color: theme.palette.primary.main }}
              />
            ) : (
              <DarkModeOutlined
                sx={{ fontSize: '25px', color: theme.palette.primary.main }}
              />
            )}
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default BaseLayer;
