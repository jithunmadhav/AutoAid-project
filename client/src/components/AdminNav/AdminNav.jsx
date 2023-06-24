import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Slide from '@mui/material/Slide';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { useDispatch } from 'react-redux';

function AdminNav() {
  const dispatch = useDispatch()
  const navigate =useNavigate()
  const [showLinks, setShowLinks] = React.useState(false);

  const handleMenuClick = () => {
    setShowLinks(!showLinks);
  };

  const handleLogout=()=>{
    axios.get('/admin/logout').then((response)=>{
      if(!response.data.err){
        dispatch({type:'refresh'})
        navigate('/admin/login')
      }
    }).catch((error)=>{
      console.log(error);
     dispatch({type:'refresh'})
     navigate('/error')
    })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Slide
        direction="down"
        in={showLinks}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 300, exit: 100 }} // Adjust animation duration as needed
      >
        <Box sx={{ position: 'fixed', top: '70px', left: 0, right: 0, padding: '10px', backgroundColor: 'black', zIndex: 9999 }}>
          <Button color="inherit" sx={{ display: 'block', my: 1 }}>
            <Link style={{ textDecoration:'none',color:'white' }} to={'/admin/dashboard'}>DASHBOARD</Link>
          </Button>
          <Button color="inherit" sx={{ display: 'block', my: 1 }}>
            <Link style={{ textDecoration:'none',color:'white' }} to={'/admin/usermanagement'}>USER MANAGEMENT</Link>
          </Button>
          <Button color="inherit" sx={{ display: 'block', my: 1 }}>
            <Link style={{ textDecoration:'none',color:'white' }} to={'/admin/mechanicmanagement'}>MECHANICS MANAGEMENT</Link>
          </Button>
          <Button color="inherit" sx={{ display: 'block', my: 1 }}>
            <Link style={{ textDecoration:'none',color:'white' }} to={'/admin/servicemanagement'}>SERVICE MANAGEMENT</Link>
          </Button>
          <Button color="inherit" sx={{ display: 'block', my: 1 }}>
            <Link style={{ textDecoration:'none',color:'white' }} to={'/admin/paymentmanagement'}>PAYMENT MANAGEMENT</Link>
          </Button>
          <Button onClick={handleLogout} color="inherit" sx={{ display: 'block', my: 1 ,color:'white' }}>
           LOGOUT
          </Button>
        </Box>
      </Slide>
      <AppBar position="static" sx={{ backgroundColor: 'black', minHeight:'70px' }}>
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
      </AppBar>
    </Box>
  );
}

export default AdminNav;
