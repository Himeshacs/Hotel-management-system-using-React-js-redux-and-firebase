import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';



import {updateLaundryManagement} from '../../redux/actions/houseKeepingActions/LaundryManagementActions'
import {insertLaundryManagement} from '../../redux/actions/houseKeepingActions/LaundryManagementActions'
import {deleteLaundryManagement} from '../../redux/actions/houseKeepingActions/LaundryManagementActions'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function LaundryManagement
(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Employee',field: 'empId', },
      { title: 'Description', field: 'description' },
      { title: 'time', field: 'timee' , type: 'datetime'},
      { title: 'Status', field: 'status'},
    ]); 

    const [state, setState] = React.useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
    });
    const { vertical, horizontal, open ,error} = state;


    const LaundryManagements = useSelector(state => state.firestore.ordered.laundryManagement)    
    const data = LaundryManagements ? (LaundryManagements.map(LaundryManagement => ({...LaundryManagement}))) : (null)
    const datacopy = data ? data.map(d => ({...d,timee:d ? new Date(d.time.seconds * 1000):null})) : null
    console.log(data )
    //--------------------------------------------INTERNAL METHODS--------------------------------------------------------------------------------
  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };


//--------------------------------------------------------UI-ELEMENTS-------------------------------------------------------------     
const table = datacopy ? (
        <MaterialTable style={{padding:"0px"}}
        title="cleaning Schedule"
        columns={columns}
        data={datacopy}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
             
                  setTimeout(() => {
                    console.log(data)
                    props.insertLaundryManagement(newData);
                    resolve();
                  }, 1000)
                
              
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {

                  setTimeout(() => {
                    props.updateLaundryManagement(newData)
                    resolve();
                  }, 1000)
                
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                //setData([...dataDelete]);
                console.log(oldData)
                props.deleteLaundryManagement(oldData.id)
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
    ) : (<div><CircularProgress style={{marginTop:"200px"}} /></div>)


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
        <div style={{padding_left: "5px"}}>
             {table}
             {feedBackToast}
        </div>
       
        )
  }
 
  const mapDispatchToProps = (dispatch) => {
    return {
        updateLaundryManagement: (payload) => dispatch(updateLaundryManagement(payload)),
      insertLaundryManagement: (payload) => dispatch(insertLaundryManagement(payload)),
      deleteLaundryManagement: (customerId) => dispatch(deleteLaundryManagement(customerId))

    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'laundryManagement'}
  ])) (LaundryManagement
    )