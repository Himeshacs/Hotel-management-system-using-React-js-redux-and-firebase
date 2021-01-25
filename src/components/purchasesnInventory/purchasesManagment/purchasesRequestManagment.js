import React from 'react'
import MaterialTable from 'material-table'
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {insertPurchasesRequest, updatePurchasesRequest, deletePurchasesRequest} from '../../../redux/actions/PnIActions/requestHandler';

// import headerPnI from '../headerPnI';

 function PurchasesRequestManagement(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Product ID', field: 'pId'},
      { title: 'Product Name', field: 'pType' },
      { title: 'Department', field: 'department' },
      { title: 'Priority', field: 'priority' },
      { title: 'Quantity', field: 'qty'},
      { title: 'Date', field: 'date'}
    ]); 
    const Req = useSelector(state => state.firestore.ordered.request)
    const data = Req ? (Req.map(req => ({...req}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Purchases Request Management"
        columns={columns}
        data={data}
        editable={{
          // onRowAdd: newData =>
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       //setData([...data, newData]);
          //       props.insertPurchasesRequest(newData)
                
          //       resolve();
          //     }, 1000)
          //   }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.pId;
                dataUpdate[index] = newData;
                //setData([...dataUpdate]);
                console.log(newData,oldData)
                props.updatePurchasesRequest(newData)
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.pId;
                dataDelete.splice(index, 1);
                //setData([...dataDelete]);
                console.log(oldData)
                props.deletePurchasesRequest(oldData.pId)
                resolve()
              }, 1000)
            }),
        }}
      />
    ) : (<div>Loading</div>)


  

  
    return(
        <div>
          {/* <headerPnI /> */}
             {table}
        </div>
       
        )
  }
 
const mapDispatchToProps = (dispatch) => {
    return {
        insertPurchasesRequest: (payload) => dispatch(insertPurchasesRequest(payload)),
        updatePurchasesRequest: (payload) => dispatch(updatePurchasesRequest(payload)),
        deletePurchasesRequest: (purchaseId) => dispatch(deletePurchasesRequest(purchaseId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'request'}
  ])) (PurchasesRequestManagement)