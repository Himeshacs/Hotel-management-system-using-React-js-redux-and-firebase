import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,ResponsiveContainer,
} from 'recharts';
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';


class RoomTypeOfReservationsChart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/Lrffmzfc/';

  render() {
    const reservations = this.props.reservation
    const datareservation = reservations ? (reservations.map(reservation => ({...reservation}))) : (null)
    var exking = [0,1,2,3,4,5]
    exking[0] = datareservation ? datareservation.filter(res => res.roomType == 'EXKINGSUITE').length : null
    exking[1] = datareservation ? datareservation.filter(res => res.roomType == 'FAMSTUDIO').length : null
    exking[2] = datareservation ? datareservation.filter(res => res.roomType == 'PRESSUITE').length : null
    exking[3] = datareservation ? datareservation.filter(res => res.roomType == 'SEAKING').length : null
    exking[4] = datareservation ? datareservation.filter(res => res.roomType == 'CMASTER').length : null
    exking[5] = datareservation ? datareservation.filter(res => res.roomType == 'SEASINGLE').length : null

    const datac =  [
        {
          name: 'EXKING', noOfReservations: {exking}, pv: 2400, amt: 2400,
        },
        {
          name: 'FAMSTUD', noOfReservations: 3000, pv: 1398, amt: 2210,
        },
        {
          name: 'PRESUITE', noOfReservations: 2000, pv: 9800, amt: 2290,
        },
        {
          name: 'SEAKING', noOfReservations: 2780, pv: 3908, amt: 2000,
        },
        {
          name: 'CMASTER', noOfReservations: 1890, pv: 4800, amt: 2181,
        },
        {
          name: 'CSINGLE', noOfReservations: 2390, pv: 3800, amt: 2500,
        },
      ] 
      const data = datac ? (datac.map((dat,index) => ({...dat,noOfReservations:exking[index]}))) : (null)

    return (
      
      <AreaChart
        width={400}
        height={300}
        data={data}
        margin={{
          top: 20, right: 50, left: 0, bottom: 0,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="noOfReservations" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
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
  ]))(RoomTypeOfReservationsChart)