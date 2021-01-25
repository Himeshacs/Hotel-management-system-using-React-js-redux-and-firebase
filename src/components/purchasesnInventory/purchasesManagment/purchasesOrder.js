import React, {useState} from 'react';
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
import { insertPurchasesRequest } from '../../../redux/actions/PnIActions/requestHandler'
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import { insertSupplierInfo } from '../../../redux/actions/PnIActions/SupplierList';
import { useSelector } from 'react-redux';
import { Feedback } from '@material-ui/icons';
import { insertProduct } from '../../../redux/actions/PnIActions/productHandler';




function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: 100
  }
}));

function PurchasesRequest(props) {


  const classes = useStyles();

  const [request, setRequest] = useState({pId: '',pType: '', sName:'',qty: '',priority:'' ,date: ''})
  const [priority, setPriority] = React.useState("Normal");
  const [pType,setProductType] = React.useState( );
  const [sName,setSupplierName] = React.useState();
  

  const handlePriority = (event) => {
    setPriority(event.target.value);
  };

  const handleProductType = (event) => {
    setProductType(event.target.value);
  }
  const handleSupplierName = (event) => {
      setSupplierName(event.target.value);
  }

  const handleSubmit = (e) =>{ 
    e.preventDefault();
    new Promise((resolve, reject) => {
      const error = validateData___(request);
      if (error != null) {
        alert(JSON.stringify(request))
        setState({ ...state, open: true, error: error });
        reject();
      } else {
        setTimeout(() => {
          props.insertPurchasesRequest(request,pType,priority,sName);
          resolve();
        }, 1000)
      }}
    )
  }

  const handleRequest = (event) => {
    const { name, value } = event.target;
  setRequest(prevState => ({
    ...prevState,
    [name]: value
}));
  }
    
   const purchasesOrderDB = useSelector(state => state.firestore.ordered.request)
   const supplierNameDB = useSelector(state=> state.firestore.ordered.supplier)

   const data = purchasesOrderDB ? (purchasesOrderDB.map(product => ({...product}))) : (null)
   const sup = supplierNameDB ? (supplierNameDB.map(supplier => ({...supplier}))):(null)

  //  console.log(productTypeDB)


   const productTypeSelector = data ? (data.map((pType,index) => {
    return  <MenuItem key={index} value={pType.id}>{pType.pType}</MenuItem>
  })) :(null)

  const supplierNameSelector = sup ? (sup.map((sName,index) => {
      return <MenuItem key={index} value={sName.id}>{sName.firstName}</MenuItem>
  })):(null)

  //-----------------------------------------VALIDATE DATA ---------------------------------------------------------------------------//
  const validateData___= (data) => {
    if (data.pId.length != 5) {
      console.log(data.pId.length)
      return "Field ID should contain 5 characters"
    }
    else if (data.pId == null || data.pId == "") {
      console.log(data.pId)
      return "ID field Cannot be null"
    }
    else if(data.qty == 0 || data.qty < 0){
      return "Quantity shold be a postive value"
    }
    else if(data.Checkbox.check == true){
      return "Please Accept Terms and Conditions"
    }
      return null
  }

  const [state, setState] = React.useState({
    open: false,
    vertical: ' bottom',
    horizontal: 'right'
  });

  const { vertical, horizontal, open, error } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  }
 
  const feedBackToast = (<Snackbar
    autoHideDuration={20000}
    anchorOrigin={{ vertical, horizontal }}
    open={open}
    onClose={handleClose}
    key={vertical + horizontal}
  >
    <div >
      <Alert variant="filled" severity="error" style={{ display: "flex", alignItems: "center" }}>
        <h3>{error}</h3>
      </Alert>
    </div>
  </Snackbar>)

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{color:"black"}}>
          Place Your Purchases Order Here...
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="pId"
                label="Product Id"
                name="pId"
                autoComplete="off"
                onChange={handleRequest}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl varient="outlined" fullWidth>
              <InputLabel id="pType">Product Type</InputLabel>
              <Select
                labelId="Product Name"
                id="pType"
                name="pType"
                lable="Product Name"
                autoComplete="off"
                value={pType}
                onChange={handleProductType}
              >
                {productTypeSelector}
              </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl varient="outlined" fullWidth>
                <InputLabel id="sName">Supplier Name</InputLabel>
              <Select
                labelId="Supplier Name"
                id="sName"
                name="sName"
                lable="Supplier Name"
                autoComplete="off"
                value={sName}
                onChange={handleSupplierName}
              >
                {supplierNameSelector}
              </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="qty"
                label="Quantity"
                name="qty"
                type='number'
                autoComplete="off"
                onChange={handleRequest}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl varient="outlined" required fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select id="priority"
                  value={priority}
                  onChange={handlePriority}>
                  <MenuItem value={"critical"}>Critical</MenuItem>
                  <MenuItem value={"important"}>Important</MenuItem>
                  <MenuItem value={"Normal"}>Normal</MenuItem>
                  <MenuItem value={"Low"}>Low</MenuItem>
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
                onChange={handleRequest}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="check" name="check" color="primary" />}
                label="I accept the Terms and Conditions"
              />
            </Grid>
          </Grid>
          {feedBackToast}
          <Button
            type="submit"
            id="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Request Now
              </Button>
        </form>
      </div>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    insertProduct: (payload,sName,pType,priority) => dispatch(insertProduct(payload,sName,pType,priority)),
  }
}
export default compose(connect(null, mapDispatchToProps), firestoreConnect([
  {collection: 'productMng'},
  {collection: 'request'},
  {collection: 'supplier'}
]))(PurchasesRequest)

