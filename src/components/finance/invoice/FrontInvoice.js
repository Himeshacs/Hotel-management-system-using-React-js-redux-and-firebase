import React from 'react'
import MaterialTable from 'material-table'

import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';


import {updateFrontInvoice} from '../../../redux/actions/financeActions/FrontInvoiceActions'
import {insertFrontInvoice} from '../../../redux/actions/financeActions/FrontInvoiceActions'
import {deleteFrontInvoice} from '../../../redux/actions/financeActions/FrontInvoiceActions'

 function FrontInvoice(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Invoice No', field: 'frontInvoice' },
        //{ title: 'Date', field: 'date' },
        { title: 'Prepared BY', field: 'preparedBy' },
        { title: 'Customer Type', field: 'customerType', lookup: {30: 'Guest', 31: 'Non-Guest'}},
        { title: 'Reservation ID', field: 'reservationID'},
        { title: 'Guest ID', field: 'guestID' },
        { title: 'Room Charges', field: 'roomCharges', type:'numeric'},
        { title: 'Housekeeping Charges', field: 'houseCharges', type:'numeric'},
        { title: 'F&B Charges', field: 'fnbCharges',type:'numeric'},
        { title: 'Shuttle Charges', field: 'shuttleCharges',type:'numeric'},
        { title: 'Service Charges', field: 'serviceCharges', type:'numeric'},
        { title: 'Other Charges', field: 'otherCharges', type:'numeric'},
        { title: 'Payment Type', field: 'paymentType', lookup:{30:'Cash', 31:'Card'}},
        { title: 'Tax %', field: 'tax', type:'numeric'},
        { title: 'Total Amount', field: 'totalAmount', type:'numeric'},
       
    ]); 
    const [state, setState] = React.useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
    });
    const { vertical, horizontal, open ,error} = state;

    const validateData___  = (data) => {
      if(data.frontInvoice == null || data.frontInvoice === ""){
        return "Invoice ID Cannot be Null"
      }

      else if(data.frontInvoice.length !== 5 || data.frontInvoice.length > 5 ){
        return "Invoice ID should contain 5 chars"
      }

      if(data.preparedBy == null || data.preparedBy === ""){
        return "Field Cannot be Null"
      }

      else if(data.preparedBy.length !== 5 || data.preparedBy.length > 5 ){
        return "ID should contain 5 chars"
      }

      if(data.reservationID == null || data.reservationID === ""){
        return "Reservation ID Cannot be Null"
      }

      else if(data.reservationID.length !== 5 || data.rereservationIDquestID.length > 5 ){
        return "Reservation ID should contain 5 chars"
      }

      if(data.guestID == null || data.guestID === ""){
        return "Guest ID Cannot be Null"
      }

      else if(data.guestID.length !== 5 || data.guestID.length > 5 ){
        return "Guest ID should contain 5 chars"
      }

      else if(data.roomCharges == null || data.roomCharges === "" || data.roomCharges < 0){
        return "Room Charges Cannot be Null or Minus"
      }

      else if(data.houseCharges == null || data.houseCharges === "" || data.houseCharges < 0){
        return "House Charges Cannot be Null or Minus"
      }

      else if(data.fnbCharges == null || data.fnbCharges === "" || data.fnbCharges < 0){
        return "F&B Charges Cannot be Null or Minus"
      }

      else if(data.shuttleCharges == null || data.shuttleCharges === "" || data.shuttleCharges < 0){
        return "Shuttle Charges Cannot be Null or Minus"
      }

      else if(data.serviceCharges == null || data.serviceCharges === "" || data.serviceCharges < 0){
        return "Service Charges Cannot be Null or Minus"
      }

      else if(data.otherCharges == null || data.otherCharges === "" || data.otherCharges < 0){
        return "Other Charges Cannot be Null or Minus"
      }

      else if(data.tax == null || data.tax === "" || data.tax < 0){
        return "Tax Charges Cannot be Null or Minus"
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
    
    const frontin = useSelector(state => state.firestore.ordered.frontInvoice)
    const data = frontin ? (frontin.map(frontin => ({...frontin}))) : (null)
    
    const table = data ? (
        <MaterialTable
        title="Front-Office Invoices"
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
                  props.insertFrontInvoice(newData);
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
                  props.updateFrontInvoice(newData)
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
                props.deleteFrontInvoice(oldData.id)
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
        updateFrontInvoice: (payload) => dispatch(updateFrontInvoice(payload)),
        insertFrontInvoice: (payload) => dispatch(insertFrontInvoice(payload)),
        deleteFrontInvoice: (frontInvoice) => dispatch(deleteFrontInvoice(frontInvoice))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'frontInvoice'}
  ])) (FrontInvoice)


 /// export default FrontInvoice