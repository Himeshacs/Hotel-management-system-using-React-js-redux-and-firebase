import React from 'react'
import MaterialTable from 'material-table'

import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import {updatePettyRequest} from '../../../redux/actions/financeActions/PettyRequestActions'
import {insertPettyRequest} from '../../../redux/actions/financeActions/PettyRequestActions'
import {deletePettyRequest} from '../../../redux/actions/financeActions/PettyRequestActions'

 function PettyRequest(props) {
 
    const { useState } = React;
    /*const [columns, setColumns] = useState([
      { title: 'Voucher No', field: 'voucherNo' },
      //{ title: 'Date', field: 'date' },
      { title: 'Requested By', field: 'requestedBy'},
      { title: 'Department', field: 'department'},
      { title: 'Description', field: 'description' },
      { title: 'Requested Amount', field: 'requestedAmount'},
      { title: 'Status', field: 'status'},
    ]); */
    const [columns, setColumns] = useState([
      { title: 'Voucher No', field: 'voucherNo' },
      //{ title: 'Date', field: 'date' },
      { title: 'Requested By', field: 'requestedBy'},
      { title: 'Department', field: 'department', lookup: 
      {33:'Front-Office', 34: 'Finance', 35: 'Housekeeping', 36: 'Purchases', 37: 'HR', 38: 'F&B Service', 39: 'F&B Production', 40: 'Maintenance'}},
      { title: 'Description', field: 'description' },
      { title: 'Requested Amount', field: 'requestedAmount'},
      { title: 'Status', field: 'status', lookup: { 33: 'Requested', 34: 'Pending', 35: 'Rejected', 36: 'Accepted', 37: 'Issued' }},
    ]);

    const [state, setState] = React.useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
    });
    const { vertical, horizontal, open ,error} = state;

    const validateData___  = (data) => {
    
      if(data.voucherNo == null || data.voucherNo === ""){
        return "Voucher No Cannot be Null"
      }

      else if(data.voucherNo.length !== 5 || data.voucherNo.length > 5 ){
        return "Voucher No should contain 5 chars"
      }

      if(data.requestedBy == null || data.requestedBy === ""){
        return "Employee ID Cannot be Null"
      }

      else if(data.requestedBy.length !== 5 || data.requestedBy.length > 5 ){
        return "Employee ID should contain 5 chars"
      }

      else if(data.requestedAmount == null || data.requestedAmount === ""){
        return "Requested Amount Cannot be Null"
      }
      
      else if(data.requestedAmount <= 0){
          return "Requested Amount should be Greater than 0"
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


    const petrq = useSelector(state => state.firestore.ordered.pettycashRequest)
    const data = petrq ? (petrq.map(petrq => ({...petrq}))) : (null)
    
    const table = data ? (
        <MaterialTable
        title="Petty Cash Requests"
        columns={columns}
        data={data}
        editable={{

          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              const error = validateData___(newData);
              if (error != null) {
               setState({ ...state, open: true,error:error });
              reject();
              }
              else{
                setTimeout(() => {
                  //setData([...data, newData]);
                  props.insertPettyRequest(newData);
                  resolve();
                }, 1000)
              }
             
            }),

          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              const error = validateData___(newData);
              if (error != null) {
               setState({ ...state, open: true,error:error });
              reject();
              }
              else{
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  //setData([...dataUpdate]);
                  console.log(newData,oldData)
                  props.updatePettyRequest(newData)
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
                props.deletePettyRequest(oldData.id)
                resolve()
              }, 1000)
            }),
        }}
      />
    ) : (<div>Loading</div>)

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
        <div>
             {table}
             {feedBackToast}
        </div>
       
        )
  }

  
const mapDispatchToProps = (dispatch) => {
    return {
        updatePettyRequest: (payload) => dispatch(updatePettyRequest(payload)),
        insertPettyRequest: (payload) => dispatch(insertPettyRequest(payload)),
        deletePettyRequest: (voucherNo) => dispatch(deletePettyRequest(voucherNo))


    }
}

  export default compose(connect(null, mapDispatchToProps),firestoreConnect([
    {collection: 'pettycashRequest'}
  ])) (PettyRequest)

  //export default PettyRequest