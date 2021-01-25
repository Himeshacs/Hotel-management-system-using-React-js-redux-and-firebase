import React from 'react'
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import MenuBookIcon from '@material-ui/icons/MenuBook';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    outerDiv:{
        display: "flex",
    justifyContent: "space-around"
    }, margin: {
        margin: theme.spacing(1),
      },
  }));



function CustomerCard(props){

    const customers = useSelector(state => state.firestore.ordered.customer)  
    const data = customers ? (customers.map(customer => ({...customer}))) : (null)
    const {customerId} = props 
    const classes = useStyles();
    const filteredCustomer = data.filter(customer => customer.id == customerId);

    const customerCard = filteredCustomer ? (
                <div style={{ display: "flex",justifyContent: "center"}}>
                <Paper elevation={3} style={{width: "40%"}}>
                <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end" >
                    <Grid item >
                        <AccountCircle />
                    </Grid>
                    <Grid item style={{width:"88%"}}>
                        <TextField  label="First Name" value={filteredCustomer[0].firstName} disabled fullWidth/>
                    </Grid>
                    </Grid>
                </div>
                <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end" >
                    <Grid item >
                        <AccountCircle />
                    </Grid>
                    <Grid item style={{width:"88%"}}>
                        <TextField value={filteredCustomer[0].lastName} label="Last Name" disabled fullWidth/>
                    </Grid>
                    </Grid>
                </div>
                <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end" >
                    <Grid item >
                        <AccountCircle />
                    </Grid>
                    <Grid item style={{width:"88%"}}>
                        <TextField value={filteredCustomer[0].email} label="Email" disabled fullWidth/>
                    </Grid>
                    </Grid>
                </div>
                <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end" >
                    <Grid item >
                        <AccountCircle />
                    </Grid>
                    <Grid item style={{width:"88%"}}>
                        <TextField label="Phone" value={filteredCustomer[0].phone} disabled fullWidth/>
                    </Grid>
                    </Grid>
                </div>
                </Paper>
                
                </div>
       
    ) : (<div>loading</div>)

        return(
            <div style={{padding:"20px"}}>          {customerCard}
        </div>
  
        )
}
export default firestoreConnect([
    {collection: 'customer'}    
  ])(CustomerCard)