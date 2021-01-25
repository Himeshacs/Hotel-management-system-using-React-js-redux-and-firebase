import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import RoomsAvailableOfRoomTypeChart from './overview/RoomsAvailableOfRoomTypeChart';
import RoomTypeOfReservationsChart from './overview/RoomTypeOfReservationsChart';
import ReservationTypesChart from './overview/ReservationTypesChart';
import OverviewCard from './overview/util/OverviewCard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: "45%",
      marginBottom: "55px",
      height: "350px"
    },
  },
  card:{
    paddingTop: "50px"
  }
}));

export default function FrontOfficeOverview() {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{marginLeft:"20px",marginTop:"50px"}}>
    <OverviewCard chart={0} className={classes.card}/>
    <OverviewCard chart={1} className={classes.card}/>
    <OverviewCard chart={2} className={classes.card}/>
    <OverviewCard chart={3} className={classes.card}/>
      <Paper elevation={3} style={{display: "flex",flexDirection:"column",justifyContent: "space-around"}}><RoomsAvailableOfRoomTypeChart/></Paper>
      <Paper elevation={3} style={{display: "flex",flexDirection:"column",justifyContent: "space-around"}}><RoomTypeOfReservationsChart/> </Paper>
      <Paper elevation={3} style={{display: "flex",flexDirection:"column",justifyContent: "space-around"}}><ReservationTypesChart/> </Paper>
    </div>
    
  );
}
