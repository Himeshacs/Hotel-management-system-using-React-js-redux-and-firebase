import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import {updateServiceProvider} from '../../redux/actions/maintainanceActions/serviceProviderActions'
import {insertServiceProvider} from '../../redux/actions/maintainanceActions/serviceProviderActions'
import {deleteServiceProvider} from '../../redux/actions/maintainanceActions/serviceProviderActions'

 function ServiceProvider(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Service Provider ID', field: 'Service_Pr_id' },
      { title: 'Company Name', field: 'Company_name' },
      {
        title: 'Description',
        field: 'descriptions',
      },
    ]); 
    const serviceProvider = useSelector(state => state.firestore.ordered.serviceProvider)
    const data = serviceProvider ? (serviceProvider.map(service => ({...service}))) : (null)
    const table = data ? (
        <MaterialTable
        title="service Provider Preview"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertServiceProvider(newData);
                
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
                props.updateServiceProvider(newData)
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
                props.deleteServiceProvider(oldData.id)
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
        updateServiceProvider: (payload) => dispatch(updateServiceProvider(payload)),
        insertServiceProvider: (payload) => dispatch(insertServiceProvider(payload)),
        deleteServiceProvider: (roomId) => dispatch(deleteServiceProvider(roomId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'serviceProvider'}
  ])) (ServiceProvider)