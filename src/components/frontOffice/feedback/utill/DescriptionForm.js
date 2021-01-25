import React from 'react'
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { useSelector, connect } from 'react-redux';
import DoneIcon from '@material-ui/icons/Done';

import {updateFeedbackDescription} from '../../../../redux/actions/frontOfficeActions/FeedbackActions'
//import {insertCustomer} from '../../../redux/actions/frontOfficeActions/CustomerActions'
//import {deleteCustomer} from '../../../redux/actions/frontOfficeActions/CustomerActions'

const DescriptionForm = (props) => {

    const [descriptionChanged,setDescriptionChanged] = React.useState(false)
    const [desc,setDesc] = React.useState('null')
    
    const handleChangeOfDescription = (event) => {
          setDescriptionChanged(true)
          setDesc(event.target.value)
          console.log(desc)
          
    }
    const handleDescriptionSubmit = (event,rowData) => {
        props.updateFeedbackDescription(props.id,desc)
    console.log(props)
      }
    const {id,description} = props
    return(
            <div>  
              <FormControl fullWidth>
                <TextField  id="outlined-basic" defaultValue={description} multiline  label="Description" variant="outlined" onChange={handleChangeOfDescription}/>
              </FormControl>
              <IconButton color="primary" aria-label="Description" disabled={descriptionChanged != true}  onClick={handleDescriptionSubmit}>
                <DoneIcon />
              </IconButton>
            </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateFeedbackDescription: (id,payload) => dispatch(updateFeedbackDescription(id,payload)),
      //insertCustomer: (payload) => dispatch(insertCustomer(payload)),
      //deleteCustomer: (customerId) => dispatch(deleteCustomer(customerId))

    }
}
  export default connect(null,mapDispatchToProps)(DescriptionForm)