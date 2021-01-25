import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered';
import { useSelector, connect } from 'react-redux';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import NewReservationForm from '../forms/NewReservationForm';
import {handleDayPick} from '../../../../redux/actions/frontOfficeActions/FrontOfficeNavActions'
import {insertReservationItem} from '../../../../redux/actions/frontOfficeActions/ReservationActions'

const useStyles = makeStyles(({ palette }) => ({
  card: {
    borderRadius: 12,
    minWidth: 150,
    textAlign: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 'auto',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 0,
  },
  subheader: {
    fontSize: 14,
    color: palette.grey[500],
    marginBottom: '0.875em',
  },
  statLabel: {
    fontSize: 12,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: '1px',
  },
}));



function EmptyReservationCard (props) {
  const styles = useStyles();
  const shadowStyles = useFadedShadowStyles();
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: 'rgba(0, 0, 0, 0.08)',
    height: '50%',
  });

  const state = useSelector(state => state.frontOffice )
  const handleClick = (e) => {
    console.log("clicked dayy " , props.startDay)
    props.handleDayPick(props.startDay)
  }
 
//---------------------------------------Internal methods------------------------------------------------------------------------------\
const validateData___  = (data,type) => {
  if(data.selectedMonth == null || data.selectedMonth == ""){
    return "Field Month Cannot be null"

  }
  else if(data.selectedCustomer == null || data.selectedCustomer == ""){
    return "Field Customer Cannot be null"
  }
  else if(data.reservationType == null || data.reservationType == ""){
    return "Field Reservation Type Cannot be null"
  }
  else if(data.numberOfPacks == null || data.numberOfPacks == ""){
    return "Field Number Of Packs Cannot be null"
  }
  else
  return null;
}


const handleNewReservation = (e) => {
  props.handleDayPick(props.startDay)
  let error = null
  error = validateData___(state)
  console.log(error) 
  props.insertReservationItem(props.roomType,props.roomNo)
}
  //------------------------------------------ui elements---------------------------------------------------------
  const showButton = <AddCircleIcon variant="outlined" color="secondary" onClick={handleNewReservation}/> 
  

  return (
    <Card className={cx(styles.card, shadowStyles.root)}>
      <Box display={'flex'} style={{padding: "8px 0"}}>
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
        <IconButton  aria-label="add to shopping cart" onClick={handleClick}>
        {showButton}
      
      </IconButton>
        </Box>
      
      </Box>
    </Card>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleDayPick: (payload) => dispatch(handleDayPick(payload)),
    insertReservationItem: (roomType,roomNo) => dispatch(insertReservationItem(roomType,roomNo)),

  }
}
export default connect(null,mapDispatchToProps)( EmptyReservationCard)