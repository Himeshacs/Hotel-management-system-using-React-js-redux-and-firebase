import { BorderColor } from '@material-ui/icons';
import React from 'react';
import {Bar} from 'react-chartjs-2'
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
// import { Bar } from 'recharts';

function BarChart () {
//     const [state, setState] = React.useState({
//         open: false,
//         vertical: 'bottom',
//         horizontal: 'right',
//       });
//       const { vertical, horizontal, open, error } = state;
//     const feedbacks = useSelector(state => state.firestore.ordered.product)
//   const datas = feedbacks ? (feedbacks.map(feedback => ({ ...feedback }))) : (null)
    const data = {
        // labels: [...datas.ProName,],
        labels: ['rice','hooper','kott','name'],
        datasets:[
            {
                label: 'stock quantity',
                // data:[...datas.price],
                data:[3,5,6,7],
                borderColor:['rgba(255,206,86,0.2)','rgba(255,206,86,0.2)','rgba(255,206,86,0.2)','rgba(255,206,86,0.2)'],
                backgroundColor:['rgba(255,206,86,0.2)','rgba(255,206,86,0.2)','rgba(255,206,86,0.2)','rgba(255,206,86,0.2)'],
                // pointBackgroundColor:'rgba(255,206,86,0.2)',
                // pointBorderColor:'rgba(255,206,86,0.2)'
            },
            {
                label: 'sell quantity',
                data:[5,8,3,5],
                borderColor:['rgba(54,162,235,0.2)','rgba(54,162,235,0.2)','rgba(54,162,235,0.2)','rgba(54,162,235,0.2)'],
                backgroundColor:['rgba(54,162,235,0.2)','rgba(54,162,235,0.2)','rgba(54,162,235,0.2)','rgba(54,162,235,0.2)'],
                // pointBackgroundColor:'rgba(54,162,235,0.2)',
                // pointBorderColor:'rgba(54,162,235,0.2)'
            }
        ]
    }
    const options = {
        title:{
            display:true,
            text:'bar chart'
        },
        scales:{
            yAxes:[
                {
                    ticks:{
                        min:0,
                        max:9,
                        stepSize:1
                    }
                }    
            ]
        }
    }
    return <Bar data={data} options={options}/>
}

export default BarChart