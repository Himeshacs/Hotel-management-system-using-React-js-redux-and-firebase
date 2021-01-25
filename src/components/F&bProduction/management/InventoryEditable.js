import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import { insertInvRec, deleteInvRec, updateInvRec } from '../../../redux/actions/fnbProductionActions/fnbInventoryActions';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

    function InventoryEditable(props) {

        const { useState } = React;
        const [columns, setColumns] = useState([
          { title: 'ID', field: 'id', editable: 'onAdd' },
          { title: 'Item Name', field: 'itemName' },
          { title: 'Unit Price (LKR)', field: 'unitPrice', type: 'numeric'},
          { title: 'Quantity', field: 'qty', type: 'numeric'},
          { title: 'Stock Value', field: 'total', editable:'never'},
          { title: 'Expiry Date', field: 'expDate', type:'date'},
          { title: 'Last Modified', field: 'lastModified' , type:'date', editable:'never', default:new Date() },
          { title: 'Stock Status', field: 'stkStatus', lookup: { 1: 'Out of Stock', 2: 'Low', 3: 'Adequate', 4: 'High' }},
        ]); 

        const validateData___  = (data) => {
          if(data.id == null || data.id == ""){
            return "Field ID Cannot be null"
      
          }
          else if(data.id.length != 5 ){
            return "Field ID sould contain 5 characters"
      
          }
          else if(data.itemName == null || data.itemName == ""){
            return "Field Item Name Cannot be null"
          }
          else if(data.unitPrice == null || data.unitPrice == ""){
            return "Field Unit Price Cannot be null"
          }
          else if(data.qty == null || data.qty == ""){
            return "Field Quantity cannot be null"
          }
          else if(data.expDate == null || data.expDate == ""){
            return "Field Expiry Date cannot be null"
          }
          else if(data.stkStatus == null || data.stkStatus == ""){
            return "Field Stock Status cannot be null"
          }          
          else
          return null;
        }
      
        const [state, setState] = React.useState({
          open: false,
          vertical: 'bottom',
          horizontal: 'right',
        });
      
        const { vertical, horizontal, open ,error} = state;
      
        const handleClose = () => {
          setState({ ...state, open: false });
        };
      
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
      
        const fnbInv = useSelector(state => state.firestore.ordered.fnbInventory)
        const data = fnbInv ? (fnbInv.map(fnb_Inv => ({...fnb_Inv,total:parseFloat(fnb_Inv.qty)*parseFloat(fnb_Inv.unitPrice)}))) : (null)
        const table = data ? (
            <MaterialTable
            title="Inventory List"
            columns={columns}
            data={data}
            editable={{
              onRowAdd: newData =>
                new Promise((resolve, reject) => {
                  const error = validateData___(newData);
                  if (error != null){
                    setState({ ...state, open: true,error:error });
                    reject();
                  }
                  else{
                  setTimeout(() => {
                    // setData([...data, newData]);
                    props.insertInvRec(newData);
                    
                    resolve();
                  }, 1000)}
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  const error = validateData___(newData);
                  if (error != null){
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
                    props.updateInvRec(newData)
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
                    props.deleteInvRec(oldData.id)
                    resolve()
                  }, 1000)
                }),
            }}
          />
        ) : (<div>Loading</div>)
   
        return(
            <div>
                 {table}
                 {feedBackToast}
            </div>
           
            )
      }
     
    const mapDispatchToProps = (dispatch) => {
        return {
            updateInvRec: (payload) => dispatch(updateInvRec(payload)),
            insertInvRec: (payload) => dispatch(insertInvRec(payload)),
            deleteInvRec: (InventoryId) => dispatch(deleteInvRec(InventoryId))    
        }
    }
      export default compose(connect(null,mapDispatchToProps),firestoreConnect([
        {collection: 'fnbInventory'}
      ])) (InventoryEditable)
