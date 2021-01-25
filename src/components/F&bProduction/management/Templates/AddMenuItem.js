import { TableContainer,TableRow,TableCell,TextField,Button,Table,TableHead,TableBody, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete'

export default function AddItem(props) {
    const [subData,setSubData] = useState([])
    const [dispData,setDisData] = useState([])
    const [counter,setCounter] = useState(1);

    function submitData(subData) {
        subData['itemId'] = "item".concat((counter).toString());
        props.setFinalData(finalData=>[...finalData,subData])
        setDisData(dispData=>[...dispData,subData])
        setSubData(subData={});
        document.myform.reset();
        setCounter(counter+1);
    }
    // function DeleteItem(data){
    //     console.log("called delete");
    //     finalData.splice(data.index,1);
    //     console.log(finalData);
    //     setFinalData(finalData=>[...finalData,subData])
    // }
    // function resetData(){
    //     setFinalData(finalData={})
    // }

    return (
        <div>
            <form name="myform">
            <Grid container spacing={1}>
            <Grid item xs={5}>
            <TextField value={subData['name']} onChange={(e)=>setSubData({...subData,"name" : e.target.value})} label="Name" variant="outlined" margin="dense" fullWidth color="secondary" required />
            </Grid>
            <Grid item xs={4}>
            <TextField value={subData['price']} onChange={(e)=>setSubData({...subData,"price" : e.target.value})} type='number' label="Price (LKR)" margin="normal" variant="outlined" margin="dense" fullWidth color="secondary" required />
            </Grid>   
            </Grid>         
            <Button onClick={()=>submitData(subData)} variant='outlined' color='primary' fullWidth>Add Item</Button>
            {/* <Button onClick={()=>resetData } variant='outlined' color='inherit'>Clear Items</Button> */}
             <TableContainer style={{display:'flex',justifyContent:'center'}}>
                <Table style={{width:'50%',justifyContent:'center',}} size="small">
                <TableBody name="tableBody">
                    <TableRow>
                        <TableCell>Item Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price (LKR)</TableCell>
                    </TableRow>
                    {dispData.map(data=> (
                        <TableRow>
                            <TableCell>{data.itemId}</TableCell>
                            <TableCell>{data.name}</TableCell>
                            <TableCell>{data.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
                </TableContainer>
            </form>
        </div>
    )
}
