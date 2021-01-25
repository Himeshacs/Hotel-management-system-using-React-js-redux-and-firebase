
import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import { updateProductType } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions'
import { insertProductType } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions'
import { deleteProductType } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions'

function EditProductTable(props) {

  

  // .collection('product').get().then((snapshot) =>{
  //   console.log(snapshot.docs);
  // })
  const { useState } = React;
  const orderNo = props.orderNo
  // const products = useSelector(state => state.firestore.ordered.products)
  // const datacopy1 = products ? (products.map(products => ({ ...products }))) : (null)
 
  const [columns, setColumns] = useState([

    { title: 'orderProductID', field: 'OPId',editable: 'never'
    // initialEditValue: 'orderNo+id'
  },
    
    { title: 'ProductName', field: 'ProName'},
    { title: 'Amount', field: 'amount', type :'numeric', filtering: false },
    { title: 'ProductID', field: 'id' }, 
    { title: 'ID', field: 'orderNo',initialEditValue:orderNo ,editable: 'never'},
    { title: 'Quantity', field: 'quantity', type :'numeric', filtering: false },
    { title: 'Volume', field: 'volume', filtering: false },
     

  ]);
  // const [column, setColumn] = useState([

    
  //   { title: 'ProductName', field: 'ProName'},
  //   { title: 'ProductID', field: 'id' }, 
  //   { title: 'Price', field: 'price' },
  //   // lookup: { 1: 'done', 2: 'in pogress' },

  // ]);
  const [state, setState] = React.useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal, open ,error} = state;

  
  const OrderPro = useSelector(state => state.firestore.ordered.orderProducts)
  const datacopy = OrderPro ? (OrderPro.map(OrderPro => ({ ...OrderPro }))) : (null)
  const data = datacopy ? (datacopy.filter(data => data.orderNo == orderNo)) : datacopy
  
  // alert(JSON.stringify(data));
  // const products = useSelector(state => state.firestore.ordered.product)
  // const producteSelector = products ? (products.map(products => ({ ...products }))) : (null)
  // alert(JSON.stringify(producteSelector));
  
//  const Products = product ?(): (null)
// const Products = useSelector(state => state.firestore.ordered.product )
// const ProductsSelector = Products ? (Products.map((C) => {
//   return  <MenuItem value={product.id}>{product.name}</MenuItem>
// })) :(null)
  // ------------------new ----------------

 
  const validateData___  = (data) => {
    if(data.id == null || data.id == ""){
      return "Field ID Cannot be null"

    }
    else if(data.orderNo == null || data.orderNo == ""){
      return "Field ID Cannot be null"

    }
    else if(data.id.length != 5 ){
      return "Field ID sould contain 5 characters"

    }
    else if(data.ProName == null || data.ProName == ""){
      return "Field Name Cannot be null"
    }
    else if((data.quantity == null || data.quantity == "") && (data.volume == null || data.volume == "") ){
      return "Field quantity Cannot be null"
    }
    else if(data.amount == null || data.amount == ""){
      return "Field amount Cannot be null"
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

  
// const OrderPro = useSelector(state => state.firestore.ordered.orderProducts)
//   const data = OrderPro ? (OrderPro.map(OrderPro => ({ ...OrderPro }))) : (null)

  // const orderNo = props.orderNo
  // const OrderPro = useSelector(state => state.firestore.ordered.orderProducts)
  // const datacopy = OrderPro ? (OrderPro.map(OrderPro => ({ ...OrderPro }))) : (null)
  // const data = datacopy ? (datacopy.filter(data => data.orderNo == orderNo)) : datacopy
  const table = data ? (
    
    <MaterialTable style={{ padding: "0px" }}
      title="Editable Preview"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData =>
        
          new Promise((resolve, reject) => {
            data.OPId = data.id + data.orderNo;
            newData.OPId = newData.id + newData.orderNo;
            const error = validateData___(newData);
            if (error != null){
              setState({ ...state, open: true,error:error });
              reject();
            }
            else{
              setTimeout(() => {
                console.log(data)
                // alert(JSON.stringify(newData.OPId));
                props.insertProductType(newData);
                resolve();
              }, 1000)
            }
            // setTimeout(() => {
            //   //setData([...data, newData]);
             
            //   resolve();
            // }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            // newData.OPId = newData.id + newData.orderNo;
            const error = validateData___(newData);
            if (error != null){
              reject();
              setState({ ...state, open: true,error:error });
            }
            else{
              setTimeout(() => {
                const dataUpdate = [...data];
              const index = oldData.tableData.OPId;
              dataUpdate[index] = newData;
              //setData([...dataUpdate]);
              console.log(newData, oldData)
              props.updateProductType(newData)
              resolve();
              }, 1000)
            }


            // setTimeout(() => {
            //   const dataUpdate = [...data];
            //   const index = oldData.tableData.id;
            //   dataUpdate[index] = newData;
            //   //setData([...dataUpdate]);
            //   console.log(newData, oldData)
            //   props.updateProductType(newData)
            //   resolve();
            // }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.OPId;
              dataDelete.splice(index, 1);
              //setData([...dataDelete]);
              console.log(oldData)
              props.deleteProductType(oldData)
              resolve()
            }, 1000)
          }),
      }}
      options={{
          filtering: true,
          headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF',
            borderBottom: '1px solid #333',
          width: '100px',
          boxShadow: "0 10px 5px -2px #888"
          }
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





  return (
    <div style={{ padding_left: "5px" }}>
      {table}
      {feedBackToast}
      
    </div>

  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProductType: (payload) => dispatch(updateProductType(payload)),
    insertProductType: (payload) => dispatch(insertProductType(payload)),
    deleteProductType: (orderId) => dispatch(deleteProductType(orderId))


  }
}
export default compose(connect(null, mapDispatchToProps), firestoreConnect([
  { collection: 'orderProducts' }
]))(EditProductTable)
// ------------------------------------------------------------------------------
// import React from 'react'
// import MaterialTable from 'material-table'
// import { firestoreConnect } from 'react-redux-firebase';
// import { useSelector, connect } from 'react-redux';
// import { compose } from 'redux';

