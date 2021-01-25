
// import React from 'react'
// import MaterialTable from 'material-table'
// import { firestoreConnect, isLoaded } from 'react-redux-firebase';
// import { useSelector, connect } from 'react-redux';
// import { compose } from 'redux';
// import { makeStyles } from '@material-ui/core/styles';
// import EditProductTable from './EditProductTable';
// import { deleteProductType, updateProductType } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions';
// import { render } from 'react-dom';



// const useStyles = makeStyles((theme) => ({
//   root: {
//     padding: '2px 4px',
//     display: 'flex',
//     alignItems: 'center',
//     width: 400,
//   },
//   input: {
//     marginLeft: theme.spacing(1),
//     flex: 1,
//   },
//   iconButton: {
//     padding: 10,
//   },
//   divider: {
//     height: 28,
//     margin: 4,
//   },
//   outerDiv: {
//     display: "flex",
//     justifyContent: "space-around"
//   }, margin: {
//     margin: theme.spacing(1),
//   },
// }));



// function FeedBackTable(props) {
  
//   const { useState } = React;
//   const [columns, setColumns] = useState([

//     { title: 'ID', field: 'orderNo' },
//     { title: 'TableNO', field: 'tableNO'/*, filtering: false*/ },
//     {
//       title: 'RoomNO',
//       field: 'room',
//     },
//     {
//       title: 'Description',
//       field: 'descriptions'
//       /* ,filtering: false*/
//     },
//     {
//       title: 'Status',
//       field: 'status',
//       lookup: { 1: 'done', 2: 'in pogress' },
      
//     },
//     {
//       title: 'Date',
//       field: 'date'           
      
//     } 

//   ]);
//   const [descriptionButtonHidden, setDescriptionButtonHidden] = React.useState(true)
//   const [state, setState] = React.useState({
//     open: false,
//     vertical: 'bottom',
//     horizontal: 'right',
//   });
//   const { vertical, horizontal, open, error } = state;
//   const classes = useStyles();



//   const feedbacks = useSelector(state => state.firestore.ordered.foodOrder)

//   const data = feedbacks ? (feedbacks.map(feedback => ({ ...feedback }))) : (null)
//   // const data = datacopy ? (datacopy.filter(data => data.status != 1)) : datacopy



//   // const handleChangeOfDescription = (event) => {
//   //   if (descriptionButtonHidden == false) {
//   //     setDescriptionButtonHidden(true)
//   //   }
//   // }
//   // const { useState } = React;
//   // const [columns, setColumns] = useState([

//   //   { title: 'ID', field: 'orderNo' },
//   //   { title: 'TableNO', field: 'tableNO'/*, filtering: false*/ },
//   //   {
//   //     title: 'RoomNO',
//   //     field: 'room',
//   //   },
//   //   {
//   //     title: 'Description',
//   //     field: 'descriptions'
//   //     /* ,filtering: false*/
//   //   },
//   //   {
//   //     title: 'Status',
//   //     field: 'status',
//   //     lookup: { 1: 'done', 2: 'in pogress' },
      
//   //   },
//   //   {
//   //     title: 'Date',
//   //     field: 'date'           
      
//   //   } 

//   // ]);
//   const table = data ? (
    
//     <MaterialTable style={{ padding: "0px" }}
//       title="Editable Preview"
//       columns={columns}
//       data={data}
//       editable={{
//           onRowUpdate: (newData, oldData) =>
//               new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                   const dataUpdate = [...data];
//                   const index = oldData.tableData.id;
//                   dataUpdate[index] = newData;
//                   //setData([...dataUpdate]);
//                   console.log(newData, oldData)
//                   props.updateProductType(newData)
//                   resolve();
//                 }, 1000)
//               }),
//             onRowDelete: oldData =>
//               new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                   const dataDelete = [...data];
//                   const index = oldData.tableData.id;
//                   dataDelete.splice(index, 1);
//                   //setData([...dataDelete]);
//                   console.log(oldData)
//                   props.deleteProductType(oldData.id)
//                   resolve()
//                 }, 1000)
//               }),
              
//       }}
//       options={{
//           filtering: true
//           }}
//     />
//   ) : (<div>Loading</div>)

//   // -------------

//             render: rowData => {
//               return (
//                 <div>
//                   <EditProductTable orderNo={rowData.orderNo} />
//                 </div>
//               )
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateProductType: (payload) => dispatch(updateProductType(payload)),
//     deleteProductType: (orderId) => dispatch(deleteProductType(orderId))
//   }
// }

// export default compose(connect(null, mapDispatchToProps), firestoreConnect([
//   { collection: 'foodOrder' }
//   // { collection: 'customer' }
// ]))(FeedBackTable)

//-----------------------------jkadslfd----
import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';


import MenuBookIcon from '@material-ui/icons/MenuBook';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import { Button, FormControl } from '@material-ui/core';


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import EditProductTable from './EditProductTable';
import OrderForm from './OrderForm';
import { deleteOrderType, updateOrderType } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  outerDiv: {
    display: "flex",
    justifyContent: "space-around"
  }, margin: {
    margin: theme.spacing(1),
  },
}));



