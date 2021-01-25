import React from 'react'
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import { useSelector, connect } from 'react-redux';


import {updateFeedbackAction} from '../../../../redux/actions/frontOfficeActions/FeedbackActions'
//import {insertCustomer} from '../../../redux/actions/frontOfficeActions/CustomerActions'
//import {deleteCustomer} from '../../../redux/actions/frontOfficeActions/CustomerActions'

const FeedbackActionsForm = (props) => {

    const {id,action} = props

    const [actionChanged,setActionChanged] = React.useState(false)
    const [act,setAct] = React.useState('null')
    
    const handleChangeOfAction = (event) => {
        setActionChanged(true)
        setAct(event.target.value)
          console.log(act)
          
    }
    const handleActionSubmit = (event,rowData) => {
        props.updateFeedbackAction(id,act)
    console.log(props)
      }
    return(
        <div>   
            <FormControl fullWidth>
                <TextField  id="outlined-basic" defaultValue={action} multiline  label="Action" variant="outlined" onChange={handleChangeOfAction}/>
            </FormControl>
            <IconButton color="primary" aria-label="Actions" disabled={actionChanged != true}  onClick={handleActionSubmit}>
                <DoneIcon />
            </IconButton>
        </div>

    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateFeedbackAction: (id,payload) => dispatch(updateFeedbackAction(id,payload)),
      //insertCustomer: (payload) => dispatch(insertCustomer(payload)),
      //deleteCustomer: (customerId) => dispatch(deleteCustomer(customerId))


    }
}
  export default connect(null,mapDispatchToProps)(FeedbackActionsForm)