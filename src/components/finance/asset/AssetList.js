// import React from 'react';
// import Moment from 'react-moment';
// //import {AgGridReact} from 'ag-grid-react';
// //import {Date} from 'prismic-reactjs'
// import MaterialTable from 'material-table'

// import { firestoreConnect } from 'react-redux-firebase';
// import { useSelector, connect } from 'react-redux';
// import { compose } from 'redux';

// import Button from '@material-ui/core/Button';
// import Snackbar from '@material-ui/core/Snackbar';
// import { Alert, AlertTitle } from '@material-ui/lab';
// import { makeStyles } from '@material-ui/core/styles';

// import {updateAssetList} from '../../../redux/actions/financeActions/AssetMgmtActions'
// import {insertAssetList} from '../../../redux/actions/financeActions/AssetMgmtActions'
// import {deleteAssetList} from '../../../redux/actions/financeActions/AssetMgmtActions'

//  function AssetList(props) {
    	
//     //const purchaseDate = Date(document.data.date);
//     //const formattedDate = Moment(purchaseDate).format("LL");

//     const { useState } = React;
//     const [columns, setColumns] = useState([
//         { title: 'Asset ID', field: 'assetID'
//         /*, validate: rowData => rowData.assetID.length < 4 ? 'Asset ID Must Have 5 Chars' : '', */},
//         { title: 'Request ID', field: 'requestID', },
//         { title: 'Department', field: 'department', lookup : 
//         {33:'Front-Office', 34: 'Finance', 35: 'Housekeeping', 36: 'Purchases', 37: 'HR', 38: 'F&B Service', 39: 'F&B Production', 40: 'Maintenance'}},
//         //{ title: 'Purchased Date', field: 'purchaseDate', type:'date'>{Moment(purchaseDate).format('L')}},
//         //{ title: 'Purchased Date', field: 'purchaseDate', type:'date'>{moment(assetList.purchaseDate).format('D/MM/YYYY')}},
//         { title: 'Expected Life Years', field: 'lifeYears', lookup:{30:'<=5 Years', 31:'<=10 Years', 32:'<=15 Years', 33:'>15 Years'}},
//         { title: 'Purchased Value', field: 'purchaseValue', type:'numeric'},
//         { title: 'Amount Depriciated', field: 'depriciation', type:'numeric'},
//         { title: 'Asset Value', field: 'assetValue', type:'numeric'},
//         //{ title: 'Total Amount', field: 'totalAmount'},
//         { title: 'Asset Status', field: 'assetStatus', lookup: {33:'Active', 34:'Inactive', 35:'Discontinued'}},
//     ]); 

//     const [state, setState] = React.useState({
//       open: false,
//       vertical: 'bottom',
//       horizontal: 'right',
//     });
//     const { vertical, horizontal, open ,error} = state;

//     const validateData___  = (data) => {
//       if(data.assetID == null || data.assetID === ""){
//         return "Asset ID Cannot be Null"
//       }

//       else if(data.assetID.length !== 5 || data.assetID.length > 5 ){
//         return "Asset ID should contain 5 chars"
//       }

//       if(data.requestID == null || data.requestID === ""){
//         return "Request ID Cannot be Null"
//       }

//       else if(data.requestID.length !== 5 || data.requestID.length > 5 ){
//         return "Request ID should contain 5 chars"
//       }

//       else if(data.purchaseValue == null || data.purchaseValue === ""){
//         return "Purchase Value Cannot be Null"
//       }
      
//       else if(data.purchaseValue <= 0){
//           return "Purchase Value should be Greater than 0"
//       }

//       else if(data.depriciation == null || data.depriciation === ""){
//         return "Depriciation Cannot be Null"
//       }
      
//       else if(data.depriciation <= 0){
//           return "Depriciation Value should be Greater than 0"
//       }
//       //else if(data.quantity !== [0-9][0-9]){
//        //   return "Enter Only Numeric Values"
//       //}

//       else
//       return null;
//     }



//   const handleClick = (newState) => () => {
//     setState({ open: true, ...newState });
//   };

//   const handleClose = () => {
//     setState({ ...state, open: false });
//   };


//     const asslist = useSelector(state => state.firestore.ordered.assetList)
//     const data = asslist ? (asslist.map(asslist => ({...asslist}))) : (null)
    
//     const table = data ? (
//         <MaterialTable
//         title="Assets List"
//         columns={columns}
//         data={data}
//         editable={{

//           onRowAdd: newData =>
//             new Promise((resolve, reject) => {
//               const error = validateData___(newData);
//               if (error != null) {
//                setState({ ...state, open: true,error:error });
//               reject();
//               }
//               else {
//                 setTimeout(() => {
//                   //setData([...data, newData]);
//                   props.insertAssetList(newData);
//                   resolve();
//                 }, 1000)
//               }
             
//             }),

//           onRowUpdate: (newData, oldData) =>
//             new Promise((resolve, reject) => {
//               const error = validateData___(newData);
//               if (error != null) {
//                setState({ ...state, open: true,error:error });
//               reject();
//               }
//               else {
//                 setTimeout(() => {
//                   const dataUpdate = [...data];
//                   const index = oldData.tableData.id;
//                   dataUpdate[index] = newData;
//                   //setData([...dataUpdate]);
//                   console.log(newData,oldData)
//                   props.updateAssetList(newData)
//                   resolve();
//                 }, 1000)
//               }
              
//             }),

//           onRowDelete: oldData =>
//             new Promise((resolve, reject) => {
//               setTimeout(() => {
//                 const dataDelete = [...data];
//                 const index = oldData.tableData.id;
//                 dataDelete.splice(index, 1);
//                 //setData([...dataDelete]);
//                 console.log(oldData)
//                 props.deleteAssetList(oldData.id)
//                 resolve()
//               }, 1000)
//             }),
//         }}
//       />
//     ) : (<div>Loading</div>)

//     const feedBackToast =  (<Snackbar 
//       autoHideDuration={200000}
//       anchorOrigin={{ vertical, horizontal }}
//       open={open}
//       onClose={handleClose}
//       key={vertical + horizontal}
//       >
//           <div >

//         <Alert variant="filled" severity="error" style={{display: "flex",alignItems: "center"}}>
//         <h3>{error}</h3>
        
//         </Alert>
//         </div>
//       </Snackbar>)


  
//     return(
//         <div>
//              {table}
//              {feedBackToast}
//         </div>
       
//         )
//   }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateAssetList: (payload) => dispatch(updateAssetList(payload)),
//         insertAssetList: (payload) => dispatch(insertAssetList(payload)),
//         deleteAssetList: (roomID) => dispatch(deleteAssetList(roomID))


//     }
// }
//   export default compose(connect(null,mapDispatchToProps),firestoreConnect([
//     {collection: 'assetList'}
//   ])) (AssetList)


//  // export default AssetList