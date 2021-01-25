import React from 'react'
import MaterialTable from 'material-table'

import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import {updateCashOut} from '../../../redux/actions/financeActions/CashOutActions'
import {insertCashOut} from '../../../redux/actions/financeActions/CashOutActions'
import {deleteCashOut} from '../../../redux/actions/financeActions/CashOutActions'

 function CashOutFlow(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Outflow No', field: 'outflowID' },
        //{ title: 'Date', field: 'date' },
        { title: 'Department', field: 'department', lookup : 
        {33:'Front-Office', 34: 'Finance', 35: 'Housekeeping', 36: 'Purchases', 37: 'HR', 38: 'F&B Service', 39: 'F&B Production', 40: 'Maintenance'}},
        { title: 'Description', field: 'description'},
        { title: 'Category', field: 'category', lookup : {30: 'Administration', 31: 'Operations', 33: 'Financial', 34: 'Other'}},
        { title: 'Sub Category', field: 'subCategory', lookup :{30: 'Payable', 31: 'Investment', 32: 'Other'}},
        { title: 'Inoivce Amount', field: 'invoiceAmount', type:'numeric' },
        //{ title: 'OT Pay', field: 'otPay'},
        //{ title: 'Allowances', field: 'allowances' },
        //{ title: 'Service Charges', field: 'serCharges'},
        //{ title: 'Loan Deduction', field: 'loan'},
        //{ title: 'EPF', field: 'epf'},
        //{ title: 'Net Salary', field: 'netSalary'},
        //{ title: 'Allowances', field: 'allowances'},
        //{ title: 'Total Amount', field: 'totalAmount'},
        //{ title: 'On Loan', field: 'loan'},
    ]); 

    const [state, setState] = React.useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
    });
    const { vertical, horizontal, open ,error} = state;

    const validateData___  = (data) => {
      if(data.outflowID == null || data.outflowID === ""){
        return "Outflow ID Cannot be Null"
      }

      else if(data.outflowID.length !== 5 || data.outflowID.length > 5 ){
        return "Outflow ID should contain 5 chars"
      }
      else if(data.invoiceAmount == null || data.invoiceAmount === ""){
        return "Invoice Amount Cannot be Null"
      }

      else if(data.invoiceAmount <= 0){
        return "Invoice Amount should be Greater than 0"
      }

      else if(data.description == null || data.description === ""){
        return "Description cannot be Null"
      }

      else if(data.description.length < 5){
        return "Description length is Short"
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

    const cashout = useSelector(state => state.firestore.ordered.cashOutflow)
    
    const data = cashout ? (cashout.map(cashout => ({...cashout}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Cash Outflows"
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
                  props.insertCashOut(newData);
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
                  props.updateCashOut(newData)
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
                props.deleteCashOut(oldData.id)
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
        updateCashOut: (payload) => dispatch(updateCashOut(payload)),
        insertCashOut: (payload) => dispatch(insertCashOut(payload)),
        deleteCashOut: (outflowID) => dispatch(deleteCashOut(outflowID))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'cashOutflow'}
  ])) (CashOutFlow)


 // export default CashOutFlow