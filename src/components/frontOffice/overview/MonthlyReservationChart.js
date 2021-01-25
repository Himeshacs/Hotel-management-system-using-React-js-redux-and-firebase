import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

const dataCopy = [
    {
      name: 'January',
    },
    {
      name: 'February',
    },
    {
      name: 'March',
    },
    {
      name: 'April',
    },
    {
      name: 'May',
    },
    {
      name: 'June',
    },
    {
      name: 'July',
    },
    {
      name: 'August', 
    },
    {
      name: 'September', 
    },
    {
      name: 'October',
    },
    {
      name: 'November', 
    },
    {
      name: 'December',
    },
  ];
  

class MonthlyReservationChart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/zjb47e83/';

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
        Reservations:monthlyData[index] ? monthlyData[index].length : 0 })) : null

    return (
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid  />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="Reservations" stroke="#8884d8" activeDot={{ r: 8 }} />
        {/*<Line yAxisId="right" type="monotone" dataKey="uv" stroke="#82ca9d" />*/}
      </LineChart>
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
  ]))(MonthlyReservationChart)
