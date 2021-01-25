import React from 'react'
import MaterialTable from 'material-table'
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { insertContractInfo, updateContractInfo, deleteContractInfo} from '../../../redux/actions/PnIActions/contractHandler';
// import headerPnI from '../headerPnI';

 function AddContract(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      {title:'Contract Id', field: 'cId'},
      {title:'Supplier Name', field: 'supplierName'},
      {title:'Product Type', field: 'pType'},
      {title:'Date', field:'date'},
      {title: 'Department', field: 'department'},
      {title:'Description', field: 'description'}
    ]); 
    const contract = useSelector(state => state.firestore.ordered.contract)
    const data = contract ? (contract.map(con => ({...con}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Contract Details"
        columns={columns}
        data={data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.cId;
                dataUpdate[index] = newData;
                console.log(newData,oldData)
                props.updateContractInfo(newData)
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.cId;
                dataDelete.splice(index, 1);
                console.log(oldData)
                props.deleteContractInfo(oldData.cId)
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
        updateContractInfo: (payload) => dispatch(updateContractInfo(payload)),
        insertContractInfo: (payload) => dispatch(insertContractInfo(payload)),
        deleteContractInfo: (contractId) => dispatch(deleteContractInfo(contractId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'contract'}
  ])) (AddContract)