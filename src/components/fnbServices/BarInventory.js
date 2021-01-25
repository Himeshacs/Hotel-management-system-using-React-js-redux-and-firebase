import React from 'react'
 import MaterialTable from 'material-table'
 import { firestoreConnect } from 'react-redux-firebase';
 import { useSelector, connect } from 'react-redux';
 import { compose } from 'redux';
import { insertBarInvRec, deleteBarInvRec, updateBarInvRec } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

import OrderForm from './OrderForm';
import EnterBarInventoryItem from './EnterBarInventoryItem';


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



function BarInventory() {


  const [descriptionButtonHidden, setDescriptionButtonHidden] = React.useState(true)
  const [state, setState] = React.useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal, open, error } = state;
  const classes = useStyles();



  const feedbacks = useSelector(state => state.firestore.ordered.barInventory)

  const data = feedbacks ? (feedbacks.map(feedback => ({ ...feedback }))) : (null)



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
          { title: 'Bar Inventory ID', field: 'BarInvNo' },
          {
            title: 'Description',
            field: 'descriptions'
            /* ,filtering: false*/
          },
          {
            title: 'Date',
            field: 'date'           
            
          }
        ]}
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
                  <EnterBarInventoryItem BarInvNo={rowData.BarInvNo} />
                </div>



              )
            },
          },

        ]}
      />
    )
  }
  else
    return <div>loading</div>
}
export default compose(connect(null, null), firestoreConnect([
  { collection: 'barInventory' },
  { collection: 'customer' }
]))(BarInventory)



// -------------------------------------------------------------new------------------------------
// import React from 'react'
// import MaterialTable from 'material-table'
// import { firestoreConnect } from 'react-redux-firebase';
// import { useSelector, connect } from 'react-redux';
// import { compose } from 'redux';
// import { insertBarInvRec, deleteBarInvRec, updateBarInvRec } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions';

//     function BarInventory(props) {

//         const { useState } = React;
//         const [columns, setColumns] = useState([
//           { title: 'ID', field: 'id' },
//           { title: 'Item Name', field: 'itemName' },
//           { title: 'Price (LKR)', field: 'price'},
//           { title: 'Quantity', field: 'qty'},
//           { title: 'Last Modified', field: 'lastModified' },
//           { title: 'Stock Status', field: 'stkStatus'},

//         ]); 
//         const barInv = useSelector(state => state.firestore.ordered.barInventory)
//         const data = barInv ? (barInv.map(barInv => ({...barInv}))) : (null)
//         const table = data ? (
//             <MaterialTable
//             title="Inventory List"
//             columns={columns}
//             data={data}
//             editable={{
//               onRowAdd: newData =>
//                 new Promise((resolve, reject) => {
//                   setTimeout(() => {
//                     // setData([...data, newData]);
//                     props.insertBarInvRec(newData);
//                     resolve();
//                   }, 1000)
//                 }),
//               onRowUpdate: (newData, oldData) =>
//                 new Promise((resolve, reject) => {
//                   setTimeout(() => {
//                     const dataUpdate = [...data];
//                     const index = oldData.tableData.id;
//                     dataUpdate[index] = newData;
//                     //setData([...dataUpdate]);
//                     console.log(newData,oldData)
//                     props.updateBarInvRec(newData)
//                     resolve();
//                   }, 1000)
//                 }),
//               onRowDelete: oldData =>
//                 new Promise((resolve, reject) => {
//                   setTimeout(() => {
//                     const dataDelete = [...data];
//                     const index = oldData.tableData.id;
//                     dataDelete.splice(index, 1);
//                     //setData([...dataDelete]);
//                     console.log(oldData)
//                     props.deleteBarInvRec(oldData.id)
//                     resolve()
//                   }, 1000)
//                 }),
//             }}
//           />
//         ) : (<div>Loading</div>)
   
//         return(
//             <div>
//                  {table}
//             </div>
           
//             )
//       }
     
//     const mapDispatchToProps = (dispatch) => {
//         return {
//             updateBarInvRec: (payload) => dispatch(updateBarInvRec(payload)),
//             insertBarInvRec: (payload) => dispatch(insertBarInvRec(payload)),
//             deleteBarInvRec: (InventoryId) => dispatch(deleteBarInvRec(InventoryId))    
//         }
//     }
//       export default compose(connect(null,mapDispatchToProps),firestoreConnect([
//         {collection: 'barInventory'}
//       ])) (BarInventory)
