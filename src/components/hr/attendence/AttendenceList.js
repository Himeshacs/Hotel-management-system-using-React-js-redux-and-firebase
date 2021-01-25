import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import {insertAttendence, updateAttendence, deleteAttendence} from '../../../redux/actions/hrActions/AttendenceActions'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function AttendenceList(props) {
 
  const classes = useStyles();
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Attendence Id', field: 'id',editable: 'never'},
      { title: 'Date', field: 'date', editable: 'never'},
      { title: 'Employee Id', field: 'employee'},
      { title: 'Clock In', field: 'arrival'},
      { title: 'Clock Out', field: 'departure' },
      { title: 'Normal Working Hours', field: 'normalworkinghrs'},
      { title: 'Actual Working Hours', field: 'totalworkinghrs', editable: 'never'}
      
    ]);
    const attendences = useSelector(state => state.firestore.ordered.attendence)
    const data =attendences ? (attendences.map(attendence => ({...attendence, 
    date:moment().format("MM-DD-YYYY").toString(),
    totalworkinghrs:parseFloat(attendence.departure) - parseFloat(attendence.arrival)}))) : (null)
    
    const [state, setState] = React.useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
    });
    const { vertical, horizontal, open ,error} = state;

    const workingHrs = (data) =>{
      if ((data.arrival != null || data.arrival != "")&&(data.departure != null || data.departure != "")){
          var total = parseFloat(data.departure) - parseFloat(data.arrival);
          if(total >= 4){
            data.totalworkinghrs = total;
          }         
      }
    }

    const validateData___  = (data) => {
      if(data.employee == null || data.employee == ""){
        return "Field ID Cannot be null"

      }
      else if(data.totalworkinghrs < 4 && data.totalworkinghrs > 0){
        return "Total working hours should be greater or equal to 4"
      }
      else if(data.totalworkinghrs <= 0){
        return "Clock out should be greater than Clock in"
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
        title="Attendence List"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              workingHrs(newData);
              const error = validateData___(newData);
                if (error != null){
                  reject();
                  setState({ ...state, open: true,error:error });
                }
                else{
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertAttendence(newData)
                resolve();
              }, 1000)}
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              workingHrs(newData);
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
                props.updateAttendence(newData)
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
                props.deleteAttendence(oldData.id)
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
        insertAttendence: (payload) => dispatch(insertAttendence(payload)),
        updateAttendence: (payload) => dispatch(updateAttendence(payload)),
        deleteAttendence: (attId) => dispatch(deleteAttendence(attId))
    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'attendence'}
  ])) (AttendenceList)