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
import AddressForm from './NewReservation';
import PaymentForm from './PaymentForm';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import Review from './Review';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { connect,useSelector } from "react-redux";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import {insertReservation} from '../../../../redux/actions/frontOfficeActions/ReservationActions'
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
                                                        
function NewReservationForm(props) {
    const [open, setOpen] = React.useState(false);
    const [state, setState] = useState({roomNo:props.roomNo,roomType:props.roomType,phone:"",customer:"",additionalInfo:""});
    const month = useSelector(state => state.frontOffice.selectedMonth + 1 )
    const startDay = new Date(Date.parse(month + ' ' + (props.startDay ) +' 2020'))

    const customersDb = useSelector(state => state.firestore.ordered.customer )
    const customers = customersDb ? (customersDb.map(customer => ({...customer}))) : (null)


    const [roomNo, setRoomNo] = useState(props.roomNo);
    const [roomType, RoomType] = useState(props.roomType);
    const [customer, setCustomer] = useState("");

    const [stat, setStat] = React.useState({
      openn: false,
      vertical: 'bottom',
      horizontal: 'right',
    });
    const { vertical, horizontal, openn ,error} = stat


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

        var error = null
        error = validateData___(state)
        console.log(error)
        if(error != null){
            setStat({ ...stat, openn: true,error:error });
        }
        else{
          props.insertReservation(state)
          handleClose()
        }
      }

        const validateData___  = (data) => {
        console.log(data)
        if(data.roomNo == null || data.roomNo == ""){
          return "Field title Cannot be null"
  
        }
        else if(data.customer == null || data.customer == ""){
          return "Please provide a value to the  field customer"
        }
        else if(data.date == null || data.date == ""){
          return "Field Date Cannot be null"
        }
        else if(data.type == null || data.type == ""){
          return "Field type Cannot be null"
        }
        else if(data.platform == null || data.platform == ""){
          return "Field platform Cannot be null"
        }
        else
        return null;
      }

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

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
  //console.log(state)



  //--------------------------------------------------------------------

  const feedBackToast =  (<Snackbar 
    autoHideDuration={2000}
    anchorOrigin={{ vertical, horizontal }}
    open={openn }
    key={vertical + horizontal}
    >
      <Alert severity="error">{error}</Alert>
    </Snackbar>)

  return (
<React.Fragment>
    <AddCircleIcon variant="outlined" color="secondary" onClick={handleClickOpen}/>

<Dialog
style={{background: "transparent",overflowY: "hidden"}}
open={open}
onClose={handleClose}
> 
{feedBackToast}
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout} style={{display:"flex",justifyContent: "center"}}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Reservation Details
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
              Reservation Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} style={{width:"300px"}}>
        <FormControl className={classes.formControl} style={{width:"500px"}}>
        <Select
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
            id="additionalInfo"
            name="additionalInfo"
            label="Additional detials"
            fullWidth
            autoComplete="shipping address-line1"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="roomId" name="roomId" label="Room Id" fullWidth defaultValue={roomNo}
          InputProps={{
            readOnly: true,
          }}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="day"
            name="Day"
            label="Day"
            fullWidth
            defaultValue={startDay}
          InputProps={{
            readOnly: true,
          }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="roomType"
            name="roomType"
            label="Room Type"
            fullWidth
            autoComplete="shipping country"
            defaultValue={roomType}
            InputProps={{
            readOnly: true,
          }}
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
      insertReservation: (payload) => dispatch(insertReservation(payload)),
      //deleteRoomType: (roomId) => dispatch(deleteRoomType(roomId))


  }
}

export default compose(connect(null,mapDispatchToProps),firestoreConnect([
  {collection: 'reservation'},
  {collection: 'room'},
  {collection: 'roomtype'},
  {collection: 'customer'}
]))(NewReservationForm) 