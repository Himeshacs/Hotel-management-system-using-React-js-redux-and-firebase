import React from 'react';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function NewReservation() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

  return (
    <React.Fragment>
    <AddCircleIcon variant="outlined" color="primary" onClick={handleClickOpen}/>

<Dialog
fullWidth={true}
maxWidth="lg"
open={open}
onClose={handleClose}
aria-labelledby="max-width-dialog-title"
>

    </Dialog>
</React.Fragment>
  );
}