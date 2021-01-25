import React from 'react'
import MaterialTable from 'material-table'

import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import {updateLoanRequest} from '../../../redux/actions/financeActions/LoanRequestActions'
import {insertLoanRequest} from '../../../redux/actions/financeActions/LoanRequestActions'
import {deleteLoanRequest} from '../../../redux/actions/financeActions/LoanRequestActions'

 function Loan(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Loan Request ID', field: 'loanRequest' },
        //{ title: 'Date', field: 'date' },
        { title: 'Applied By', field: 'appliedBy' },
        { title: 'Department', field: 'department' , lookup : 
        {33:'Front-Office', 34: 'Finance', 35: 'Housekeeping', 36: 'Purchases', 37: 'HR', 38: 'F&B Service', 39: 'F&B Production', 40: 'Maintenance'}},
        { title: 'Loan Amount', field: 'loanAmount', type:'numeric' },
        { title: 'Duration', field: 'duration', lookup: {30:'3 Months', 31: '6 Months', 32:'1 Year'}},
        //{ title: 'Payment Type', field: 'paymentType'},
        //{ title: 'Tax %', field: 'tax'},
        //{ title: 'Total Amount', field: 'totalAmount'},
        { title: 'Status', field: 'status', lookup: { 33: 'Requested', 34: 'Pending', 35: 'Rejected', 36: 'Accepted', 37: 'Issued' } },
    ]); 

    const [state, setState] = React.useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
    });
    const { vertical, horizontal, open ,error} = state;

    const validateData___  = (data) => {
      if(data.loanRequest == null || data.loanRequest === ""){
        return "Loan Request ID Cannot be Null"
      }

      else if(data.loanRequest.length !== 5 || data.loanRequest.length > 5 ){
        return "Loan Request ID should contain 5 chars"
      }

      if(data.appliedBy == null || data.appliedBy === ""){
        return "Employee ID Cannot be Null"
      }

      else if(data.appliedBy.length !== 5 || data.appliedBy.length > 5 ){
        return "Employee ID should contain 5 chars"
      }

      else if(data.loanAmount == null || data.loanAmount === ""){
        return "Loan Amount Cannot be Null"
      }
      
      else if(data.loanAmount <= 0){
          return "Loan Amount should be Greater than 0"
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

    const loanrq = useSelector(state => state.firestore.ordered.loanRequest)
    const data = loanrq ? (loanrq.map(loanrq => ({...loanrq}))) : (null)
    
    const table = data ? (
        <MaterialTable
        title="Loan Requests"
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
               else {
                setTimeout(() => {
                  //setData([...data, newData]);
                  props.insertLoanRequest(newData);
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
              else {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  //setData([...dataUpdate]);
                  console.log(newData,oldData)
                  props.updateLoanRequest(newData)
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
                props.deleteLoanRequest(oldData.id)
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
        updateLoanRequest: (payload) => dispatch(updateLoanRequest(payload)),
        insertLoanRequest: (payload) => dispatch(insertLoanRequest(payload)),
        deleteLoanRequest: (loanReques) => dispatch(deleteLoanRequest(loanReques))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'loanRequest'}
  ])) (Loan)

  //export default Loan