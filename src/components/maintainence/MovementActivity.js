import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import {updatemovementActivity} from '../../redux/actions/maintainanceActions/movementActivityActions'
import {insertmovementActivity} from '../../redux/actions/maintainanceActions/movementActivityActions'
import {deletemovementActivity} from '../../redux/actions/maintainanceActions/movementActivityActions'

 function MovementActivity(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'ID', field: 'Visit_id' },
        { title: 'Name', field: 'Name'},
        { title: 'National ID number', field: 'Nic_no'},
        { title: 'Contact Number', field: 'Contact_no'},
        { title: 'Guest Type', field: 'guest_type'},
        { title: 'Number of Guests', field: 'no_of_guests'},
        { title: 'Vehicle Number', field: 'vehicle_no'},
      {
        title: 'Description',
        field: 'descriptions',
      },
    ]); 
    const movementActivity = useSelector(state => state.firestore.ordered.movementActivity)
    const data = movementActivity ? (movementActivity.map(movementActivity => ({...movementActivity}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Movement Activity Preview"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertmovementActivity(newData);
                
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                //setData([...dataUpdate]);
                console.log(newData,oldData)
                props.updatemovementActivity(newData)
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                //setData([...dataDelete]);
                console.log(oldData)
                props.deletemovementActivity(oldData.id)
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
        updatemovementActivity: (payload) => dispatch(updatemovementActivity(payload)),
        insertmovementActivity: (payload) => dispatch(insertmovementActivity(payload)),
        deletemovementActivity: (roomId) => dispatch(deletemovementActivity(roomId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'movementActivity'}
  ])) (MovementActivity)