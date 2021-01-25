import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import {insertAbsence, updateAbsence, deleteAbsence} from '../../../redux/actions/hrActions/AbsenceActions'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));



function AbsenceList(props) {
 
    const classes = useStyles();
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Absence Id', field: 'id', editable: 'never'},
      { title: 'Employee Id', field: 'employee'},
      { title: 'Absence Type', field: 'abtype', lookup: {40: 'Sick', 41: 'Casual', 42: 'No Pay Leave'}},
      { title: 'From Date', field: 'from'},
      { title: 'To Date', field: 'to'},
      { title: 'Total Days', field: 'days' },
      { title: 'Absence Reason', field: 'reason'},
      { title: 'Status', field: 'status'},
      
    ]);
    const absences = useSelector(state => state.firestore.ordered.absence)
    const data = absences ? (absences.map(absence => ({...absence,
        days:moment(absence.to, 'MM-DD-YYYY').diff(moment(absence.from),'days',true)}))) : (null)

    const [state, setState] = React.useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
    });
    const { vertical, horizontal, open ,error} = state


    const validateData___  = (data) => {
      if(data.employee == null || data.employee == ""){
        return "Field ID Cannot be null"

      }
      else if(data.abtype == null || data.abtype == ""){
        return "Field ABSENCE TYPE Cannot be null"
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
        title="Absence List"
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
                props.insertAbsence(newData)
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
                props.updateAbsence(newData)
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
                props.deleteAbsence(oldData.id)
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
             {table}
             {feedBackToast}
        </div>
       
        )
  }

 
const mapDispatchToProps = (dispatch) => {
    return {
        insertAbsence: (payload) => dispatch(insertAbsence(payload)),
        updateAbsence: (payload) => dispatch(updateAbsence(payload)),
        deleteAbsence: (abId) => dispatch(deleteAbsence(abId))
    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'absence'}
  ])) (AbsenceList)