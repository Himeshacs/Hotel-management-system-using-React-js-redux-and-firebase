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
    /////////////////////////////
    // Hide/show button if you need
    /////////////////////////////

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
function FeedbackOverview(props){


    
  
 
const feedback = props.feedback
const complaint = props.complaint
const compliment = props.compliment
//------------------------------------Complaints DepartmentWise-------------------------------------------------------------------------
const dataForComplaintOnDepartments = complaint ? (complaint.map(data => ({...data}))) : (null)
const hrComplaint= dataForComplaintOnDepartments ? dataForComplaintOnDepartments.filter(data => data.department == "HR").length : 0
const fbComplaint= dataForComplaintOnDepartments ? dataForComplaintOnDepartments.filter(data => data.department == "F&B").length : 0
const maintenanceComplaint= dataForComplaintOnDepartments ? dataForComplaintOnDepartments.filter(data => data.department == "MAINTENANCE").length : 0
const frontOfficeComplaint= dataForComplaintOnDepartments ? dataForComplaintOnDepartments.filter(data => data.department == "FRONTOFFICE").length : 0

const chartForComplaintOnDepartments = {
    data: canvas => {
      let ctx = canvas.getContext("2d");
  
      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
  
      gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
      gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
      gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors
  
      return {
        labels: [
            'HR',
            'F&B',
            'MAINTENANCE',
            'FRONTOFFICE',
                ],
        datasets: [
          {
            label: "Platforms",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: "#d048b6",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [hrComplaint,fbComplaint,maintenanceComplaint,frontOfficeComplaint],
        }
        ]
      };
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 5,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ]
      }
    }
  };



//--------------------------------------------------Compliments on departments-----------------------------------------------
//------------------------------------Complaints DepartmentWise-------------------------------------------------------------------------
const dataForComplimentOnDepartments = compliment ? (compliment.map(data => ({...data}))) : (null)
const hrCompliment= dataForComplimentOnDepartments ? dataForComplimentOnDepartments.filter(data => data.department == "HR").length : 0
const fbCompliment= dataForComplimentOnDepartments ? dataForComplimentOnDepartments.filter(data => data.department == "F&B").length : 0
const maintenanceCompliment= dataForComplimentOnDepartments ? dataForComplimentOnDepartments.filter(data => data.department == "MAINTENANCE").length : 0
const frontOfficeCompliment= dataForComplimentOnDepartments ? dataForComplimentOnDepartments.filter(data => data.department == "FRONTOFFICE").length : 0

const chartForComplimentOnDepartments = {
    data: canvas => {
      let ctx = canvas.getContext("2d");
  
      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
      gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
      gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
      gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
  
      return {
        labels: [
            'HR',
            'F&B',
            'MAINTENANCE',
            'FRONTOFFICE',
                ],
        datasets: [
          {
            label: "Platforms",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: "#00f2c3",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [hrCompliment,fbCompliment,maintenanceCompliment,frontOfficeCompliment],
        }
        ]
      };
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 5,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ]
      }
    }
  };

  //-----------------------------------------------Ratings of Departments------------------------------------------------------
const dataForRatingsOnDepartments = feedback ? (feedback.map(data => ({...data}))) : (null)
const hr= dataForRatingsOnDepartments ? dataForRatingsOnDepartments.filter(data => data.department == "HR") : []
const fb= dataForRatingsOnDepartments ? dataForRatingsOnDepartments.filter(data => data.department == "F&B") : []
const maintenance= dataForRatingsOnDepartments ? dataForRatingsOnDepartments.filter(data => data.department == "MAINTENANCE") : []
const frontOffice= dataForRatingsOnDepartments ? dataForRatingsOnDepartments.filter(data => data.department == "FRONTOFFICE") : []
let hrRating = 0
let fbRating = 0
let maintenanceRating = 0
let frontOfficeRating = 0
hr.forEach((item) => {
    hrRating += parseInt(item.rating)

})
fb.forEach((item) => {

    fbRating += parseInt(item.rating)
})
maintenance.forEach((item) => {
    maintenanceRating += parseInt(item.rating)
})
frontOffice.forEach((item) => {
    frontOfficeRating += parseInt(item.rating)
})
  
  const chartForRatingsOnDepartments = canvas => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: ['HR',
      'F&B',
      'MAINTENANCE',
      'FRONTOFFICE'
    ],
      datasets: [
        {
          label: "Reservations",
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
          data: [hrRating/(hr.length) == 0 ? 1 : hrRating/(hr.length),
                fbRating/(fb.length) == 0 ? 1 : fbRating/(fb.length),
                maintenanceRating/(maintenance.length) == 0 ? 1 : maintenanceRating/(maintenance.length),
                frontOfficeRating/(frontOffice.length) == 0 ? 1 : frontOfficeRating/(frontOffice.length)]
        }
      ]
    };
  }

