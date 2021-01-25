import React, { Component } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'

export default class Chart extends Component {

    render() {
        const chartData = {
            labels:['Test1','Test2','Test3'],
            datasets:[{
                label:'Population',
                data:[
                    33123,
                    31232,
                    32433
                ],
                backgroundColor:[
                    'rgba(0, 0, 255, 0.3)',
                    'rgba(0, 0, 255, 0.5)',
                    'rgba(0, 0, 255, 0.7)'
                ]
            }]
        };
        return (
            <div className="chart">
                <Bar
                    data={chartData}
                    width={100}
                    height={200}
                    options={{
                    maintainAspectRatio: false}}/>
            </div>
        )
    }
}

// export default function Chart(props) {
//     const [subData,setSubData] = useState([])
//     const [finalData,setFinalData] = useState([])
//     function submitData(subData) {
//         setFinalData(finalData=>[...finalData,subData])
//         setSubData(subData={});
//         document.myform.reset();
//         console.log(finalData);
//     }
//     return (
//         <div>
//             <form name="myform">
//                 <TableContainer style={{display:'flex',justifyContent:'center'}}>
//                 <Table style={{width:'50%',justifyContent:'center',}} size="small">
//                 <TableHead>
//                 <TableRow>
//                     <TableCell><TextField value={subData['name']} onChange={(e)=>setSubData({...subData,"name" : e.target.value})} lable="Name" margin="normal" variant="outlined" color="secondary" /></TableCell>
//                     <TableCell><TextField value={subData['price']} onChange={(e)=>setSubData({...subData,"price" : e.target.value})} lable="Price" margin="normal" variant="outlined" color="secondary" /></TableCell>
//                     <TableCell><Button onClick={()=>submitData(subData)} variant='outlined' color='primary'>Add Item</Button></TableCell>
//                 </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     <TableRow>
//                         <TableCell>Name</TableCell>
//                         <TableCell>Price (LKR)</TableCell>
//                     </TableRow>
//                     {finalData.map(data=> (
//                         <TableRow>
//                             <TableCell>{data.name}</TableCell>
//                             <TableCell>{data.price}</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//                 </Table>
//                 </TableContainer>
//             </form>
//         </div>
//     )
// }
