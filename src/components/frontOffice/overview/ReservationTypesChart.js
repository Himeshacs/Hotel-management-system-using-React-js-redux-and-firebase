import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';


const dataCopy = [
  {
    name: 'January', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'February', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'March', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'April', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'May', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'June', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'July', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'August', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'September', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'October', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'November', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'December', uv: 3490, pv: 4300, amt: 2100,
  },
];

class ReservationTypesChart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/90v76x08/';

  render() {
    const reservations = this.props.reservation
    const datareservation = reservations ? (reservations.map(reservation => ({...reservation,month:reservation.startDay.toDate().getMonth()}))) : (null)
    var monthlyData = new Array();
    if(datareservation){
        for (let a = 0 ; a < 12 ; a++){
            monthlyData[a] = datareservation.filter(reservation => reservation.month == a);
        }
    }
    const data = monthlyData ? dataCopy.map((data,index) =>({...data,
        INSTAGRAM:monthlyData[index] ? monthlyData[index].filter(res => res.reservationType == "INSTAGRAM").length : 0,
        WEBSITE:monthlyData[index] ? monthlyData[index].filter(res => res.reservationType == "WEBSITE").length : 0,
        BOOKINGCOM:monthlyData[index] ? monthlyData[index].filter(res => res.reservationType == "BOOKING.COM").length : 0})) : null
        console.log(data)
        console.log(monthlyData)


    return (
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="INSTAGRAM" stackId="a" fill="#8884d8" />
        <Bar dataKey="WEBSITE" stackId="a" fill="#82ca9d" />
        <Bar dataKey="BOOKINGCOM" stackId="a" fill="red" />
      </BarChart>
    );
  }
}

const mapStateToProps = (state) => {
    return{
        reservation:state.firestore.ordered.reservation
    }
}

export default compose(connect(mapStateToProps,null),firestoreConnect([
    {collection: 'reservation'}
  ]))(ReservationTypesChart)