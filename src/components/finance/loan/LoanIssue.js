import React from 'react'
import MaterialTable from 'material-table'

import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import {updateLoanIssue} from '../../../redux/actions/financeActions/LoanListActions'
import {insertLoanIssue} from '../../../redux/actions/financeActions/LoanListActions'
import {deleteLoanIssue} from '../../../redux/actions/financeActions/LoanListActions'

 function LoanIssue(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Loan ID', field: 'loanID' },
        { title: 'Loan Request ID', field: 'loanRequestID' },
        //{ title: 'Request Date', field: 'reqDate' },
        //{ title: 'Issue Date', field: 'issueDate' },
        { title: 'Duration', field: 'duration', lookup: {30:'3 Months', 31: '6 Months', 32:'1 Year'}},
        //{ title: 'Final Date', field: 'finalDate' },
        { title: 'Loan Limit', field: 'loanLimit', type:'numeric'},
        { title: 'Loan Amount', field: 'loanAmount', type:'numeric' },
        { title: 'Amount Paid', field: 'amountPaid' , type:'numeric' },
        { title: 'Pending', field: 'pending', type:'numeric' },

        //{ title: 'Payment Type', field: 'paymentType'},
        //{ title: 'Tax %', field: 'tax'},
        //{ title: 'Total Amount', field: 'totalAmount'},
        //{ title: 'Status', field: 'status' },
    ]); 

    const [state, setState] = React.useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
    });
    const { vertical, horizontal, open ,error} = state;

    const validateData___  = (data) => {
      if(data.loanID == null || data.loanID === ""){
        return "Loan ID Cannot be Null"
      }

      else if(data.loanID.length !== 5 || data.loanID.length > 5 ){
        return "Loan ID should contain 5 chars"
      }

      if(data.loanRequest == null || data.loanRequest === ""){
        return "Loan Request ID Cannot be Null"
      }

      else if(data.loanRequest.length !== 5 || data.loanRequest.length > 5 ){
        return "Loan Request ID should contain 5 chars"
      }

      else if(data.loanLimit == null || data.loanLimit === ""){
        return "Loan Limit Cannot be Null"
      }
      
      else if(data.loanLimit <= 0){
          return "Loan Limit should be Greater than 0"
      }

      else if(data.loanAmount == null || data.loanAmount === ""){
        return "Loan Amount Cannot be Null"
      }
      
      else if(data.loanAmount <= 0){
          return "Loan Amount should be Greater than 0"
      }

      else if(data.amountPaid == null || data.amountPaid === ""){
        return "Amount Cannot be Null"
      }
      
      else if(data.amountPaid <= 0){
          return "Amount should be Greater than 0"
      }

      else if(data.pending == null || data.pending === ""){
        return "Amount Cannot be Null"
      }
      
      else if(data.pending <= 0){
          return "Amount should be Greater than 0"
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

    
    const loanis = useSelector(state => state.firestore.ordered.loanIssue)
    const data = loanis ? (loanis.map(loanis => ({...loanis}))) : (null)
    
    const table = data ? (
        <MaterialTable
        title="Loan List"
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
                  props.insertLoanIssue(newData);
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
                  props.updateLoanIssue(newData)
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
                props.deleteLoanIssue(oldData.id)
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
        updateLoanIssue: (payload) => dispatch(updateLoanIssue(payload)),
        insertLoanIssue: (payload) => dispatch(insertLoanIssue(payload)),
        deleteLoanIssue: (loanID) => dispatch(deleteLoanIssue(loanID))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'loanIssue'}
  ])) (LoanIssue)

  //export default LoanIssue