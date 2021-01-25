import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import EmployeeForm from '../employee/EmployeeForm'
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import {insertEmployee, updateEmployee, deleteEmployee} from '../../../redux/actions/hrActions/EmployeeActions'
import EmployeeTypeCard from '../employee/EmployeeTypeCard';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function EmployeeList(props) {
 
    const classes = useStyles();
    const { useState } = React;
    
 
    const [columns, setColumns] = useState([
      { title: 'Employee ID', field: 'id' },
      { title: 'Employee Name', field: 'name' },
      { title: 'Employee Type', field: 'emptype' , lookup:{22: 'Permanent', 23: 'Temporary'}},
      { title: 'Department', field: 'department', lookup:{50:'Finance',51:'Front Office',52:'FnB Production',53:'FnB Services',54:'Maintenance',55:'Purchases n Inventory',56:'Human Resources',57:'HouseKeeping'} },
      { title: 'Designation', field: 'designation' },
      { title: 'Reports To', field: 'reportsto'},
      { title: 'Contact Number', field: 'contactnumber' },
      { title: 'Address', field: 'address' },
      
      
      
    ]);
    
    const [state, setState] = React.useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
    });
    const { vertical, horizontal, open ,error} = state;
    



    const employees = useSelector(state => state.firestore.ordered.employee)
    const data = employees ? (employees.map(employee => ({...employee}))) : (null)
    const employeeTypes = useSelector(state => state.firestore.ordered.employeetype)    
    const Typedata = employeeTypes ? (employeeTypes.map(employeetype => ({...employeetype}))) : (null)
    const CardList = Typedata ? Typedata.map((employeetype) => (<EmployeeTypeCard employeeType={employeetype} />)): (null)
    console.log(data);

    const validateData___  = (data) => {
      if(data.id == null || data.id == ""){
        return "Field ID Cannot be null"

      }
      else if(data.name == null || data.name == ""){
        return "Field NAME Cannot be null"
      }
      else if(data.emptype == null || data.emptype == ""){
        return "Field EMPLOYEE TYPE Cannot be null"
      }
      else if(data.department == null || data.department == ""){
        return "Field DEPARTMENT Cannot be null"
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

    const table = data ? (
        <MaterialTable
        title="Employee List Preview"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              const error = validateData___(newData);
                if (error != null){
                  reject();
                  setState({ ...state, open: true,error:error });
                }
                else{
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertEmployee(newData)
                resolve();
              }, 1000)}
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
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                //setData([...dataUpdate]);
                console.log(newData,oldData)
                props.updateEmployee(newData)
                resolve();
              }, 1000)}
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                //setData([...dataDelete]);
                console.log(oldData)
                props.deleteEmployee(oldData.id)
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
          <div className={classes.root}>

        <Alert variant="filled" severity="error" style={{display: "flex",alignItems: "center"}}>
        <h3>{error}</h3>
        
        </Alert>
        </div>
      </Snackbar>)
  

  
    return(
        <div>
             {CardList}
             {employees ? table : <div>Loading</div>}
             {feedBackToast}
        </div>
       
        )
  }

 
const mapDispatchToProps = (dispatch) => {
    return {
        insertEmployee: (payload) => dispatch(insertEmployee(payload)),
        updateEmployee: (payload) => dispatch(updateEmployee(payload)),
        deleteEmployee: (empId) => dispatch(deleteEmployee(empId))
    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'employee'},
    {collection: 'employeetype'},
    {collection: 'department'}
  ])) (EmployeeList)