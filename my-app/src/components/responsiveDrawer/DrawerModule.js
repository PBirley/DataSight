import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { drawerWidth } from '../Navigator';
import DrawerElement from './DrawerElement';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


export default function DrawerModule({dashViewer, handleDrawerClose, handleStreamSelect, open, theme}) {
  return (
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <DrawerElement  key={'Home'} text={'Home'} open={open} 
            handleStreamSelect={handleStreamSelect} icon={<HomeIcon />}/>
        </List>
        <Divider />
        <List>
          {dashViewer.streams.map((stream, index) => (
            <DrawerElement  key={stream.name}  text={stream.name} open={open} 
            handleStreamSelect={handleStreamSelect} icon={<CenterFocusWeakIcon />}/>
          ))}
          <DrawerElement text={'Add new stream'} open={open} icon={<AddIcon />}/>
        </List>
        <Divider />
        <List>
          {dashViewer.reports.map((report, index) => (
            <DrawerElement  key={report.name}  text={report.name} open={open} 
            handleStreamSelect={handleStreamSelect} icon={<AssessmentIcon />}/>
          ))}
        </List>
      </Drawer>
  )
}

