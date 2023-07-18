import React, { useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
function Error() {
  const [showBackdrop, setShowBackdrop] = useState(true);
  const [showErrPage, setShowErrPage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowBackdrop(false);
      setShowErrPage(true);
    }, 1500);
  }, []);
  return (
    <>
    {showBackdrop && (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )}
    
    {showErrPage && (
    <div >
      <img style={{ height:'100vh', width:'100%' }} src="https://kfg6bckb.media.zestyio.com/yalantis-interactive-404.gif" alt="404 not found" />
    </div>
  )}
  </>
  )
}

export default Error
