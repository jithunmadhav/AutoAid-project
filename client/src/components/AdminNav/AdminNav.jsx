import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Slide from '@mui/material/Slide';
import { Link } from 'react-router-dom';

function AdminNav() {
  const [showLinks, setShowLinks] = React.useState(false);

  const handleMenuClick = () => {
    setShowLinks(!showLinks);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar  position="static" sx={{ backgroundColor: 'black',minHeight:'70px' }} >
        <Toolbar>
          <Typography variant="h6" component="div" style={{ fontFamily:'monospace' }}>
            AUTO AID
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            style={{marginRight:'30px'}}
            onClick={handleMenuClick}
            sx={{
              transition: 'transform 0.6s', // Add CSS transition for animation
              transform: showLinks ? 'rotate(45deg)' : 'none', // Rotate the icon when showLinks is true
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <Slide
          direction="down"
          in={showLinks}
          mountOnEnter
          unmountOnExit
          timeout={{ enter: 300, exit: 0 }} // Adjust animation duration as needed
        >
          <Box sx={{ padding: '10px', display: showLinks ? 'block' : 'none' }}>
            <Button color="inherit" sx={{ display: 'block', my: 1 }}>
              <Link style={{ textDecoration:'none',color:'white' }} to={'/admin/dashboard'}>DASHBOARD</Link>
            </Button>
            <Button color="inherit" sx={{ display: 'block', my: 1 }}>
              <Link style={{ textDecoration:'none',color:'white' }} to={'/admin/usermanagement'}>USER MANAGEMENT</Link>
            </Button>
            <Button color="inherit" sx={{ display: 'block', my: 1 }}>
              <Link style={{ textDecoration:'none',color:'white' }} to={'/'}>MECHANICS MANAGEMENT</Link>
            </Button>
          </Box>
        </Slide>
      </AppBar>
    </Box>
  );
}

export default AdminNav
