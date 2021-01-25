import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import {insertAbsenceType, updateAbsenceType, deleteAbsenceType} from '../../../redux/actions/hrActions/AbsenceTypeActions'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function AbsenceTypeList(props) {
 
    const classes = useStyles();
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Absence Type Id', field: 'id'
    },
      { title: 'Description', field: 'description' },
      { title: 'Limit', field: 'limit'},
      
    ]);
    const absencetypes = useSelector(state => state.firestore.ordered.absencetype)
    const data = absencetypes ? (absencetypes.map(absencetype => ({...absencetype}))) : (null)

    const [state, setState] = React.useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
    });
    const { vertical, horizontal, open ,error} = state


    const validateData___  = (data) => {
      if(data.id == null || data.id == ""){
        return "Field ID Cannot be null"
      }
      else if(data.limit == null || data.limit == ""){
        return "Field LIMIT Cannot be null"
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
        title="Absence Types"
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
                props.insertAbsenceType(newData)
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
                props.updateAbsenceType(newData)
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
                props.deleteAbsenceType(oldData.id)
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
        insertAbsenceType: (payload) => dispatch(insertAbsenceType(payload)),
        updateAbsenceType: (payload) => dispatch(updateAbsenceType(payload)),
        deleteAbsenceType: (abTypeId) => dispatch(deleteAbsenceType(abTypeId))
    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'absencetype'}
  ])) (AbsenceTypeList)