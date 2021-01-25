import React from 'react'
import MaterialTable from 'material-table'

import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import {updateBarInvoice} from '../../../redux/actions/financeActions/BarInvoiceActions'
import {insertBarInvoice} from '../../../redux/actions/financeActions/BarInvoiceActions'
import {deleteBarInvoice} from '../../../redux/actions/financeActions/BarInvoiceActions'

 function BarInvoice(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Invoice No', field: 'barInvoice' },
        //{ title: 'Date', field: 'date' },
        { title: 'Prepared BY', field: 'preparedBy' },
        { title: 'Customer Type', field: 'customerType', lookup: {30: 'Guest', 31: 'Non-Guest'}},
        { title: 'Invoice Amount', field: 'invoiceAmount', type:'numeric' },
        { title: 'Service Charges', field: 'serviceCharges', type:'numeric'},
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
      if(data.barInvoice == null || data.barInvoice === ""){
        return "Invoice ID Cannot be Null"
      }

      else if(data.barInvoice.length !== 5 || data.barInvoice.length > 5 ){
        return "Invoice ID should contain 5 chars"
      }

      if(data.preparedBy == null || data.preparedBy === ""){
        return "Field Cannot be Null"
      }

      else if(data.preparedBy.length !== 5 || data.preparedBy.length > 5 ){
        return "ID should contain 5 chars"
      }

      else if(data.invoiceAmount == null || data.invoiceAmount === ""){
        return "Invoice Amount Cannot be Null"
      }
      
      else if(data.invoiceAmount <= 0){
          return "Invoice Amount Value should be Greater than 0"
      }

      else if(data.serviceCharges == null || data.serviceCharges === ""){
        return "Service Charges Cannot be Null"
      }
      
      else if(data.serviceCharges <= 0){
          return "Service Charges Value should be Greater than 0"
      }

      else if(data.tax == null || data.tax === ""){
        return "Tax Amount Cannot be Null"
      }
      
      else if(data.tax <= 0){
          return "Tax Amount Value should be Greater than 0"
      }

      //else if(data.quantity !== [0-9][0-9]){
       //   return "Enter Only Numeric Values"
      //}

      else
      return null;
    }

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };


    const barin = useSelector(state => state.firestore.ordered.barInvoice)
    const data = barin ? (barin.map(barin => ({...barin}))) : (null)
    
    const table = data ? (
        <MaterialTable
        title="Bar Invoices"
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
                  props.insertBarInvoice(newData);
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
                  props.updateBarInvoice(newData)
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
                props.deleteBarInvoice(oldData.id)
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
        updateBarInvoice: (payload) => dispatch(updateBarInvoice(payload)),
        insertBarInvoice: (payload) => dispatch(insertBarInvoice(payload)),
        deleteBarInvoice: (barInvoice) => dispatch(deleteBarInvoice(barInvoice))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'barInvoice'}
  ])) (BarInvoice)


 // export default BarInvoice