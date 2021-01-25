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
  } from './overview/ChartOptions';
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
function FrontOfficeDashboard(props){


//------------------------------------CHART 1 Details-------------------------------------------------------------------------
const reservations = props.reservation
const MonthlyReservationsData = reservations ? (reservations.map(reservation => ({...reservation,month:reservation.startDay.toDate().getMonth()}))) : (null)
var monthlyData = new Array();
if(MonthlyReservationsData){
    for (let a = 0 ; a < 12 ; a++){
        monthlyData[a] = MonthlyReservationsData.filter(reservation => reservation.month == a).length;
    }
}
console.log(monthlyData)

    const chart1 = canvas => {
        let ctx = canvas.getContext("2d");
    
        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    
        
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
              label: "My First dataset",
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
              data: monthlyData
            }
          ]
        };
      }

    //--------------------------------------overall Reservations of Reservation Type chart-----------------------------------------

   
    const overallReservationsOfRoomTypeData = reservations ? (reservations.map(reservation => ({...reservation}))) : (null)
    var room = [0,1,2,3,4,5]
    room[0] = overallReservationsOfRoomTypeData ? overallReservationsOfRoomTypeData.filter(res => res.roomType == 'EXKINGSUITE').length : null
    room[1] = overallReservationsOfRoomTypeData ? overallReservationsOfRoomTypeData.filter(res => res.roomType == 'FAMSTUDIO').length : null
    room[2] = overallReservationsOfRoomTypeData ? overallReservationsOfRoomTypeData.filter(res => res.roomType == 'PRESSUITE').length : null
    room[3] = overallReservationsOfRoomTypeData ? overallReservationsOfRoomTypeData.filter(res => res.roomType == 'SEAKING').length : null
    room[4] = overallReservationsOfRoomTypeData ? overallReservationsOfRoomTypeData.filter(res => res.roomType == 'CMASTER').length : null
    room[5] = overallReservationsOfRoomTypeData ? overallReservationsOfRoomTypeData.filter(res => res.roomType == 'SEASINGLE').length : null

    const chartReservationsOfRoomType = canvas => {
          let ctx = canvas.getContext("2d");
      
          let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
      
          gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
          gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
          gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
      
          return {
            labels: ["EXKINGSUITE", "FAMSTUDIO", "PRESSUITE", "SEAKING", "CMASTER", "SEASINGLE"],
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
                data: [room[0],room[1],room[2],room[3],room[4],room[5]]
              }
            ]
          };
        }

    ///----------------------------------------reservationPlatform-------------------------------------------------------

    const reservationPlatformData = reservations ? (reservations.map(reservation => ({...reservation,month:reservation.startDay.toDate().getMonth()}))) : (null)
    const BOOKINGCOM = reservationPlatformData ?  reservationPlatformData.filter(res => res.reservationType == "BOOKING.COM").length : null ;
    const INSTAGRAM = reservationPlatformData ? reservationPlatformData.filter(res => res.reservationType == "INSTAGRAM").length : null ;
    const WEBSITE = reservationPlatformData ? reservationPlatformData.filter(res => res.reservationType == "WEBSITE").length: null ;
    const OTHER =  reservationPlatformData ? reservationPlatformData.filter(res => res.reservationType == "OTHER").length : null ;
  

    const chartReservationPlatform = {
        data: canvas => {
          let ctx = canvas.getContext("2d");
      
          let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
      
          gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
          gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
          gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors
      
          return {
            labels: ["INSTA","WEB","BDOTCOM","OTHER"],
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
                data: [INSTAGRAM,WEBSITE,BOOKINGCOM,OTHER]
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
                  suggestedMax: 30,
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
    //---------------------------------------------Roomsavailable today ---------------------------------------------------
    const chartRoomsAvailTodayData = reservations ? (reservations.map(reservation => ({...reservation,date:reservation.startDay.toDate()}))) : (null)
    const today = new Date()
    today.setHours(0,0,0,0)
    var availableRooms = [5,5,5,5,5,5]
    availableRooms[0] -= chartRoomsAvailTodayData ? chartRoomsAvailTodayData.filter(res => res.roomType == 'EXKINGSUITE' && res.date.getDay() == today.getDay() && res.date.getMonth() == today.getMonth()).length : null
    availableRooms[1] -= chartRoomsAvailTodayData ? chartRoomsAvailTodayData.filter(res => res.roomType == 'FAMSTUDIO' && res.date.getDay() == today.getDay() && res.date.getMonth() == today.getMonth()).length : null
    availableRooms[2] -= chartRoomsAvailTodayData ? chartRoomsAvailTodayData.filter(res => res.roomType == 'PRESSUITE'&& res.date.getDay() == today.getDay() && res.date.getMonth() == today.getMonth()).length : null
    availableRooms[3] -= chartRoomsAvailTodayData ? chartRoomsAvailTodayData.filter(res => res.roomType == 'SEAKING' && res.date.getDay() == today.getDay() && res.date.getMonth() == today.getMonth()).length : null
    availableRooms[4] -= chartRoomsAvailTodayData ? chartRoomsAvailTodayData.filter(res => res.roomType == 'CMASTER'&& res.date.getDay() == today.getDay() && res.date.getMonth() == today.getMonth()).length : null
    availableRooms[5] -= chartRoomsAvailTodayData ? chartRoomsAvailTodayData.filter(res => res.roomType == 'SEASINGLE' && res.date.getDay() == today.getDay() && res.date.getMonth() == today.getMonth()).length : null

    const chartDataForRoomsAvailable = {
        data: canvas => {
          let ctx = canvas.getContext("2d");
      
          let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
      
          gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
          gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
          gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors
      
          return {
            labels: [
                'EXKINGSUITE',
                'FAMSTUDIO',
                'PRESSUITE',
                'SEAKING',
                'CMASTER',
                'SEASINGLE'
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
                data: [availableRooms[0],availableRooms[1],availableRooms[2],availableRooms[3],availableRooms[4],availableRooms[5]],
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
   
   
    //-------------------------------------------Theme--------------------------------------------------------------------------
    const WhiteTextTypography = withStyles({
        root: {
          color: "#00f2c3 !important"
        }
      })(Typography);
    //----------------------------------------Return UI---------------------------------------------------------------------------
    const [bigChartData, setBigChartData] = useState("chart1")
    return(
        <>
        <div className="content">
        
            <Row style={{margin:"0px",marginTop:"15px"}}>
            <Col lg="3">
              <Card className="card-chart" style={{height: "165px",border: "#1d8cf8 solid"}}>
                <CardHeader>
                  <h4 className="card-category" style={{color:"white",fontSize: "medium"}}>Total Shipments</h4>
                </CardHeader>
                <CardBody style={{display: "flex",justifyContent: "center",padding: "2px"}}>
                  <div style={{width: "150px",height: "93px",}}>
                    <WhiteTextTypography variant="h1" component="h2" gutterBottom>
        76
                    </WhiteTextTypography>             
                 </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3">
              <Card className="card-chart" style={{height: "165px",border: "#1d8cf8 solid"}}>
                <CardHeader>
                  <h4 className="card-category" style={{color:"white",fontSize: "medium"}}>Total Shipments</h4>
                </CardHeader>
                <CardBody style={{display: "flex",justifyContent: "center",padding: "2px"}}>
                  <div style={{width: "150px",height: "93px",}}>
                    <WhiteTextTypography variant="h1" component="h2" gutterBottom>
        76
                    </WhiteTextTypography>             
                 </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3">
              <Card className="card-chart" style={{height: "165px",border: "#1d8cf8 solid"}}>
                <CardHeader>
                  <h4 className="card-category" style={{color:"white",fontSize: "medium"}}>Total Shipments</h4>
                </CardHeader>
                <CardBody style={{display: "flex",justifyContent: "center",padding: "2px"}}>
                  <div style={{width: "150px",height: "93px",}}>
                    <WhiteTextTypography variant="h1" component="h2" gutterBottom>
        76
                    </WhiteTextTypography>             
                 </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3">
              <Card className="card-chart" style={{height: "165px",border: "#1d8cf8 solid"}}>
                <CardHeader>
                  <h4 className="card-category" style={{color:"white",fontSize: "medium"}}>Total Shipments</h4>
                </CardHeader>
                <CardBody style={{display: "flex",justifyContent: "center",padding: "2px"}}>
                  <div style={{width: "150px",height: "93px",}}>
                    <WhiteTextTypography variant="h1" component="h2" gutterBottom>
        76
                    </WhiteTextTypography>             
                 </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row style={{margin:"0px"}}>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Reservations</h5>
                      <CardTitle tag="h2">Yearly Reservation Overview</CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: bigChartData === "chart1"
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => setBigChartData("chart1")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Accounts
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: bigChartData === "data2"
                          })}
                          onClick={() => setBigChartData("data2")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Purchases
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-gift-2" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="2"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: bigChartData === "data3"
                          })}
                          onClick={() => setBigChartData("data3")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Sessions
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-tap-02" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
               

                    <Line
                      data={chart1}
                      options={chartOptions1}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row style={{margin:"0px"}}>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Overall</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-bell-55 text-info" />{" "}
                     Reservations of Roomtype
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartReservationsOfRoomType}
                      options={chartOptions2}
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
                    Reserved Platform
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                  
                    <Bar
                      data={chartReservationPlatform.data}
                      options={chartReservationPlatform.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Completed Tasks</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-send text-success" /> Rooms Available Today
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    {/* <Pie
                      data={chartDataForRoomsAvailable}
                      options={chartDataForRoomsAvailable.options}
                    /> */}
                           <Bar
                      data={chartDataForRoomsAvailable.data}
                      options={chartDataForRoomsAvailable.options}
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
        reservation:state.firestore.ordered.reservation
    }
}

export default compose(connect(mapStateToProps,null),firestoreConnect([
    {collection: 'reservation'}
  ]))(FrontOfficeDashboard)
