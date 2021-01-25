import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { deleteBarProduct, insertBarProduct, updateBarProduct } from '../../redux/actions/FnBServiceActions/BarInventoryAction';

function EnterBarInventoryItem(props) {

  const { useState } = React;
  const BarInvNo = props.BarInvNo
  const [columns, setColumns] = useState([

//     { title: 'ProductID', field: 'id' }, 
//     { title: 'ID', field: 'orderNo',initialEditValue:orderNo ,editable: 'never'},
//     { title: 'ProductName', field: 'ProName'},
//     { title: 'Quantity', field: 'quantity', type :'numeric', filtering: false },
//     { title: 'Amount', field: 'amount', type :'numeric', filtering: false },
//     { title: 'orderProductID', field: 'OPId',editable: 'never'
//     // initialEditValue: 'orderNo+id'
//   }, 
  { title: 'product ID', field: 'id' },
  { title: 'BarInventory ID', field: 'BarInvNo',initialEditValue:BarInvNo ,editable: 'never' },
          { title: 'Product Name', field: 'itemName' },
          { title: 'Price', field: 'price',type :'numeric', filtering: false},
          { title: 'Quantity', field: 'qty',type :'numeric', filtering: false},
        //   { title: 'Last Modified', field: 'lastModified' },
          { title: 'BarInventoryProduct ID', field: 'BIID',editable: 'never'}
        //   { title: 'Stock Status', field: 'stkStatus'},

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

  
  const InvPro = useSelector(state => state.firestore.ordered.inventoryProducts)
  const datacopy = InvPro ? (InvPro.map(InvPro => ({ ...InvPro }))) : (null)
  const data = datacopy ? (datacopy.filter(data => data.BarInvNo == BarInvNo)) : datacopy
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
    // else if(data.BarInvNo == null || data.BarInvNo == ""){
    //   return "Field Bar Inventory ID Cannot be null"

    // }
    else if(data.id.length != 5 ){
      return "Field ID sould contain 5 characters"

    }
    else if(data.itemName == null || data.itemName == ""){
      return "Field Name Cannot be null"
    }
    else if(data.qty == null || data.qty == ""){
      return "Field quantity Cannot be null"
    }
    else if(data.price == null || data.price == ""){
      return "Field price Cannot be null"
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
            data.BIID = data.id + data.BarInvNo;
            newData.BIID = newData.id + newData.BarInvNo;
            const error = validateData___(newData);
            if (error != null){
              setState({ ...state, open: true,error:error });
              reject();
            }
            else{
              setTimeout(() => {
                console.log(data)
                // alert(JSON.stringify(newData.OPId));
                props.insertBarProduct(newData);
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
            newData.BIID = newData.id + newData.BarInvNo;
            const error = validateData___(newData);
            if (error != null){
              reject();
              setState({ ...state, open: true,error:error });
            }
            else{
              setTimeout(() => {
                const dataUpdate = [...data];
              const index = oldData.tableData.BIID;
              dataUpdate[index] = newData;
              //setData([...dataUpdate]);
              console.log(newData, oldData)
              props.updateBarProduct(newData)
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
              const index = oldData.tableData.BIID;
              dataDelete.splice(index, 1);
              //setData([...dataDelete]);
              console.log(oldData)
              props.deleteBarProduct(oldData)
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
    updateBarProduct: (payload) => dispatch(updateBarProduct(payload)),
    insertBarProduct: (payload) => dispatch(insertBarProduct(payload)),
    deleteBarProduct: (InvId) => dispatch(deleteBarProduct(InvId))


  }
}
export default compose(connect(null, mapDispatchToProps), firestoreConnect([
  { collection: 'inventoryProducts' }
]))(EnterBarInventoryItem)