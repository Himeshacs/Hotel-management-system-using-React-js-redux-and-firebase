import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import {updateRoomAmenity} from '../../../redux/actions/frontOfficeActions/RoomTypeActions'
import {insertRoomAmenity} from '../../../redux/actions/frontOfficeActions/RoomTypeActions'
import {deleteRoomAmenity} from '../../../redux/actions/frontOfficeActions/RoomTypeActions'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

function Alert(props) {  return <MuiAlert elevation={6} variant="filled" {...props} />}

 function RoomAmnetiesTable(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Amenety', field: 'amenity' },
    
    ]); 

    const [state, setState] = React.useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
    });
    const { vertical, horizontal, open ,error} = state;

    const [id, setId] = useState('')
  

    const roomtype = useSelector(state => state.frontOffice.selectedRoom)
    const ameneties = useSelector(state => state.firestore.ordered.roomAmenity)
   
    const amenetiesCopy = ameneties ? (ameneties.map(amenity => ({...amenity}))) : (null)
    let roomTypeFilter = props.id ? props.id : amenetiesCopy ? amenetiesCopy[0].roomType : null;
    const data = amenetiesCopy ? (amenetiesCopy.filter(amenity =>  amenity.roomType == roomTypeFilter)) : (amenetiesCopy)

//---------------------------------------INTERNAL METODS -----------------------------------------------------------------------

    const validateData___  = (data) => {
      if(data.amenity == null || data.amenity == ""){
        return "Field AMENITY Cannot be null"

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

//-------------------------------UI-ELEMENTS-----------------------------------------------------------------------------
    const table = data ? (
        <MaterialTable style={{borderRadius: "0px"}}
        title={roomTypeFilter}
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
                    props.insertRoomAmenity(roomTypeFilter,newData);
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
                    props.updateRoomAmenity(newData)
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
                props.deleteRoomAmenity(oldData.id)
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
    ) : (<div><CircularProgress style={{marginTop:"200px"}}/></div>)

    
    const feedBackToast =  (<Snackbar 
      autoHideDuration={2000}
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      key={vertical + horizontal}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>)
 

  
    return(
        <div className="TableCover" style={{padding_left: "5px"}}>
             {table}
             {feedBackToast}
        </div>
       
        )
  }

//------------------------------------REDUX-METHODS----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) => {
    return {
      updateRoomAmenity: (payload) => dispatch(updateRoomAmenity(payload)),
      insertRoomAmenity: (roomType,payload) => dispatch(insertRoomAmenity(roomType,payload)),
      deleteRoomAmenity: (roomAmenityId) => dispatch(deleteRoomAmenity(roomAmenityId))


    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        roomType:state.frontOffice.selectedRoom
    }
}
//-----------------------------------EXPORT-DEFAULT-------------------------------------------------------------------
  export default  compose(connect(mapStateToProps,mapDispatchToProps),firestoreConnect((props) => [
    {collection: 'roomAmenity' },
]))(RoomAmnetiesTable)