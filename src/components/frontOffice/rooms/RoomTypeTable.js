import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {updateRoomType} from '../../../redux/actions/frontOfficeActions/RoomTypeActions'
import {insertRoomType} from '../../../redux/actions/frontOfficeActions/RoomTypeActions'
import {deleteRoomType} from '../../../redux/actions/frontOfficeActions/RoomTypeActions'
import NewReservationForm from '../reservation/forms/NewReservationForm';


function RoomTypeTable(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'ID', field: 'id' ,},
      { title: 'Name', field: 'name' },
      { title: 'Brief', field: 'brief'},
      {
        title: 'Description',
        field: 'description',
      
      },
    ]); 

    const [state, setState] = React.useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
    });
    const { vertical, horizontal, open ,error} = state;


    const room = useSelector(state => state.firestore.ordered.roomtype)    
    const data = room ? (room.map(room => ({...room}))) : (null)
    

    //--------------------------------------------INTERNAL METHODS--------------------------------------------------------------------------------
    const validateData___  = (data) => {
      if(data.id == null || data.id == ""){
        return "Field ID Cannot be null"

      }
      else if(data.id.length < 5 ){
        return "Field ID sould contain 5 characters"

      }
      else if(data.name == null || data.name == ""){
        return "Field Name Cannot be null"
      }
      else if(data.brief == null || data.brief == ""){
        return "Field BRIEF Cannot be null"
      }
      else if(data.description == null || data.description == ""){
        return "Field Description Cannot be null"
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

//--------------------------------------------------------UI-ELEMENTS-------------------------------------------------------------     
    const table = data ? (
      <MaterialTable style={{padding:"0px",boxShadow: "0 0 2px 2px black"}}
      title="RoomTypeTable Preview"
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
                    props.insertRoomType(newData);
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
                    props.updateRoomType(newData)
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
                props.deleteRoomType(oldData.id)
                resolve()
              }, 1000)
            }),
        }}
        options={{
        headerStyle: {
          backgroundColor: '#01579b',
          color: '#FFF'
        }
      }}
      />
    ) : (<div><CircularProgress style={{marginTop:"200px"}}/></div>)

    const feedBackToast =  (<Snackbar 
      autoHideDuration={200000}
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      key={vertical + horizontal}
      >
          <div >

        <Alert variant="filled" severity="error" style={{display: "flex",alignItems: "center"}}>
        <h3>{error}</h3>
        
        </Alert>
        </div>
      </Snackbar>)
  

  
    return(
        <div style={{padding: "20px"}}>
            {table}
             {feedBackToast}
        </div>
       
        )
  }
 
  const mapDispatchToProps = (dispatch) => {
    return {
        updateRoomType: (payload) => dispatch(updateRoomType(payload)),
        insertRoomType: (payload) => dispatch(insertRoomType(payload)),
        deleteRoomType: (roomId) => dispatch(deleteRoomType(roomId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'roomtype'}
  ])) (RoomTypeTable)