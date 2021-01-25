import React from 'react'
import MaterialTable from 'material-table'

import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import {updateCashIn} from '../../../redux/actions/financeActions/CashInActions'
import {insertCashIn} from '../../../redux/actions/financeActions/CashInActions'
import {deleteCashIn} from '../../../redux/actions/financeActions/CashInActions'

 function CashInflow(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Inflow No', field: 'inflowID' },
        //{ title: 'Date', field: 'date' },
        { title: 'Description', field: 'description'},
        { title: 'Category', field: 'category', lookup : {33: 'Front-Office', 34: 'Bar', 35:'Other'}},
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
      if(data.inflowID == null || data.inflowID === ""){
        return "Inflow ID Cannot be Null"
      }

      else if(data.inflowID.length !== 5 || data.inflowID.length > 5 ){
        return "Inflow ID should contain 5 chars"
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

      else if(data.description.length <= 5){
        return "Description Length is not sufficient"
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

    const cashin = useSelector(state => state.firestore.ordered.cashInflow)
    const data = cashin ? (cashin.map(cashin  => ({...cashin }))) : (null)
    
    const table = data ? (
        <MaterialTable
        title="Cash Inflows"
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
                  props.insertCashIn(newData);
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
                  props.updateCashIn(newData)
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
                props.deleteCashIn(oldData.id)
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
        updateCashIn: (payload) => dispatch(updateCashIn(payload)),
        insertCashIn: (payload) => dispatch(insertCashIn(payload)),
        deleteCashIn: (inflowID) => dispatch(deleteCashIn(inflowID))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'cashInflow'}
  ])) (CashInflow)


  //export default CashInflow