//--------------------------------monthly complaints ----------------------------------------------------------------------

  const dataForMonthlyComplaints = complaint ? (complaint.map(data => ({...data,month:data.date.toDate().getMonth()}))) : (null)
  let monthlyComplaints = [0,0,0,0,0,0,0,0,0,0,0,0]
  console.log(monthlyComplaints)
  for(let a = 0 ; a < 12 ; a++){
    monthlyComplaints[a] = dataForMonthlyComplaints ? dataForMonthlyComplaints.filter(data => data.month == a).length : 0
  }
  console.log(monthlyComplaints)

    
    const chartForMonthlyComplaints = canvas => {
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
            label: "Reservations",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#00f2c3 ",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#00f2c3",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#00f2c3",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: monthlyComplaints
          }
        ]
      };
    }

//--------------------------------monthly compliments ----------------------------------------------------------------------

const dataForMonthlyCompliments = compliment ? (compliment.map(data => ({...data,month:data.date.toDate().getMonth()}))) : (null)
let monthlyCompliments = [0,0,0,0,0,0,0,0,0,0,0,0]
console.log(monthlyComplaints)
for(let a = 0 ; a < 12 ; a++){
    monthlyCompliments[a] = dataForMonthlyCompliments ? dataForMonthlyCompliments.filter(data => data.month == a).length : 0
}

  
  const chartForMonthlyCompliments = canvas => {
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
          label: "Reservations",
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
          data: monthlyCompliments
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
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Overall</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-bell-55 text-info" />{" "}
                     Compliments On Departments
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                    data={chartForComplimentOnDepartments.data}
                    options={chartForComplimentOnDepartments.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">yearly</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                    Complaints On Departments
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                  <Bar
                      data={chartForComplaintOnDepartments.data}
                      options={chartForComplaintOnDepartments.options}
                  />
               
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Ratings</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-send text-success" /> Department Ratings
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    {/* <Pie
                      data={chartDataForRoomsAvailable}
                      options={chartDataForRoomsAvailable.options}
                    /> */}
                    <Line 
                        data={chartForRatingsOnDepartments}
                        options={chartOptions2}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row style={{margin:"0px"}}>
            <Col xs="6">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Complaints</h5>
                      <CardTitle tag="h2">Monthly Complaints</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
               
                    <Line 
                        data={chartForMonthlyComplaints}
                        options={chartOptions1}
                    />
        
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xs="6">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Complaints</h5>
                      <CardTitle tag="h2">Monthly Compliments</CardTitle>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
               
                    <Line 
                        data={chartForMonthlyCompliments}
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
        feedback:state.firestore.ordered.feedback,
        compliment:state.firestore.ordered.compliment,
        complaint:state.firestore.ordered.complaint

    }
}

export default compose(connect(mapStateToProps,null),firestoreConnect([
    {collection: 'feedback',
    where: [['type', '==', 'COMPLAINT']],
    storeAs: 'complaint'},
    {collection: 'feedback',
    where: [['type', '==', 'COMPLIMENT']],
    storeAs: 'compliment'},
    {collection: 'feedback',
    storeAs: 'feedback'},
  ]))(FeedbackOverview)
