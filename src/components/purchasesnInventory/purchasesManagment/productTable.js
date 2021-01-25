import React from 'react'
import MaterialTable from 'material-table'
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {insertProduct, updateProduct, deleteProduct} from '../../../redux/actions/PnIActions/productHandler';

// import headerPnI from '../headerPnI';

 function ProductTable(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Product ID', field: 'pId'},
      { title: 'Product Name', field: 'pType' },
      {title: 'Supplier Name', field: 'sName'},
      {title:'Quantity', field: 'qty'},
      {title: 'Priority', field: 'qty'},
      {title: 'Date', field: 'date'}
      
    ]); 
    const Pro = useSelector(state => state.firestore.ordered.productMng)
    const data = Pro ? (Pro.map(pro => ({...pro}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Purchases Order"
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
        insertProduct: (payload) => dispatch(insertProduct(payload)),
        updateProduct: (payload) => dispatch(updateProduct(payload)),
        deleteProduct: (productId) => dispatch(deleteProduct(productId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'productMng'}
  ])) (ProductTable)