// import { updateProductType } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions'
// import { insertProductType } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions'
// import { deleteProductType } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions'

// function EditProductTable(props) {

//   const { useState } = React;
//   const [columns, setColumns] = useState([
//     { title: 'ProductID', field: 'id' }, // defaultGroupOrder: 0 
//     { title: 'ProductName', field: 'ProName' },
//     { title: 'Quntity', field: 'quntity', type :'numeric', filtering: false },
//     { title: 'Amount', field: 'amount', type :'numeric', filtering: false },

//   ]);
//   const OrderPro = useSelector(state => state.firestore.ordered.orderProducts)
//   const data = OrderPro ? (OrderPro.map(OrderPro => ({ ...OrderPro }))) : (null)
//   const table = data ? (
//     <MaterialTable style={{ padding: "0px" }}
//       title="Editable Preview"
//       columns={columns}
//       data={data}
//       editable={{
//         // onRowAdd: newData =>
//         //   new Promise((resolve, reject) => {
//         //     setTimeout(() => {
//         //       //setData([...data, newData]);
//         //       props.insertOrderType(newData);
//         //       resolve();
//         //     }, 1000)
//         //   }),
//         onRowUpdate: (newData, oldData) =>
//           new Promise((resolve, reject) => {
//             setTimeout(() => {
//               const dataUpdate = [...data];
//               const index = oldData.tableData.id;
//               dataUpdate[index] = newData;
//               //setData([...dataUpdate]);
//               console.log(newData, oldData)
//               props.updateProductType(newData)
//               resolve();
//             }, 1000)
//           }),
//         onRowDelete: oldData =>
//           new Promise((resolve, reject) => {
//             setTimeout(() => {
//               const dataDelete = [...data];
//               const index = oldData.tableData.id;
//               dataDelete.splice(index, 1);
//               //setData([...dataDelete]);
//               console.log(oldData)
//               props.deleteProductType(oldData.id)
//               resolve()
//             }, 1000)
//           }),
//       }}
//       options={{
//           filtering: true
//           }}
//     />
//   ) : (<div>Loading</div>)





//   return (
//     <div style={{ padding_left: "5px" }}>
//       {table}
//     </div>

//   )
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateProductType: (payload) => dispatch(updateProductType(payload)),
//     insertProductType: (payload) => dispatch(insertProductType(payload)),
//     deleteProductType: (orderId) => dispatch(deleteProductType(orderId))


//   }
// }
// export default compose(connect(null, mapDispatchToProps), firestoreConnect([
//   { collection: 'orderProducts' }
// ]))(EditProductTable)
