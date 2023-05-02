import { Popover, Typography } from '@mui/material'
import React from 'react'

const CardPopover = ({id,anchorEl,handleClose, open, children}) => {
  return (
    <Popover
    id={id}
    open={open}
    anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
  >
    {children}
  </Popover>
  )
}

export default CardPopover