function FeedBackTable(props) {


  const [descriptionButtonHidden, setDescriptionButtonHidden] = React.useState(true)
  const [state, setState] = React.useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal, open, error } = state;
  const classes = useStyles();



  const feedbacks = useSelector(state => state.firestore.ordered.foodOrder)

  const data = feedbacks ? (feedbacks.map(feedback => ({ ...feedback }))) : (null)
  // const err = getID(data);
  // const getID = (data) =>{
  //   const ID='00000';
  //     while(data.orderNo){
  //      const ID=data.orderNo;  
        
  //     }
  //     alert(JSON.stringify( ID+1));
  //     return ID+1;
  // }
  // const data = datacopy ? (datacopy.filter(data => data.status != 1)) : datacopy
  //  alert(JSON.stringify(data));


  const handleChangeOfDescription = (event) => {
    if (descriptionButtonHidden == false) {
      setDescriptionButtonHidden(true)
    }
  }



  if (feedbacks) {
    return (

      <MaterialTable
        title="Multiple Detail Panels Preview"
        columns={[
          { title: 'ID', field: 'orderNo',editable: 'never' },
          { title: 'TableNO', field: 'tableNO'/*, filtering: false*/, },
          {
            title: 'RoomNO',
            field: 'room',
          },
          {
            title: 'Description',
            field: 'descriptions'
            /* ,filtering: false*/
          },
          {
            title: 'Status',
            field: 'status',
            lookup: { 1: 'done', 2: 'in pogress' },
            
          },
          {
            title: 'Date',
            field: 'date'           
            
          }
          
        ]}
        editable={{
           onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.orderNo;
              dataUpdate[index] = newData;
              //setData([...dataUpdate]);
              console.log(newData, oldData)
              props.updateOrderType(newData)
              resolve();
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.orderNo;
              dataDelete.splice(index, 1);
              //setData([...dataDelete]);
              console.log(oldData)
              props.deleteOrderType(oldData)
              resolve()
            }, 1000)
          }),
          Action: props => (
            <Button
              onClick={(event) => props.action.onClick(event, props.data)}
              color="primary"
              variant="contained"
              style={{textTransform: 'none'}}
              size="small"
            >
              My Button
            </Button>
          ),
        }}
        // actions={[
        //   {
        //     icon: 'save',
        //     tooltip: 'Save User',
        //     onClick: (event, rowData) => alert("You saved " + rowData.orderNo)
        //   }
        // ]}
        
        
      //  onRowUpdate: (newData, oldData) =>
      //     new Promise((resolve, reject) => {
      //       setTimeout(() => {
      //         const dataUpdate = [...data];
      //         const index = oldData.tableData.id;
      //         dataUpdate[index] = newData;
      //         //setData([...dataUpdate]);
      //         console.log(newData, oldData)
      //         props.updateProductType(newData)
      //         resolve();
      //       }, 1000)
      //     }),
      //   onRowDelete: oldData =>
      //     new Promise((resolve, reject) => {
      //       setTimeout(() => {
      //         const dataDelete = [...data];
      //         const index = oldData.tableData.id;
      //         dataDelete.splice(index, 1);
      //         //setData([...dataDelete]);
      //         console.log(oldData)
      //         props.deleteProductType(oldData.id)
      //         resolve()
      //       }, 1000)
      //     }),
      // }}
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
        data={data}
        detailPanel={[
          {
            tooltip: 'Show Description',
            render: rowData => {
              return (
                <div>
                  <EditProductTable orderNo={rowData.orderNo} />                  
                </div>
              )
            },
          },
        ]}
        actions={[
          {
            icon: 'Button',
            tooltip: 'create a bill',
            onClick: (event, rowData) => alert("You saved " + rowData.orderNo)
          }
        ]}
        
      />
    )
  }
  else
    return   <div>loading</div>
   
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateOrderType: (payload) => dispatch(updateOrderType(payload)),
    deleteOrderType: (orderId) => dispatch(deleteOrderType(orderId))
  }
}
export default compose(connect(null, mapDispatchToProps), firestoreConnect([
  { collection: 'foodOrder' },
  { collection: 'customer' }
]))(FeedBackTable)
//-----------------------------------------------------new from----------
// import React from 'react';
// import MaterialTable from 'material-table'
// import { firestoreConnect } from 'react-redux-firebase';
// import { useSelector, connect } from 'react-redux';
// import { compose } from 'redux';

// import Button from '@material-ui/core/Button'
// import Snackbar from '@material-ui/core/Snackbar'
// import MuiAlert from '@material-ui/lab/Alert'
// import EditProductTable from './EditProductTable';

// function FoodOrderTable() {


//     const foodOrder = useSelector(state => state.firestore.ordered.foodOrder)    
//     const data = foodOrder ? (foodOrder.map(order => ({...order}))) : (null)

//   return (
//     <MaterialTable
//       columns={[
//         // { title: 'Name', field: 'id' },
//         // { title: 'Surname', field: 'orderNo' },
//         // { title: 'Birth Year', field: 'room', type: 'numeric' },
//         // {
//         //   title: 'Birth Place',
//         //   field: 'tableNo',
//         //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
//         // },
//         { title: 'ID', field: 'orderNo' },
//             { title: 'TableNO', field: 'tableNO'/*, filtering: false*/ },
//             {
//               title: 'RoomNO',
//               field: 'room',
//             },
//             {
//               title: 'Description',
//               field: 'descriptions'
//               /* ,filtering: false*/
//             },
//             {
//               title: 'Status',
//               field: 'status',
//             }
//       ]}
//       data={data}
//       title="Detail Panel With RowClick Preview"
//       detailPanel={rowData => {
//         return (
//           <div></div>
//           //<EditProductTable orderNo={rowData.orderNo}/>
//         )
//       }}
//       onRowClick={(event, rowData, togglePanel) => togglePanel()}
//     />
//   )
// }

// export default compose(connect(null,null),firestoreConnect([
//     {collection: 'foodOrder'}
//   ])) (FoodOrderTable)