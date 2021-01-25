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
// import AddressForm from './NewReservation';
// import PaymentForm from './PaymentForm';
// import Review from './Review';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { connect,useSelector } from "react-redux";
import {insertOrderType} from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions'
import {FormControl,Grid, InputLabel, ListItemIcon, MenuItem,Select, Snackbar} from '@material-ui/core';
// import {insertReservation} from '../../../../redux/actions/frontOfficeActions/ReservationActions'
import { Alert, AlertTitle } from '@material-ui/lab';
import { insertBarInvRec } from "../../redux/actions/FnBServiceActions/BarInventoryAction";


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

const steps = ['Order Details'];

function InventoryForm(props) {
    const [opens, setOpens] = React.useState(false);
    const [state, setState] = useState({ BarInvNo: "", descriptions: "",date:""});
    // const month = useSelector(state => state.frontOffice.selectedMonth + 1 )
    // const startDay = new Date(Date.parse(month + ' ' + (props.startDay ) +' 2020'))

//   console.log(startDay)
//     const [roomNo, setRoomNo] = useState(props.roomNo);
//     const [roomType, RoomType] = useState(props.roomType);

// const [type, setType] = React.useState(1);

const [states, setStates] = React.useState({
  open: false,
  vertical: 'bottom',
  horizontal: 'right',
});

const [type, setType] = React.useState(1);
//const { vertical, horizontal ,error} = states;
const handleClose1 = () => {
  setStates({ ...states, open: false });
};
const { vertical, horizontal, open ,error} = states;

    const handleChange = e => {
      const { name, value } = e.target;
      setState(prevState => ({
          ...prevState,
          [name]: value
      }));
      };
      const handleChange1 = (event) => {
        setType(event.target.value);
        const { name, value } = event.target;
      setState(prevState => ({
          ...prevState,
          status: value
      }));
      };
      
  const validateData___  = (data) => {
    if(state.BarInvNo == null || state.BarInvNo == ""){
      return "Field order No Cannot be null"

    }
    else if(state.BarInvNo.length != 5 ){
      return "Field order No sould contain 5 characters"

    }
    else if(state.date == null || state.date == ""){
      return "Field date  Cannot be null"
    }
    // else if(state.status == null || state.status == ""){
    //   return "Field status Cannot be null"
    // }
    // else if(data.menuType == null || data.menuType == ""){
    //   return "Field Menu Type Cannot be null"
    // }
    else
    return null;
  }
  const feedBackToast =  (<Snackbar 
    autoHideDuration={200}
    anchorOrigin={{ vertical, horizontal }}
    open={open}
    key={vertical + horizontal}
    >
        <div >

      <Alert variant="filled" severity="error" style={{display: "flex",alignItems: "center"}}>
      <h3>{error}</h3>
      
      </Alert>
      </div>
    </Snackbar>)

      const handleClickOpen = () => {
          setOpens(true);
        };
      const handleClose = () => {
        setOpens(false);
      };
      const handleSubmit = (evt) => {
        evt.preventDefault();
        //console.log(new Date(Date.parse(' 02 ' + (state.startDay ) +' 2020')),state.startDay);
        
        // alert(state)
        new Promise((resolve,reject)=>{
          const error = validateData___(state);
          if (error != null){
            setStates({ ...states, open: true,error:error });
            reject();
          }
          else{
          setTimeout(() => {
              // alert(JSON.stringify(state));
              props.insertBarInvRec(state)
              handleClose()
              resolve();
          },1000)
        }
      }) 
      // props.insertOrderType(state)
      }

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  return (
<React.Fragment>
    {/* <AddCircleIcon variant="outlined" color="secondary" onClick={handleClickOpen}/> */}
    <Button
        variant="contained"
        color="default"
        className={classes.button}
        onClick={handleClickOpen}
        // startIcon={<AddIco />}
      >
        Add Inventory
      </Button>
<Dialog
style={{background: "transparent",overflowY: "hidden"}}
open={opens}
onClose={handleClose}
> 
{feedBackToast}
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout} style={{display:"flex",justifyContent: "center"}}>
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
        Inventory Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="BarInvNo"
            name="BarInvNo"
            label="Bar Inventory Id"
            fullWidth
            autoComplete="given-name"
            onChange={handleChange}
          />
        </Grid>
        <Grid  item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="date"
                  name="date"
                  type = 'date'
                  onChange={handleChange}
                />
            </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="descriptions"
            name="descriptions"
            label="Description"
            fullWidth
            autoComplete="shipping address-level2"
            onChange={handleChange}
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
      insertBarInvRec: (payload) => dispatch(insertBarInvRec(payload)),
      //deleteRoomType: (roomId) => dispatch(deleteRoomType(roomId))


  }
}

export default connect(null,mapDispatchToProps)(InventoryForm)