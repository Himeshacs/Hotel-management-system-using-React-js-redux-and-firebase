import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import {updatemaintenanceServices} from '../../redux/actions/maintainanceActions/maintainanceServicesActions'
import {insertmaintenanceServices} from '../../redux/actions/maintainanceActions/maintainanceServicesActions'
import {deletemaintenanceServices} from '../../redux/actions/maintainanceActions/maintainanceServicesActions'

 function MaintenanceServices(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Maintenance Service ID', field: 'M_Service_id' },
      { title: 'Department', field: 'Department'},
      { title: 'Type of Service', field: 'Service_type'},
      { title: 'Machine ID Number', field: 'machine_ID'},
      { title: 'Type of Machine', field: 'machine_Type'},
      { title: 'Type of Payment made', field: 'payment_type'},
      { title: 'Amount Paid', field: 'paymentMade'},
      {
        title: 'Description',
        field: 'description',
      },
    ]); 
    const maintainanceServices = useSelector(state => state.firestore.ordered)
console.log(maintainanceServices)
   // const data = maintainanceServices ? (maintainanceServices.map(maintainanceService => ({...maintainanceService   }))) : (null)
   const data = null 
   const table = data ? (
        <MaterialTable
        title="Maintenance Services Preview"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertmaintenanceServices(newData);
                
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
                props.updatemaintenanceServices(newData);
                props.update(newData)
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
                props.deletemaintenanceServices(oldData);
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
        updatemaintenanceServices: (payload) => dispatch(updatemaintenanceServices(payload)),
        insertmaintenanceServices: (payload) => dispatch(insertmaintenanceServices(payload)),
        deletemaintenanceServices: (roomId) => dispatch(deletemaintenanceServices(roomId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'maintenanceServices'}
  ])) (MaintenanceServices)