import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';


import { makeStyles } from '@material-ui/core/styles';
import CustomerCard from './utill/CustomerCard';
import DescriptionForm from './utill/DescriptionForm';
import FeedbackActionsForm from './utill/FeedbackActionsForm';
import NewFeedbackForm from './utill/NewFeedbackForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import {updateFeedback} from '../../../redux/actions/frontOfficeActions/FeedbackActions'
import {deleteFeedback} from '../../../redux/actions/frontOfficeActions/FeedbackActions'
import { Redirect } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
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
    outerDiv:{
        display: "flex",
    justifyContent: "space-around"
    }, margin: {
        margin: theme.spacing(1),
      },
  }));

//-----------------------------------ui elements------------------------------------------------------------------------
function FeedBackTable(props) {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal, open ,error} = state;
  const classes = useStyles();

  const addButton = <div><NewFeedbackForm/></div>
  const feedbacks = useSelector(state => state.firestore.ordered.feedback)      
  const auth = useSelector(state => state.firebase.auth)

  const data = feedbacks ? (feedbacks.map(feedback => ({...feedback}))) : (null)
      
      if(feedbacks){
    return (
      <div style={{padding: "20px"}}>
        <MaterialTable style={{padding:"0px",boxShadow: "0 0 2px 2px black"}}
        title={addButton}
          columns={[
            { title: 'Title', field: 'title' },
            { title: 'Customer', field: 'customer',editable: 'never' },
            { title: 'Rating', field: 'rating',lookup: { 1:1,2:2,3:3,4:4,5:5}},
            { title: 'Type', field: 'type',lookup: { COMPLAINT: 'COMPLAINT', COMPLIMENT: 'COMPLIMENT'}},
            { title: 'Department', field: 'department'},
          ]}
          options={{
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
              icon:'D',
              tooltip: 'Show Description',
              render: rowData => {
                console.log('asdasd',rowData)
                return (
                  <div> 
                      <DescriptionForm id={rowData.id} description={rowData.description}/>
                  </div>

                    
                )
              },
            },
            {
              icon: 'account_circle',
              tooltip: 'Show Customer',
              render: rowData => {
                return (
                  <CustomerCard customerId={rowData.customer}/>
                )
              },
            },
            {
              icon: 'AnnouncementIcon',
              openIcon: 'AnnouncementIcon',
              tooltip: 'Show Both',
              render: rowData => {
                return (
                  <div>
                      <FeedbackActionsForm id={rowData.id} action={rowData.action}/>
                  </div>
                )
              },
            },
          ]}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                //const error = validateData___(newData);
                  if (error != null){
                    reject();
                    setState({ ...state, open: true,error:error });
                  }
                  else{
                    setTimeout(() => {
                    props.updateFeedback(newData)
                      resolve();
                    }, 1000)
                  }
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  //setData([...dataDelete]);
                  console.log(oldData)
                  props.deleteFeedback(oldData.id)
                  resolve()
                }, 1000)
              }),
          }}

        />
      </div>
    )
  }
  else
  return <div>     
           <CircularProgress style={{marginTop:"200px"}}/>
          </div>
}

const mapDispatchToProps = (dispatch) => {
  return{
    updateFeedback: (payload) => dispatch(updateFeedback(payload)),
    deleteFeedback: (customerId) => dispatch(deleteFeedback(customerId))
  }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'feedback'},
    {collection: 'customer'}    
  ]))(FeedBackTable)
  