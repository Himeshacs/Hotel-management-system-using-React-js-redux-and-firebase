import React from 'react'
import MaterialTable from 'material-table'

import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import {updatePettyCash} from '../../../redux/actions/financeActions/PettyCashManagementActions'
import {insertPettyCash} from '../../../redux/actions/financeActions/PettyCashManagementActions'
import {deletePettyCash} from '../../../redux/actions/financeActions/PettyCashManagementActions'

 function PettyCashManagement(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'PCash ID', field: 'pcashID' },
      { title: 'Voucher No', field: 'voucherNo' },
      //{ title: 'Date', field: 'date' },
      { title: 'Requested Amount', field: 'requestedAmount', type:'numeric'},
      { title: 'Issued Amount', field: 'issuedAmount', type:'numeric'},
      { title: 'Balance Received', field: 'balanceAmount', type:'numeric'},
      //{ title: 'Department', field: 'department'},
      //{ title: 'Description', field: 'description' },
      { title: 'Variance', field: 'variance', lookup: {33: 'Budget', 34: 'Short', 35: 'Over'}},
    ]); 

    const [state, setState] = React.useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
    });
    const { vertical, horizontal, open ,error} = state;

    const validateData___  = (data) => {
      if(data.pcashID == null || data.pcashID === ""){
        return "Petty Cash ID Cannot be Null"
      }

      else if(data.pcashID.length !== 5 || data.pcashID.length > 5 ){
        return "Petty Cash ID should contain 5 chars"
      }

      if(data.voucherNo == null || data.voucherNo === ""){
        return "Voucher No Cannot be Null"
      }

      else if(data.voucherNo.length !== 5 || data.voucherNo.length > 5 ){
        return "Voucher No should contain 5 chars"
      }

      else if(data.requestedAmount == null || data.requestedAmount === ""){
        return "Requested Amount Cannot be Null"
      }
      
      else if(data.requestedAmount <= 0){
          return "Requested Amount should be Greater than 0"
      }

      
      else if(data.issuedAmount == null || data.issuedAmount === ""){
        return "Issued Amount Cannot be Null"
      }
      
      else if(data.issuedAmount <= 0){
          return "Issued Amount should be Greater than 0"
      }

      
      else if(data.balanceAmount == null || data.balanceAmount === ""){
        return "Balance Amount Cannot be Null"
      }
      
      else if(data.balanceAmount <= 0){
          return "Balance Amount should be Greater than 0"
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

    const petmg = useSelector(state => state.firestore.ordered.pettycashManagement)
    const data = petmg ? (petmg.map(petmg => ({...petmg}))) : (null)
    
    const table = data ? (
        <MaterialTable
        title="Petty Cash Management"
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
                  props.insertPettyCash(newData);
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
                  props.updatePettyCash(newData)
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
                props.deletePettyCash(oldData.id)
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
        updatePettyCash: (payload) => dispatch(updatePettyCash(payload)),
        insertPettyCash: (payload) => dispatch(insertPettyCash(payload)),
        deletePettyCash: (voucherNo) => dispatch(deletePettyCash(voucherNo))


    }
}

  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'pettycashManagement'}
  ])) (PettyCashManagement)

  //export default PettyCashManagement