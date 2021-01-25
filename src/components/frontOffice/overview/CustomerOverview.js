import React,{useState,useEffect} from 'react'
import classNames from "classnames";
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import Typography from '@material-ui/core/Typography';
// react plugin used to create charts
import { Line, Bar ,Pie } from "react-chartjs-2";
import { withStyles } from "@material-ui/core/styles";
import html2canvas from "html2canvas";
import ReactDOM from "react-dom";
import styles from './style.css'


// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
import {
    chartOptions1,
    chartOptions2
  } from './ChartOptions';

  import jsPDF from 'jspdf';

  const div2PDF = e => {

    const but = e.target;
    but.style.display = "none";
    let input = window.document.getElementsByClassName("div2PDF")[0];

    html2canvas(input).then(canvas => {
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "px");
      pdf.addImage(
        img,
        "png",
        input.offsetLeft,
        input.offsetTop,
        input.clientWidth,
        input.clientHeight
      );
      pdf.save("chart.pdf");
      but.style.display = "block";
    });
  };
function CustomerOverview(props){


    
  
 
const customer = props.customer
const reservations = props.reservations

////////////////////////////////////////////////MONTHLY IN HOUSE GUESTS/////////////////////////////////////////////////////////
const MonthlyReservationsData = reservations ? (reservations.map(reservation => ({...reservation,month:reservation.startDay.toDate().getMonth()}))) : (null)
var monthlyData = [[],[],[],[],[],[],[],[],[],[],[],[]]
let monthlyCustomers = [0,0,0,0,0,0,0,0,0,0,0,0];
    for (let a = 0 ; a < 12 ; a++){
        monthlyData[a] = MonthlyReservationsData ? MonthlyReservationsData.filter(reservation => reservation.month == a) : [];
        monthlyData[a].forEach((item) => {
            console.log(parseInt(monthlyData[a]))
            monthlyCustomers[a] += item.numberOfPacks ? parseInt(item.numberOfPacks) : 0
        })
    }

    const chartForRatingsOnDepartments = canvas => {
        let ctx = canvas.getContext("2d");
    
        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    
        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
    
        return {
          labels: [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC"
        ],
          datasets: [
            {
              label: "Number of people",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#1f8ef1",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#1f8ef1",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#1f8ef1",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: monthlyCustomers
            }
          ]
        };
      }
//////////////////////////////////////////////////////////////////inhouse guests this month////////////////////////////////////
const InhouseReservations = reservations ? (reservations.map(reservation => ({...reservation,month:reservation.startDay.toDate().getMonth(),day:reservation.startDay.toDate().getDate()}))) : (null)
var inHouseData = [[],[],[],[],[],[],[],[],[],[],[],[]]
let days = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,];
let labels = []
    for (let a = 0 ; a < 31 ; a++){
        inHouseData[a] = InhouseReservations ? InhouseReservations.filter(reservation => reservation.day == a && reservation.month ==new Date().getMonth()) : [];
        inHouseData[a].forEach((item) => {
            days[a] += item.numberOfPacks ? parseInt(item.numberOfPacks) : 0
            console.log(days[a])

        })
        labels[a] = a.toString()

    }

    const chartForInhouseGuestsForMonth = canvas => {
        let ctx = canvas.getContext("2d");
    
        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    
        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
    
        return {
            labels: labels,
          datasets: [
            {
              label: "Number of people",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#1f8ef1",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#1f8ef1",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#1f8ef1",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: days
            }
          ]
        };
      }

    //----------------------------------------Return UI---------------------------------------------------------------------------
    const [bigChartData, setBigChartData] = useState("chart1")
    return(
        <>
        <div className="content">
            
          <Row style={{margin:"0px",marginTop:"20px"}}>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Complaints</h5>
                      <CardTitle tag="h2">In house guests this month</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
             
                  <Line 
                     data={chartForInhouseGuestsForMonth}
                     options={chartOptions1}
                 />
        
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Complaints</h5>
                      <CardTitle tag="h2">Yearly in house guests</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
               
                 <Line 
                     data={chartForRatingsOnDepartments}
                     options={chartOptions1}
                 />
        
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    )
}

const mapStateToProps = (state) => {
    return{
        customer:state.firestore.ordered.customer,
        reservations:state.firestore.ordered.reservation
    }
}

export default compose(connect(mapStateToProps,null),firestoreConnect([
    {collection: 'customer'},
    {collection: 'reservation'}

  ]))(CustomerOverview)
