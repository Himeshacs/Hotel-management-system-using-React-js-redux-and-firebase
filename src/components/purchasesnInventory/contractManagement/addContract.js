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
import { insertContractInfo } from "../../../redux/actions/PnIActions/contractHandler";
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

function AddContract(props) {


  const classes = useStyles();

  const [contract, setContract] = useState({cId:'', supplierName:'', pType:'', date:'', department:''});
  const [department, setDepartment] = React.useState("frontoffice");

 
  const handleDepartment = (event) => {
    setDepartment(event.target.value);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    new Promise((resolve, reject) => {
      const error = validateData___(contract);
      if (error != null) {
        setState({ ...state, open: true, error: error });
        reject();
      } else {
        // alert(JSON.stringify(contract))
        setTimeout(() => {
          props.insertContractInfo(contract,department);
          resolve();
        }, 1000)
      } 
    })
  }
  const handleContract = (event) => {
    const { name, value } = event.target;
    setContract(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  //-----------------------------------------VALIDATE DATA ---------------------------------------------------------------------------//
  const validateData___ = (data) => {
    if (data.cId == null || data.cId == "") {
      return "ID field Cannot be null"
    }
    else if (data.cId.length != 5) {
      return "Field ID should contain 5 characters"
    }
    else if (data.supplierName == null || data.supplierName == "") {
      return "Supplier Name Cannot be null"
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
          Add contract
        </Typography>
        <form className={classes.form} noValidate >
        <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="cId"
                label="Contract Id"
                name="cId"
                autoComplete="off"
                onChange={handleContract}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="off"
                name="supplierName"
                variant="outlined"
                required
                fullWidth
                id="supplierName"
                label="Supplier Name"
                onChange={handleContract}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="pType"
                label="Product Type"
                name="pType"
                autoComplete="off"
                onChange={handleContract} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                autoComplete="off"
                id="date"
                name="date"
                type='date'
                onChange={handleContract} />
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
                <InputLabel id="decription">Decription</InputLabel>
              <TextField
                variant="outlined"
                required
                fullWidth
                autoComplete="off"
                id="description"
                name="description"
                onChange={handleContract} />
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
            Add Contract
              </Button>
        </form>
      </div>
      {feedBackToast}
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    insertContractInfo: (payload,department) => dispatch(insertContractInfo(payload,department)),
  }
}
export default compose(connect(null, mapDispatchToProps), firestoreConnect([
  { collection: 'contract' }
]))(AddContract)

