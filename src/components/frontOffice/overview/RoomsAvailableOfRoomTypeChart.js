import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector,ResponsiveContainer } from 'recharts';
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Available Rooms ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


 class RoomsAvailableOfRoomTypeChart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/hqnrgxpj/';

  state = {
    activeIndex: 0,
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {

    const reservations = this.props.reservation
    const datareservation = reservations ? (reservations.map(reservation => ({...reservation,date:reservation.startDay.toDate()}))) : (null)
    const today = new Date()
    today.setHours(0,0,0,0)
    var exking = [5,5,5,5,5]
    exking[0] -= datareservation ? datareservation.filter(res => res.roomType == 'EXKINGSUITE' && res.date.getDay() == today.getDay() && res.date.getMonth() == today.getMonth()).length : null
    exking[1] -= datareservation ? datareservation.filter(res => res.roomType == 'FAMSTUDIO' && res.date.getDay() == today.getDay() && res.date.getMonth() == today.getMonth()).length : null
    exking[2] -= datareservation ? datareservation.filter(res => res.roomType == 'PRESSUITE'&& res.date.getDay() == today.getDay() && res.date.getMonth() == today.getMonth()).length : null
    exking[3] -= datareservation ? datareservation.filter(res => res.roomType == 'SEAKING' && res.date.getDay() == today.getDay() && res.date.getMonth() == today.getMonth()).length : null
    exking[4] -= datareservation ? datareservation.filter(res => res.roomType == 'CMASTER'&& res.date.getDay() == today.getDay() && res.date.getMonth() == today.getMonth()).length : null
    exking[5] -= datareservation ? datareservation.filter(res => res.roomType == 'SEASINGLE' && res.date.getDay() == today.getDay() && res.date.getMonth() == today.getMonth()).length : null
    datareservation ? console.log(datareservation[10],datareservation[10].date,(datareservation[10].date.getDay() == today.getDay()),today) : console.log("a")
    const datac = [
        { name: 'EXKINGSUITE', value: 400 },
        { name: 'FAMSTUDIO', value: 300 },
        { name: 'PRESSUITE', value: 300 },
        { name: 'SEAKING', value: 200 },
        { name: 'CMASTER', value: 200 },
        { name: 'SEASINGLE', value: 200 },
      ]; 

      const data = datac ? (datac.map((dat,index) => ({...dat,noOfReservations:exking[index]}))) : (null)


    return (
      <PieChart width={500} height={300} fill="#8884d8">
        <Pie
          activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="noOfReservations"
          onMouseEnter={this.onPieEnter}
        />
      </PieChart>
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
  ]))(RoomsAvailableOfRoomTypeChart)