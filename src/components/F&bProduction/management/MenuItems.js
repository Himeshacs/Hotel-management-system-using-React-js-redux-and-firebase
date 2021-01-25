
import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { updateMenuItems, deleteMenuItems, insertGenItems } from '../../../redux/actions/fnbProductionActions/MenuActions';
import { Menu } from 'material-ui';


function MenuItem(props) {

  const { useState } = React;
  const [state, setState] = React.useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal, open ,error} = state;

  const MenuNo = props.MenuNo
  const items = useSelector(state => state.firestore.ordered.MenuItems)

  let data = items ? (items.map(item => ({ ...item }))) : (null)

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  let cols = props.MenuType == 1 ? (
    [
      { title: 'Welcome Drink', field: 'Wlitem1' }, 
      { title: 'Main Dish 1', field: 'Mditem1' },
      { title: 'Main Dish 2', field: 'Mditem2' },
      { title: 'Main Dish 3', field: 'Mditem3' },
      { title: 'Side Dish 1', field: 'Sditem1' },
      { title: 'Side Dish 2', field: 'Sditem2' },
      { title: 'Side Dish 3', field: 'Sditem3' },
      { title: 'Dessert 1', field: 'Dsitem1' },
      { title: 'Dessert 2', field: 'Dsitem2' },
      { title: 'Dessert 3', field: 'Dsitem3' },
    ]
  ):([{ title: 'Item Id', field: 'itemId', editable: 'onAdd'},{ title: 'Name', field: 'name'},{ title: 'Price (LKR)', field: 'price', type: 'numeric'}])
  
  const tableTitle = "Menu Items - " + MenuNo

  const table = data ? (
    <MaterialTable style={{ padding: "0px" }}    
      title={tableTitle}
      columns={cols}
      data={data}
      editable={{
        onRowAdd:props.MenuType != 1 ? (newData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            // setData([...data, newData]);
            props.insertGenItems(newData,MenuNo);
            resolve();
          }, 1000)
        })):(null)
        ,
         onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
              console.log(newData, oldData)
              props.updateMenuItems(newData,props.MenuType,MenuNo)
              resolve();
              }, 1000),

        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              //setData([...dataDelete]);
              console.log(oldData.id)
              props.deleteMenuItems(oldData,props.MenuType,MenuNo)
              resolve()
            }, 1000)
          }),
      }}
    />
  ) : (<div>Loading</div>)

  return (
    <div style={{ padding_left: "5px" }}>
      {table}
    </div>

  )
}

const mapDispatchToProps = (dispatch) => {
    return {
      insertGenItems: (payload,MenuNo) => dispatch(insertGenItems(payload,MenuNo)),
      updateMenuItems: (payload,MenuType,MenuNo) => dispatch(updateMenuItems(payload,MenuType,MenuNo)),
      deleteMenuItems: (oldData,MenuType,MenuNo) => dispatch(deleteMenuItems(oldData,MenuType,MenuNo))
    }
  }

export default compose(
  firestoreConnect((props) => [
   {collection: 'Menu',
    doc: props.MenuNo,
    subcollections: [
      { collection: 'MenuItems'},
    ],
    storeAs: 'MenuItems'
  }
  ]),
  connect(null, mapDispatchToProps)
)(MenuItem)