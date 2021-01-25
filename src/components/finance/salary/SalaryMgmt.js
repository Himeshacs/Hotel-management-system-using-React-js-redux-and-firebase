import React from 'react'
import MaterialTable from 'material-table'

import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';


import {updateSalary} from '../../../redux/actions/financeActions/PayrollActions'
import {insertSalary} from '../../../redux/actions/financeActions/PayrollActions'
import {deleteSalary} from '../../../redux/actions/financeActions/PayrollActions'

 function SalaryMgmt(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Salary Rep No', field: 'salaryID' },
        { title: 'Attendance ID', field: 'attendanceID' },
        { title: 'Basic Salary', field: 'basicSalary', type:'numeric' },
        { title: 'No Pay', field: 'noPay', type:'numeric' },
        { title: 'OT Pay', field: 'otPay', type:'numeric' },
        { title: 'Allowances', field: 'allowances' , type:'numeric' },
        { title: 'Service Charges', field: 'serCharges', type:'numeric' },
        { title: 'Loan Deduction', field: 'loan', type:'numeric' },
        { title: 'EPF', field: 'epf', type:'numeric' },
        { title: 'Net Salary', field: 'netSalary', type:'numeric' },
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
    
      if(data.attendanceID == null || data.attendanceID === ""){
        return "Attendance ID Cannot be Null"
      }

      else if(data.attendanceID.length !== 5 || data.attendanceID.length > 5 ){
        return "Attendance ID should contain 5 chars"
      }

      if(data.salaryID == null || data.salaryID === ""){
        return "Salary ID Cannot be Null"
      }

      else if(data.salaryID.length !== 5 || data.salaryID.length > 5 ){
        return "Salary ID should contain 5 chars"
      }

      else if(data.basicSalary == null || data.basicSalary === ""){
        return "Basic Salary Cannot be Null"
      }
      
      else if(data.basicSalary <= 0){
          return "Basic Salary should be Greater than 0"
      }
      
      else if(data.noPay == null || data.noPay === ""){
        return "No Pay Cannot be Null"
      }
      
      else if(data.noPay <= 0){
          return "No Pay should be Greater than 0"
      }

      else if(data.otPay == null || data.otPay === ""){
        return "OT Pay Cannot be Null"
      }
      
      else if(data.otPay <= 0){
          return "OT Pay should be Greater than 0"
      }
      
      else if(data.allowances == null || data.allowances === ""){
        return "Allowances Cannot be Null"
      }
      
      else if(data.allowances <= 0){
          return "Allowances should be Greater than 0"
      }

      else if(data.serCharges == null || data.serCharges === ""){
        return "Service Charges Cannot be Null"
      }
      
      else if(data.serCharges <= 0){
          return "Service Charges should be Greater than 0"
      }

      else if(data.loan == null || data.loan === ""){
        return "Loan Cannot be Null"
      }
      
      else if(data.loan <= 0){
          return "Loan should be Greater than 0"
      }

      else if(data.epf == null || data.epf === ""){
        return "EPF Cannot be Null"
      }
      
      else if(data.epf <= 0){
          return "EPF should be Greater than 0"
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

    const salmg = useSelector(state => state.firestore.ordered.salaryMgmt)
    const data = salmg ? (salmg.map(salmg => ({...salmg}))) : (null)
    
    const table = data ? (
        <MaterialTable
        title="Staff Payroll"
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
                  props.insertSalary(newData);
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
                  props.updateSalary(newData)
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
                props.deleteSalary(oldData.id)
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
        updateSalary: (payload) => dispatch(updateSalary(payload)),
        insertSalary: (payload) => dispatch(insertSalary(payload)),
        deleteSalary: (salaryID) => dispatch(deleteSalary(salaryID))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'salaryMgmt'}
  ])) (SalaryMgmt)
  

  //export default SalaryMgmt