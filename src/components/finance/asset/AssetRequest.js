//import {CalculatedField} from '@syncfusion/ej2-react-pivotview';
import React from 'react'
import ReactDOM from 'react-dom';
import MaterialTable from 'material-table'
//import Moment from 'react-moment';
//import AssetReqForm from './AssetReqForm';
//import rowData from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import {updateAssetRequest} from '../../../redux/actions/financeActions/AssetRequestActions'
import {insertAssetRequest} from '../../../redux/actions/financeActions/AssetRequestActions'
import {deleteAssetRequest} from '../../../redux/actions/financeActions/AssetRequestActions'


 function AssetRequest(props) {
  
    
    //var dateString = 'date';
    //var dateObj = new Date(dateString);
    //var momentObj = Moment(dateObj);
    //var momentString = momentObj.format('YYYY-MM-DD');
   
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Request ID', field: 'requestID' },
      //{ title: 'Request Date', field: 'date', type: 'date' },
      { title: 'Asset Type', field: 'assetType', 
      lookup: { 33: 'Machinery', 34: 'Investments', 35: 'Inventory', 36: 'Furniture', 37: 'Vehicle', 38: 'Buidling' }},
      { title: 'Description', field: 'description' },
      { title: 'Quantity', field: 'quantity', type:'numeric'},
      { title: 'Unit Price', field: 'unitPrice', type:'numeric'},
      { title: 'Total Amount', field: 'totalAmount', type:'numeric'},
      { title: 'Status', field: 'status', lookup: { 33: 'Requested', 34: 'Pending', 35: 'Rejected', 36: 'Accepted', 37: 'Purchased' }},
    ]); 

    const [state, setState] = React.useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
    });
    const { vertical, horizontal, open ,error} = state;

    const validateData___  = (data) => {
      if(data.requestID == null || data.requestID === ""){
        return "Request ID Cannot be Null"
      }

      else if(data.requestID.length !== 5 || data.requestID.length > 5 ){
        return "Request ID should contain 5 chars"
      }
      else if(data.quantity == null || data.quantity === ""){
        return "Quantity Cannot be Null"
      }
      
      else if(data.quantity <= 0){
          return "Quantity Value should be Greater than 0"
      }

      //else if(data.quantity !== [0-9][0-9]){
       //   return "Enter Only Numeric Values"
      //}

      else if(data.unitPrice == null || data.unitPrice === "" || data.unitPrice <= 0){
        return "Unit Price Cannot be null"
      }

      else if(data.unitPrice <= 0){
        return "Unit Price should be Greater than 0"
      }

      else if(data.description == null || data.description === ""){
        return "Description cannot be Null"
      }

      else if(data.description.length <= 5){
        return "Description Length is Short"
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

    const assreq = useSelector(state => state.firestore.ordered.assetRequest)
    const data = assreq ? (assreq.map(assreq => ({...assreq}))) : (null)
    
    const table = data ? (
        <MaterialTable
        title="Asset Requests"
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
                props.insertAssetRequest(newData);
                resolve();
              }, 1000)}
              
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
                  props.updateAssetRequest(newData)
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
                props.deleteAssetRequest(oldData.id)
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
        updateAssetRequest: (payload) => dispatch(updateAssetRequest(payload)),
        insertAssetRequest: (payload) => dispatch(insertAssetRequest(payload)),
        deleteAssetRequest: (requestID) => dispatch(deleteAssetRequest(requestID))

    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'assetRequest'}
  ])) (AssetRequest)


 // export default AssetRequest