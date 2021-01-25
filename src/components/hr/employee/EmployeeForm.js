import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from "react-redux";

import {insertEmployee} from '../../../../src/redux/actions/hrActions/EmployeeActions'


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Employee Details'];

function EmployeeForm(props) {
    const [open, setOpen] = React.useState(false);
    const [state, setState] = useState({ id:props.id, name:props.name,emptype:props.emptype,department:props.department,designation:props.designation,joineddate:props.joineddate,contactnumber:props.contactnumber,reportsto:props.reportsto,dob:props.dob});

    const [id, setid] = useState(props.id);
    const [name, setname] = useState(props.name);
    const [emptype, setemptype] = useState(props.emptype);
    const [department, setdepartment] = useState(props.department);
    const [designation, setdesignation] = useState(props.designation);
    const [joineddate, setjoineddate] = useState(props.joineddate);
    const [contactnumber, setcontactnumber] = useState(props.contactnumber);
    const [reportsto, setreportsto] = useState(props.reportsto);
    const [dob, setdob] = useState(props.dob);
    



    const handleChange = e => {
      const { name, value } = e.target;
      setState(prevState => ({
          ...prevState,
          [name]: value
      }));
      };

      const handleClickOpen = () => {
          setOpen(true);
        };
      const handleClose = () => {
        setOpen(false);
      };
      const handleSubmit = (evt) => {
        evt.preventDefault();
        //console.log(new Date(Date.parse(' 02 ' + (state.startDay ) +' 2020')),state.startDay);
        
        //alert(state)
        props.insertReservation(state)
      }

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  return (
<React.Fragment>
    <AddCircleIcon variant="outlined" color="secondary" onClick={handleClickOpen}/>

<Dialog
fullWidth={true}
maxWidth="lg"
open={open}
onClose={handleClose}
aria-labelledby="max-width-dialog-title"
> 
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper className={classes.stepper}>
              <Step key="label">
                <StepLabel>label</StepLabel>
              </Step>
          </Stepper>
          <React.Fragment>
            { (
              <React.Fragment>
              <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="id"
            name="id"
            label="ID"
            fullWidth
            autoComplete="given-name"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="name"
            fullWidth
            autoComplete="family-name"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="emptype"
            name="emptype"
            label="Employee Type"
            fullWidth
            autoComplete="shipping address-line1"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="department"
            name="department"
            label="Department"
            fullWidth
            autoComplete="shipping address-line2"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="designation"
            name="designation"
            label="Designation"
            fullWidth
            autoComplete="shipping address-level2"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="dob" name="dob" label="Date Of Birth" fullWidth defaultValue={dob}
          InputProps={{
            readOnly: true,
          }}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="joineddate"
            name="joineddate"
            label="Joined Date"
            fullWidth
            defaultValue={joineddate}
          InputProps={{
            readOnly: true,
          }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="contactnumber"
            name="contactnumber"
            label="Contactnumber"
            fullWidth
            autoComplete="shipping country"
            defaultValue={contactnumber}
            InputProps={{
            readOnly: true,
          }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>

    </React.Fragment>                <div className={classes.buttons}>
                  <Button variant="contained" color="primary" onClick={handleSubmit}  className={classes.button}>
                    Submit
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
    </Dialog>
</React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
      //updateRoomType: (payload) => dispatch(updateRoomType(payload)),
      insertEmployee: (payload) => dispatch(insertEmployee(payload)),
      //deleteRoomType: (roomId) => dispatch(deleteRoomType(roomId))


  }
}

export default connect(null,mapDispatchToProps)(EmployeeForm) 