import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ListItemAvatar, ListSubheader } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import NavBarItems from './NavBarItems';

import {Link} from 'react-router-dom'
import InboxIcon from '@mui/icons-material/Inbox';

function ResponsiveDrawer({window,drawerWidth}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
        <List
            subheader={
                <ListSubheader>FEATURES</ListSubheader>
            }>

            {
                NavBarItems.map((item) => item.category === 'features' && (
                <Link to={item.link}>
                <ListItemButton key={item.id}>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                   
                        <ListItemText primary={item.text}/>
                 </ListItemButton>
                 </Link>
                ))
            }
        </List>
        <Divider/>
        {/* <List
            subheader={
                <ListSubheader>COLLECTION</ListSubheader>
            }>

            {
                NavBarItems.map((item) => item.category === 'collection' && (
                <Link to={item.link}>
                    <ListItemButton key={item.id}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text}/>
                    </ListItemButton>
                 </Link>
                ))
            }
        </List>
        <Divider/>
        <List
            subheader={
                <ListSubheader>LIBRARY</ListSubheader>
            }>

            {
                NavBarItems.map((item) => item.category === 'library' && (
                <Link to={item.link}>
                    <ListItemButton key={item.id}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text}/>
                    </ListItemButton>
                 </Link>
                ))
            }
        </List> */}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor:'transparent',
            boxShadow:0
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Responsive drawer
            </Typography>
          </Toolbar>
        </AppBar>

        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open={mobileOpen}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
    </Box>
  );
}

export default ResponsiveDrawer;
