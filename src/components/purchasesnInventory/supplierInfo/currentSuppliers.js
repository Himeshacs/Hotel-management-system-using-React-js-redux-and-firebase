import React from 'react'
import MaterialTable from 'material-table'
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { insertSupplierInfo, updateSupplierInfo, deleteSupplierInfo} from '../../../redux/actions/PnIActions/SupplierList';
// import headerPnI from '../headerPnI';

 function AddSuppliers(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Supplier ID', field: 'sId' },
      { title: 'First Name', field: 'firstName' },
      { title: 'Last Name', field: 'lastName' },
      { title: 'Email', field: 'email' },
      { title: 'Phone', field: 'phone' },
      { title: 'Supplier Item Type', field: 'itemtype'},
      {title: 'Unit Price', field: 'unitprice'},
      { title: 'Location', field: 'location'},
      { title: 'Department', field: 'department'},
      { title: 'Date', field: 'date'},
    ]); 
    const supplier = useSelector(state => state.firestore.ordered.supplier)
    const data = supplier ? (supplier.map(sup => ({...sup}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Current Suppliers"
        columns={columns}
        data={data}
        editable={{
          // onRowAdd: newData =>
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       props.insertSupplierInfo(newData)  
          //       resolve();
          //     }, 1000)
          //   }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.sId;
                dataUpdate[index] = newData;
                console.log(newData,oldData)
                props.updateSupplierInfo(newData)
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.sId;
                dataDelete.splice(index, 1);
                console.log(oldData)
                props.deleteSupplierInfo(oldData.sId)
                resolve()
              }, 1000)
            }),
        }}
      />
    ) : (<div>Loading</div>)


  

  
    return(
        <div>
             {table}
        </div>
       
        )
  }
 
const mapDispatchToProps = (dispatch) => {
    return {
        updateSupplierInfo: (payload) => dispatch(updateSupplierInfo(payload)),
        insertSupplierInfo: (payload) => dispatch(insertSupplierInfo(payload)),
        deleteSupplierInfo: (supplierId) => dispatch(deleteSupplierInfo(supplierId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'supplier'}
  ])) (AddSuppliers)