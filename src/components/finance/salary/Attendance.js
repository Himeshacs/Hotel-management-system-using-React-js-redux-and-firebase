import React from 'react'
import MaterialTable from 'material-table'

import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import {updateAttendance} from '../../../redux/actions/financeActions/AttendanceActions'
import {insertAttendance} from '../../../redux/actions/financeActions/AttendanceActions'
import {deleteAttendance} from '../../../redux/actions/financeActions/AttendanceActions'

 function Attendance(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Attendance ID', field: 'attendanceID' },
        { title: 'Employee ID', field: 'employeeID' },
        { title: 'Department', field: 'department', lookup: 
        {33:'Front-Office', 34: 'Finance', 35: 'Housekeeping', 36: 'Purchases', 37: 'HR', 38: 'F&B Service', 39: 'F&B Production', 40: 'Maintenance'}},
        { title: 'Month', field: 'month'},
        { title: 'Year', field: 'year' },
        { title: 'Total Working Days', field: 'totWDays', type:'numeric'},
        { title: 'Total Working Hours', field: 'totWHours', type:'numeric'},
        { title: 'Actual Working Days', field: 'actWDays', type:'numeric'},
        { title: 'Actual Working Hours', field: 'actWHours', type:'numeric'},
        { title: 'Allowances', field: 'allowances', lookup:{30:'Full', 31:'Mobile', 32:'Transport'}},
        //{ title: 'Total Amount', field: 'totalAmount'},
        { title: 'On Loan', field: 'loan', lookup: {30:'Yes', 31:'No'}},
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

      if(data.employeeID == null || data.employeeID === ""){
        return "Employee ID Cannot be Null"
      }

      else if(data.employeeID.length !== 5 || data.employeeID.length > 5 ){
        return "Employee ID should contain 5 chars"
      }

      else if(data.totWDays == null || data.totWDays === ""){
        return "Total Working Days Cannot be Null"
      }
      
      else if(data.totWDays <= 0){
          return "Total Working Days should be Greater than 0"
      }
      
      else if(data.totWHours == null || data.totWHours === ""){
        return "Total Working Hours Cannot be Null"
      }
      
      else if(data.totWHours <= 0){
          return "Total Working Hours should be Greater than 0"
      }

      else if(data.actWDays == null || data.actWDays === ""){
        return "Actual Working Days Cannot be Null"
      }
      
      else if(data.actWDays <= 0){
          return "Actual Working Days should be Greater than 0"
      }
      
      else if(data.actWHours == null || data.totWHours === ""){
        return "Actual Working Hours Cannot be Null"
      }
      
      else if(data.actWHours <= 0){
          return "Actual Working Hours should be Greater than 0"
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



    const atten = useSelector(state => state.firestore.ordered.attendanceFin)
    const data = atten ? (atten.map(atten => ({...atten}))) : (null)
    
    const table = data ? (
        <MaterialTable
        title="Attendance Information"
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
                  props.insertAttendance(newData);
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
                  props.updateAttendance(newData)
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
                props.deleteAttendance(oldData.id)
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
        updateAttendance: (payload) => dispatch(updateAttendance(payload)),
        insertAttendance: (payload) => dispatch(insertAttendance(payload)),
        deleteAttendance: (attendanceID) => dispatch(deleteAttendance(attendanceID))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'attendanceFin'}
  ])) (Attendance)
  

  //export default Attendance