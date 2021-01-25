import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import {updatepoolService} from '../../redux/actions/maintainanceActions/PoolServiceActions'
import {deletepoolService} from '../../redux/actions/maintainanceActions/PoolServiceActions'
import {insertpoolService} from '../../redux/actions/maintainanceActions/PoolServiceActions'

 function PoolService(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'ID', field: 'id' },
      { title: 'Payment', field: 'paymentMade' },
      { title: 'Brief', field: 'brief'},
      {
        title: 'Description',
        field: 'descriptions',
      },
    ]); 
    const poolService = useSelector(state => state.firestore.ordered.poolService)
    const data = poolService ? (poolService.map(poolService => ({...poolService}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Pool Service Preview"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertpoolService(newData);
                
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
                props.updatepoolService(newData)
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
                props.deletepoolService(oldData.id)
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
        updatepoolService: (payload) => dispatch(updatepoolService(payload)),
        insertpoolService: (payload) => dispatch(insertpoolService(payload)),
        deletepoolService: (roomId) => dispatch(deletepoolService(roomId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'poolService'}
  ])) (PoolService)