import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import EventIcon from '@material-ui/icons/Event';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Skeleton from '@material-ui/lab/Skeleton';
import Backdrop from '@material-ui/core/Backdrop';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';


import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import Autocomplete from '@material-ui/lab/Autocomplete';


import ReservationCard from './utill/ReservationCard'
import EmptyReservationCard from './utill/EmptyReservationCard';
import {handleMonthPickReservation,handleCustomerPick,handleReservationTypePick,handleNumberOfPacks} from '../../../redux/actions/frontOfficeActions/FrontOfficeNavActions'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflowY:"auto",
    height: "704px"
  },
  paper: {
    height: 250,
    width: 200,
  },
  control: {
    padding: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function  ReservatonBoxView (props)  {
 
  const { useState } = React;
  const [spacing, setSpacing] = React.useState(2);
  const [radio, setRadio] = React.useState(false);
  const [month, setMonth] = useState(8);
  const [roomType, setRoomType] = React.useState('EXKINGSUITE');
  const [open, setOpen] = React.useState(false);


  const reservationsDb = useSelector(state => state.firestore.ordered.reservation )
  const roomsDb = useSelector(state => state.firestore.ordered.room )
  const roomTypeDb = useSelector(state => state.firestore.ordered.roomtype )
  const state = useSelector(state => state.frontOffice )
  const customersDb = useSelector(state => state.firestore.ordered.customer )
  const customers = customersDb ? (customersDb.map(customer => ({...customer}))) : (null)


  
  let rooms = null;
  let reservations= null;
  let numberOfRooms= null;
  if(reservationsDb && roomsDb){
    //roomtype ? is not needed since initialized
  reservations = roomType ? (reservationsDb.filter(reservation => reservation.roomType == roomType)) : (reservation => reservation.roomType == 'EXKINGSUITE')
  rooms = roomType ? (roomsDb.filter(room => room.roomType == roomType)) : (room => room.roomType == roomType)
  numberOfRooms = rooms.length;
  }



  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleMonthPick = (e) => {
    const mo = new Date(e.target.value);
    const month = mo.getMonth();
    props.handleMonthPickReservation(month + 1)

    setMonth(month + 1);
  };

  const handleRadioChange = (event) => {
    console.log(event.target.value)
    if(radio == false)
    setRadio(true);
    else
    setRadio(false);

  };

  const handleCustomerTypeSelector = (event) => {
    props.handleCustomerPick(event.target.value);
  }

  const handleReservationTypeSelector = (event) => {
      props.handleReservationTypePick(event.target.value);

  }

  const handleNumberOfPacks = (event) => {
    props.handleNumberOfPacks(event.target.value);
    console.log(event.target.value)

}

//--------------------------------Logic behind populating view---------------------------------------------------------------------
  var box = [ ];
  for(var i = 1; i < 32; ++i) {
    box[i] = [ ];
      for(var j = 0; j < numberOfRooms ; ++j) {
        box[i][j] = i+j; 
      }
  }

  var getDaysArray = function(start, end) {
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
  
      arr.push(new Date(dt));
    }
    return arr;
  };



  if(reservations != null){
    for(var reservation = 0 ; reservation < reservations.length ; reservation++){
      for(var room = 0 ; room < numberOfRooms ; room++){
        const reservedDays = getDaysArray(reservations[reservation].startDay.toDate(),reservations[reservation].endDay.toDate());
        if(room == reservations[reservation].roomNo ){
          for(var dayOfBooking of reservedDays){
            //add a if condition here to check if dayOfBooking.getMonth is = to the above selected month
            if(dayOfBooking.getMonth() == month -1)
              box[dayOfBooking.getDate()][room]= reservations[reservation] 

          }
        }
      }
    }


  }

  //----------------------------------------------------------Ui ELEMSNTS--------------------------------------------------------
  
  const rows = box.map((row,rIndex) => {
    const paper = row.map((element,eIndex) => {
      return(
        <Grid key={eIndex} item style={{padding:"12px 0px"}}>
          {element.id ? (
            <ReservationCard reservation={element}/>
          ) : (<EmptyReservationCard  month={month} roomType={roomType} roomNo={eIndex} startDay={rIndex}/>)}
        </Grid>      
      )})

    return(

      <Grid container justify="space-around" key={rIndex}  spacing={3}  style={{background:rIndex%2 == 0 ? "#000000b0" : "white" ,    width: "100%",margin:"0px"}}>
        <div style={{display: "flex",
                      flexDirection: "row",
                      alignItems: "center"
                      }}>
          
          {rIndex%2 == 0 ? <EventIcon style={{fill:"white"}}/> : <EventIcon style={{fill:"black"}}/>}
          {rIndex%2 == 0 ?  <h2 style={{color:"white",marginBottom:"0px"}}>{rIndex } </h2> :  <h2 style={{color:"black",marginBottom:"0px"}}>{rIndex } </h2>}
        </div>
        {paper}
      </Grid>
    )

  })
//-----------------------------------Selectors---------------------------------------------------------------------------
  const roomTypeSelector = roomTypeDb ? (roomTypeDb.map((roomType,index) => {
    return  <MenuItem key={index} value={roomType.id}>{roomType.name}</MenuItem>
  })) :(null)

  const handleRoomTypeSelector = (event) => {
    setRoomType(event.target.value);
  };

  const customerSelector = customers ? (customers.map((customer,index) => {
    return  <MenuItem key={index} value={customer.id}>{customer.firstName + ' ' + customer.lastName}</MenuItem>
  })) :(null)
//---------------------------------------------------rendering element-------------------------------------------------------

if (!isLoaded(reservationsDb) && rows != null){
  return(
    <CircularProgress style={{marginTop:"200px"}}/>
  )
}

  if(isLoaded(roomTypeDb)){
  return (
    <div style={{display: "flex",
                height: "654px",
                position: "fixed",
                width: "calc(85% - 4px )"}}>   
    <Grid container className={classes.root} spacing={1}>
      <div style={{width:"100%",display:"flex",    alignItems: "center",background:"white",position:"fixed",zIndex:10}}>     
      <TextField style={{color:"white"}} id="month" type="month" onChange={handleMonthPick} className={classes.textField} InputLabelProps={{
          shrink: true,}}/> 
      <FormControl className={classes.formControl} style={{    paddingLeft: "px"}}>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={roomType} onChange={handleRoomTypeSelector}>
         {roomTypeSelector}
        </Select>
      </FormControl>
      <FormControlLabel      
        control={<Checkbox checked={radio} onChange={handleRadioChange} name="radio" color="primary" style={{paddingLeft:"20px"}}/>}
        label="Bulk Insert" />

        <FormControl className={classes.formControl} style={{width:"300px"}}  >
        <Select disabled ={radio == false} label="Customer" id="Customer"  value={state.customerSelected} onChange={handleCustomerTypeSelector}>
         {customerSelector}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} style={{width:"300px"}}  >
        <Select disabled ={radio == false} label="Customer" id="Customer"  value={state.reservationType} onChange={handleReservationTypeSelector}>
          <MenuItem  value="WEBSITE">WEBSITE</MenuItem>
          <MenuItem  value="INSTAGRAM">INSTAGRAM</MenuItem>
          <MenuItem  value="BOOKING.COM">BOOKING.COM</MenuItem>    
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} onChange={handleNumberOfPacks} style={{width:"300px",display:"flex",marginBottom: "23px"}}  >
        <TextField id="numberOfPacks" label="Number of Packs" />
      </FormControl>
    </div>
      <Grid item xs={12} style={{ paddingTop: "51px"}}>
        {month ? rows : <div>      <LinearProgress />
        <CircularProgress style={{marginTop:"200px"}}/></div>}
      </Grid>
    </Grid>
    <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
  </div>
 
  
  );
      }
      else{
return <div><CircularProgress style={{marginTop:"200px"}}/></div>            }
  

}


const mapDispatchToProps = (dispatch) => {
  return {
    handleMonthPickReservation: (payload) => dispatch(handleMonthPickReservation(payload)),
    handleCustomerPick: (payload) => dispatch(handleCustomerPick(payload)),
    handleReservationTypePick: (payload) => dispatch(handleReservationTypePick(payload)),
    handleNumberOfPacks: (payload) => dispatch(handleNumberOfPacks(payload))

  }
}
export default compose(connect(null,mapDispatchToProps),firestoreConnect([
  {collection: 'reservation'},
  {collection: 'room'},
  {collection: 'roomtype'},
  {collection: 'customer'}
])) (ReservatonBoxView)