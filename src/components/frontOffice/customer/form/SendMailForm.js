import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { firestoreConnect, isLoaded, withFirebase } from 'react-redux-firebase';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { connect,useSelector } from "react-redux";
import FormControl from '@material-ui/core/FormControl';
import MuiAlert from '@material-ui/lab/Alert';
import Select from '@material-ui/core/Select';

import {sendMail} from '../../../../redux/actions/frontOfficeActions/CustomerActions'
import { compose } from "redux";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    },
    width: "87%",
    boxShadow: "0px 1px 12px black",
    height: "87",
    marginTop: "24px"
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
  MuiDialogPaperScrollPaper:{
    background: "transparent",overflowY: "hidden"

  }
}));

const steps = ['Reservation Details'];
                                                        
function SendMailForm(props,firebase) {
    const [open, setOpen] = React.useState(false);
    const [stat, setStat] = React.useState({
      openn: false,
      vertical: 'bottom',
      horizontal: 'right',
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();

            if(state.checked)
                props.sendMail(state,subscribers)
            else
                props.sendMail(state,null)

          handleClose()
      }

    const customersDb = useSelector(state => state.firestore.ordered.customers )
    const subscribersDb = useSelector(state => state.firestore.ordered.subscribers )
    const customers = customersDb ? (customersDb.map(customer => ({...customer}))) : (null)
    const subscribers = subscribersDb ? (subscribersDb.map(customer => ({...customer}))) : (null)
    const [state, setState] = useState({subject:"",message:"",customer:"",checked:false});


  

       const handleSubject = (event) => {
        setState(prevState => ({
            ...prevState,
            subject: event.target.value
        }));
        console.log(state)
       }

       const handleMessage = (event) => {
        setState(prevState => ({
            ...prevState,
            message: event.target.value
        }));
        console.log(state)
       }

       const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
        };

      const { vertical, horizontal, openn ,error} = stat
      const handleClickOpen = () => {
          setOpen(true);
        };
      const handleClose = () => {
        setOpen(false);
      };

      
  const customerSelector = customers ? (customers.map((customer,index) => {
    return  <MenuItem key={index} value={customer.id}>{customer.firstName + ' ' + customer.lastName}</MenuItem>
  })) :(null)

  const handleCustomerTypeSelector = (event) => {
   // console.log(event.target.value)
    setState(prevState => ({
      ...prevState,
      customer: event.target.value
  }));
  }

  const handleCheck = (event) =>{
    setState(prevState => ({
        ...prevState,
        checked:!prevState.checked
    }));
    console.log(state)
}

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  //--------------------------------------------------------------------


  return (
<React.Fragment>
    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Send Mail
    </Button>
<Dialog
style={{background: "transparent",overflowY: "hidden"}}
open={open}
onClose={handleClose}
> 
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout} style={{display:"flex",justifyContent: "center"}}>
        <Paper className={classes.paper}>
             <Grid container spacing={3}>
                <Grid item xs={12} sm={6} style={{width:"300px"}}>
                <FormControl className={classes.formControl} style={{width:"500px"}}>
                <Select
                data-testid="SendMailFormCustomerSelect"
                label="Customer"
                id="demo-simple-select"
                value={state.customer}
                onChange={handleCustomerTypeSelector}
                >
                {customerSelector}
                </Select>
                </FormControl>
                </Grid>

                <Grid item xs={12}>
                <TextField
                    required
                    id="subject"
                    name="subject"
                    label="Additional detials"
                    fullWidth
                    autoComplete="shipping address-line1"
                    onChange={handleChange}
                />
                </Grid>
                <Grid item xs={12} >
                <TextField id="message" name="message" label="Message" fullWidth  onChange={handleChange}

               />
                </Grid>
                
                <Grid item xs={6}>
                <FormControlLabel
                    control={<Checkbox color="secondary" name="saveAddress" checked={state.checked} onChange={handleCheck} />}
                    label="Send to all subscribed"
                />
                </Grid>
                <Grid item xs={6}>
                <Button variant="contained" color="primary" onClick={handleSubmit}  className={classes.button}>
                    Submit
                  </Button>
                </Grid>
            </Grid>
        </Paper>
      </main>
    </React.Fragment>

    </Dialog>
</React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
      sendMail: (payload,subscribers) => dispatch(sendMail(payload,subscribers)),
  }
}

export default  withFirebase(compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'customer',
    storeAs: 'customers'},
    {collection: 'customer',
    where: [['subscribed', '==', true]],
    storeAs: 'subscribers'}]))(SendMailForm))