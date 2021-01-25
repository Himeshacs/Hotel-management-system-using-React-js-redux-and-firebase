import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { InputLabel, Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { useForm, Controller } from 'react-hook-form';
import { insertSupplierInfo } from "../../../redux/actions/PnIActions/SupplierList";
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import { SettingsRemoteSharp } from '@material-ui/icons';
import { keys } from '@material-ui/core/styles/createBreakpoints';




function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright ©'}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: 100
  }
}));

function AddSuppliers(props) {


  const classes = useStyles();

  const [supplier, setSupplier] = useState({sId: '', firstName: '', lastName: '', email: '', itemtype: '', unitprice: '', phone: '', location: '' , department: '', date:''});
  const [location, setLocation] = React.useState("Kilinochchi");
  const [department, setDepartment] = React.useState("frontoffice");

  const handleLocation = (event) => {
    setLocation(event.target.value);
  }
  const handleDepartment = (event) => {
    setDepartment(event.target.value);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    new Promise((resolve, reject) => {
      const error = validateData___(supplier);
      if (error != null) {
        setState({ ...state, open: true, error: error });
        reject();
      } else {
        // alert(JSON.stringify(supplier))
        setTimeout(() => {
          props.insertSupplierInfo(supplier,location,department);
          resolve();
        }, 1000)
      } 
    })
  }
  const handleSupplier = (event) => {
    const { name, value } = event.target;
    setSupplier(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  //-----------------------------------------VALIDATE DATA ---------------------------------------------------------------------------//
  const validateData___ = (data) => {
    if (data.sId == null || data.sId == "") {
      return "ID field Cannot be null"
    }
    else if (data.sId.length != 5) {
      return "Field ID should contain 5 characters"
    }
    else if (data.firstName == null || data.firstName == "") {
      return "First Name Cannot be null"
    }
    else if (data.lastName == null || data.lastName == "") {
      return "Last Name cannot be  null"
    }
    else if (data.email == null || data.email == "") {
      return "Email field cannot be null"
    }
    else if(data.chkBox == false){
      return "Please accept tearms and conditions"
    }
    else
      return null
  }

  const [state, setState] = React.useState({
    open: false,
    vertical: ' bottom',
    horizontal: 'right',
  });

  const { vertical, horizontal, open, error } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  }

  const feedBackToast = (<Snackbar
    autoHideDuration={200000}
    anchorOrigin={{ vertical, horizontal }}
    open={open}
    onClose={handleClose}
    key={vertical + horizontal}
    style={{justifyContent: "flex-end",marginTop: "568px"}}
  >
    <div >
      <Alert variant="filled" severity="error" style={{ display: "flex", alignItems: "center" }}>
        <h3>{error}</h3>
      </Alert>
    </div>
  </Snackbar>)
  
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{color:"black"}}>
          Add Supplier
        </Typography>
        <form className={classes.form} noValidate >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="sId"
                label="Supplier Id"
                name="sId"
                autoComplete="off"
                onChange={handleSupplier}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="off"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={handleSupplier}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="off"
                onChange={handleSupplier} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                onChange={handleSupplier} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                autoComplete="off"
                id="itemtype"
                label="Item Type"
                name="itemtype"
                validators={['reqired']}
                onChange={handleSupplier} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="unitprice"
                autoComplete="off"
                label="Unit Price"
                name="unitprice"
                validators={['reqired']}
                onChange={handleSupplier} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="phone"
                id="phone"
                varient="outlined"
                autoComplete="off"
                required
                fullWidth
                label="Phone Number"
                onChange={handleSupplier} />
            </Grid>
            <Grid item xs={12}>
              <FormControl varient="outlined" required fullWidth>
                <InputLabel>Location</InputLabel>
                <Select id="location"
                  labelId="location"
                  value={location}
                  name= "location"
                  onChange={handleLocation}>
                  <MenuItem value = "" disabled></MenuItem>
                  <MenuItem key={1} value={"Kilinochchi"}>Kilinochchi</MenuItem>
                  <MenuItem key={2} value={"Jaffna"}>Jaffna</MenuItem>
                  <MenuItem key={3} value={"Mannar"}>Mannar</MenuItem>
                  <MenuItem key={4} value={"Mullaitivu"}>Mullaitivu</MenuItem>
                  <MenuItem key={5} value={"Vavuniya"}>Vavuniya</MenuItem>
                  <MenuItem key={6} value={"Puttalam"}>Puttalam</MenuItem>
                  <MenuItem key={7} value={"Kurunegala"}>Kurunegala</MenuItem>
                  <MenuItem key={8} value={"Gampaha"}>Gampaha</MenuItem>
                  <MenuItem key={9} value={"Colombo"}>Colombo</MenuItem>
                  <MenuItem key={10} value={"Kalutara"}>Kalutara</MenuItem>
                  <MenuItem key={11} value={"Anuradhapura"}>Anuradhapura</MenuItem>
                  <MenuItem key={12} value={"Polonnaruwa"}>Polonnaruwa</MenuItem>
                  <MenuItem key={13} value={"Matale"}>Matale</MenuItem>
                  <MenuItem key={14} value={"Kandy"}>Kandy</MenuItem>
                  <MenuItem key={15} value={"NuwaraEliya"}>Nuwara Eliya</MenuItem>
                  <MenuItem key={16} value={"Kegalle"}>Kegalle</MenuItem>
                  <MenuItem key={17} value={"Ratnapura"}>Ratnapura</MenuItem>
                  <MenuItem key={18} value={"Trincomalee"}>Trincomalee</MenuItem>
                  <MenuItem key={19} value={"Batticaloa"}>Batticaloa</MenuItem>
                  <MenuItem key={20} value={"Ampara"}>Ampara</MenuItem>
                  <MenuItem key={21} value={"Badulla"}>Badulla</MenuItem>
                  <MenuItem key={22} value={"Monaragala"}>Monaragala</MenuItem>
                  <MenuItem key={23} value={'Hambantota'}>Hambantota</MenuItem>
                  <MenuItem key={24} value={"Matara"}>Matara</MenuItem>
                  <MenuItem key={25} value={"Galle"}>Galle</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl varient="outlined" required fullWidth>
                <InputLabel>Department</InputLabel>
                <Select id="department"
                  value={department}
                  onChange={handleDepartment}>
                  <MenuItem key={26} value={"frontoffice"}>Front Office</MenuItem>
                  <MenuItem key={27} value={"foodnbeverages"}>Food and Beverages</MenuItem>
                  <MenuItem key={28} value={"housekeeping"}>House Keeping</MenuItem>
                  <MenuItem key={29} value={"finance"}>Finance</MenuItem>
                  <MenuItem key={30} value={"hr"}>HR</MenuItem>
                </Select>
              </FormControl>
            </Grid>   
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="date"
                name="date"
                type='date'
                onChange={handleSupplier} />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" id = "chkBox" />}
                label="I accept the Terms and Conditions"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            id="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Add Supplier
              </Button>
              
        </form>
        {feedBackToast}
      </div>

    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    insertSupplierInfo: (payload,location,department) => dispatch(insertSupplierInfo(payload,location,department)),
  }
}
export default compose(connect(null, mapDispatchToProps), firestoreConnect([
  { collection: 'supplier' }
]))(AddSuppliers)

