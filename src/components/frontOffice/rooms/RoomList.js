import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import {updateRoom} from '../../../redux/actions/frontOfficeActions/RoomActions'
import {insertRoom} from '../../../redux/actions/frontOfficeActions/RoomActions'
import {deleteRoom} from '../../../redux/actions/frontOfficeActions/RoomActions'

import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

 function RoomList(props) {
 
    var roomTypeFilter = 'EXKINGSUITE';

    const classes = useStyles();
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Room Type', field: 'roomType' ,editable: 'never' },
      { title: 'Room Id', field: 'id' },
      { title: 'Room No', field: 'roomNo' ,type: 'numeric'},
      { title: 'Location', field: 'location', lookup: { 'Left Wing': 'Left Wing', 'Right Wing': 'Right Wing', 'Mid Wing': 'Mid Wing'}},
      { title: 'Floor Number', field: 'floor' ,type: 'numeric'},
      {
        title: 'Maintainance needed',
        field: 'maintainanceRequired' ,
        lookup: { 12: 'false', 56: 'true' }
      },
    ]); 
    const [state, setState] = React.useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
    });
    const { vertical, horizontal, open ,error} = state;


    const rooms = useSelector(state => state.firestore.ordered.room)
    const roomsCopy = rooms ? (rooms.map(room => ({...room}))) : (null)
    roomTypeFilter = props.id ? props.id : roomsCopy ? roomsCopy[0].roomType : null;
    const data = roomTypeFilter ? (roomsCopy.filter(room =>  room.roomType == roomTypeFilter)) : (roomsCopy)

//--------------------------------------------INTERNAL METHODS--------------------------------------------------------------------------------
    const validateData___  = (data) => {
      console.log(data)
      if(data.id == null || data.id == ""){
        return "Field ID Cannot be null"

      }
      else if(data.maintainanceRequired == null || data.maintainanceRequired == ""){
        return "Field Maintainance Required Cannot be null"
      }
      else if(data.floor == null || data.floor == ""){
        return "Field Floor Cannot be null"
      }
      else if(data.location == null || data.location == ""){
        return "Field Location Cannot be null"
      }
      else if(data.floor > 5 || data.floor < 0){
        return "Value for floor number should be within 0 and 5"
      }
      else
      return null;
    }

    const handleClick = (newState) => () => {
      setState({ open: true, ...newState });
    };
  
    const handleClose = () => {
      setState({ ...state, open: false });
    };

//---------------------------------------UI-ELEMENTS--------------------------------------------------------------------------  
    const table = data ? (
        <MaterialTable style={{borderRadius: "0px"}}
        title={roomTypeFilter ? roomTypeFilter : "All Rooms"}
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              const error = validateData___(newData);
                if (error != null){
                  setState({ ...state, open: true,error:error });
                  reject();
                }
                else{
                  setTimeout(() => {
                    console.log(data)
                    props.insertRoom(newData,roomTypeFilter);
                    resolve();
                  }, 1000)
                }
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              const error = validateData___(newData);
                if (error != null){
                  reject();
                  setState({ ...state, open: true,error:error });
                }
                else{
                  setTimeout(() => {
                    props.updateRoom(newData)
                    resolve();
                  }, 1000)
                }
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                //setData([...dataDelete]);
                console.log(oldData)
                props.deleteRoom(oldData.id)
                resolve()
              }, 1000)
            }),
        }}
        options={{
        headerStyle: {
          backgroundColor: '#01579b',
          color: '#FFF',
          borderBottom: '1px solid #333',
        width: '100px',
    /* height: 100px; */
        boxShadow: "0 10px 5px -2px #888"
        }
      }}

      />
    ) 
    : 
    (<div><CircularProgress style={{marginTop:"200px"}}/></div>)


    const feedBackToast =  (<Snackbar 
      autoHideDuration={200000}
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      key={vertical + horizontal}
      >
          <div className={classes.root}>

        <Alert variant="filled" severity="error" style={{display: "flex",alignItems: "center"}}>
        <h3>{error}</h3>
        
        </Alert>
        </div>
      </Snackbar>)

  
    return(
        <div>
             {table}
             {feedBackToast}
        </div>
       
        )
  }
 
const mapDispatchToProps = (dispatch) => {
    return {
        updateRoom: (payload) => dispatch(updateRoom(payload)),
        insertRoom: (payload,roomType) => dispatch(insertRoom(payload,roomType)),
        deleteRoom: (roomId) => dispatch(deleteRoom(roomId))

    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'room'}
  ])) (RoomList)