import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { BrowserRouter, Route,Switch } from 'react-router-dom';
import LayoutContent from '../components/layout/LayoutContent';
import ReservatonBoxView from '../components/frontOffice/reservation/ReservationBoxView';
import RoomTypeTable from '../components/frontOffice/rooms/RoomTypeTable';
import Editable from '../components/frontOffice/rooms/Editable';
import PoolService from '../components/maintainence/PoolService';
import currentSuppliers from '../components/purchasesnInventory/supplierInfo/currentSuppliers';
import purchasesRequestManagement from '../components/purchasesnInventory/purchasesManagment/purchasesRequestManagment'
import purchasesOrder from '../components/purchasesnInventory/purchasesManagment/purchasesOrder' 
// import editOrderTable from '../components/fnbServices/EditOrderTable';
import fnbProdMgmt from '../components/F&bProduction/management/fnbProdMgmt';
import EmployeeList from '../components/hr/employee/EmployeeList';
import AbsenceTypeList from '../components/hr/absence/AbsenceTypeList';
import AbsenceList from '../components/hr/absence/AbsenceList';
import AttendenceList from '../components/hr/attendence/AttendenceList';
import PettyRequest from '../components/finance/petty/PettyRequest';
import PettyCashManagement from '../components/finance/petty/PettyCashManagement';
import PettyCashMain from '../components/finance/petty/PettyCashMain';
import CashFlowMain from '../components/finance/cashflow/CashFlowMain';
import CashInflow from '../components/finance/cashflow/CashInflow';
import CashOutFlow from '../components/finance/cashflow/CashOutFlow';
import AssetMain from '../components/finance/asset/AssetMain';
import AssetRequest from '../components/finance/asset/AssetRequest';
import AssetList from '../components/finance/asset/AssetList';
import BarInvoice from '../components/finance/invoice/BarInvoice';
import FrontInvoice from '../components/finance/invoice/FrontInvoice';
import InvoiceMain from '../components/finance/invoice/InvoiceMain';
import LoanMain from '../components/finance/loan/LoanMain';
import Loan from '../components/finance/loan/Loan';
import LoanIssue from '../components/finance/loan/LoanIssue';
import SalaryMain from '../components/finance/salary/SalaryMain';
import Attendance from '../components/finance/salary/Attendance';
import SalaryMgmt from '../components/finance/salary/SalaryMgmt';
import Navigator from '../components/layout/Navigator';
import Content from '../components/layout/LayoutContent';
import { Redirect } from 'react-router-dom';
import Header from '../components/layout/Header';
import RoomHandling from './frontOfficePages/RoomHandling';
import PermanentDrawerLeft from '../components/frontOffice/rooms/MasterDetail';
import RoomList from '../components/frontOffice/rooms/RoomList';
import InsertReservationForm from '../components/frontOffice/reservation/forms/InsertReservationForm';
import CustomerTable from '../components/frontOffice/customer/CustomerTable';
import FeedBackTable from '../components/frontOffice/feedback/FeedBackTable';
import FrontOfficeLandingPage from '../pages/frontOfficePages/FrontOfficeLandingPage'
import Navigator2 from '../components/layout/Navigator2';
import RoomTypeOfReservationsChart from '../components/frontOffice/overview/RoomTypeOfReservationsChart';
import RoomsAvailableOfRoomTypeChart from '../components/frontOffice/overview/RoomsAvailableOfRoomTypeChart';
import serviceProvider from '../components/maintainence/serviceProvider';
import MovementActivity from '../components/maintainence/MovementActivity';
import MaintenenceService from '../components/maintainence/MaintenenceService';
import purchasesnInventory from '../components/purchasesnInventory/supplierInfo/addSuppliers';
import currentSupplers from '../components/purchasesnInventory/supplierInfo/currentSuppliers';
import purchasesRequest from '../components/purchasesnInventory/purchasesManagment/purchasesRequest';
import productTable from '../components/purchasesnInventory/purchasesManagment/productTable'
import purchasesRequestManagment from '../components/purchasesnInventory/purchasesManagment/purchasesRequestManagment';


import MenuForm from '../components/F&bProduction/management/Forms/MenuForm';
import FrontOfficeOverview from '../components/frontOffice/FrontOfficeOverview';
import SignIn from '../components/auth/Signin';
import { useSelector, connect } from 'react-redux';
import Signin from '../components/auth/Signin';
import RequireAuth from '../components/auth/RequireAuth';
//import Voice from '../components/frontOffice/experiment/Voice';
import FrontOfficeDashboard from '../components/frontOffice/FrontOfficeDashBoard';


// import MenuForm from "../components/F&bProduction/management/Forms/MenuForm";
/*import addSuppliers from '../components/purchasesnInventory/supplierInfo/addSuppliers'
import AssetRequest from '../components/frontOffice/reservation/'
*/
import FnBserviceMng from '../components/fnbServices/FnBserviceMng';
import FnBServiceBarMng from '../components/fnbServices/FnBServiceBarMng';
import OrderForm from '../components/fnbServices/OrderForm';
import InventoryForm from '../components/fnbServices/InventoryForm';
import { ModuleNames } from 'ag-grid-community';
import FeedbackOverview from '../components/frontOffice/overview/FeedbackOverview';
import CustomerOverview from '../components/frontOffice/overview/CustomerOverview';
import CustomerLocation from '../components/frontOffice/customer/CustomerLocation';
import AddContract from '../components/purchasesnInventory/contractManagement/addContract';
import { CircularProgress } from 'material-ui';
import tableChart from '../components/F&bProduction/Charts/Chart';
import CleaningSchedule from '../components/housekeeping/CleaningSchedule';
import LaundryManagement from '../components/housekeeping/LaundryManagement';
import contractDetails from '../components/purchasesnInventory/contractManagement/contractDetails';
// import EditOrderTable from '../components/fnbServices/EditOrderTable';
// import OrderForm from '../components/fnbServices/OrderForm';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#232f3e',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

const drawerWidth = 256;

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: "0px",
    background: '#eaeff1',
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1',
  },
};

function Dashboard(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(true);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [module,setModule] = useState("Front Office");

  const auth = useSelector(state => state.firebase.auth)  
console.log(auth)
if(!auth.isLoaded){
  return (<div>    Loading
  </div>)
}else{

if (!auth.uid){

  return (
    <BrowserRouter>
      <SignIn></SignIn>
    </BrowserRouter>
  )
}
else{

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <nav className={classes.drawer}>
            <Hidden smUp implementation="js">
              <Navigator2
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                setModule={setModule}
              />
            </Hidden>
            <Hidden xsDown implementation="css">
              <Navigator2 PaperProps={{ style: { width: drawerWidth } }} setModule={setModule} />
            </Hidden>
          </nav>
          <div className={classes.app}>
            <Header onDrawerToggle={handleDrawerToggle} module={module}/>
            <main className={classes.main}>
            <Switch>    
                <Route exact path="/" component={RoomHandling}/>
            <Route exact path='/res' component={ReservatonBoxView}/>
            <Route exact path='/ed' component={RoomTypeTable}/>
            {/*<Route exact path='/form' component={InsertReservationForm}/>*/}
            {/* <Route exact path='/Food&Beverages' component={fnbProdMgmt}/> */}
            <Route exact path='/m' component={PermanentDrawerLeft}/>
            <Route exact path="/hr/employee" component={EmployeeList}/>
            <Route exact path="/cust" component={CustomerTable}/>
            <Route exact path="/feed" component={FeedBackTable}/>
            <Route exact path="/PnI" component={purchasesnInventory}/>
            <Route exact path="/addCon" component={AddContract}/>
            <Route exact path="/conTable" component={contractDetails}/>
            <Route exact path="/sup" component={currentSuppliers}/>
            <Route exact path="/pReq" component={purchasesRequest}/>
            <Route exact path="/pOrd" component={purchasesOrder}/>
            <Route exact path="/pReqMng" component={purchasesRequestManagement}/>
            <Route exact path="/pTable" component={productTable}/>
            <Route exact path="/poolservice" component={PoolService}/>
            <Route exact path="/newMenu" component={MenuForm} />
            {/* <Route exact path='/newOrder' component={OrderForm}/> */}


     
            {/* <Route exact path="/voice" component={Voice}/> */}
            <Route exact path="/chart" component={RoomsAvailableOfRoomTypeChart}/>

            {/*                  <Route exact path="/foodOrder" component={FnBserviceMng} />
       <Route exact path="/newMenu" component={MenuForm} />
<Route exact path='/newMenu' component={AddMenu}/> 
            <Route exact path="/Purchases & Inventory" component={addSuppliers}/>
                        <Route exact path='/newOrder' component={OrderForm}/>

}
            <Route exact path="/hr/employee" component={EmployeeList}/>
            <Route exact path="/sup" component={currentSuppliers}/>
            <Route exact path="/req" component={purchasesRequestManagement}/>
            <Route exact path="/porder" component={purchasesOrder}/>
            */}


            <Route exact path='/fnb/production/management' component={fnbProdMgmt}/>
            <Route exact path='/fnb/production/newMenu' component={MenuForm}/>
            <Route exact path='/fnb/production/reports' component={tableChart} />

            <Route exact path='/fnb/services/barInvMng' component={FnBServiceBarMng}/>
            <Route exact path="/fnb/services/orderMng" component={FnBserviceMng} />



            <Route exact path='/frontoffice/rooms' component={PermanentDrawerLeft}/>
            <Route exact path='/frontoffice/customers' component={CustomerTable}/>
            <Route exact path='/frontoffice/feedback' component={FeedBackTable}/>
            <Route exact path='/frontoffice/reservation' component={ReservatonBoxView}/>
            <Route exact path='/frontoffice/roomtypes' component={RoomTypeTable}/>
            <Route exact path='/frontoffice/overview' component={CustomerOverview}/>
            <Route exact path='/frontoffice/analytics/feedback' component={FeedbackOverview}/>
            <Route exact path='/frontoffice/analytics/customer' component={CustomerOverview}/>
            <Route exact path='/frontoffice/analytics/reservation' component={FrontOfficeDashboard}/>
            

            <Route exact path='/finance/assetss' component={AssetMain}/>
            <Route exact path='/finance/cashflow' component={CashFlowMain}/>
            <Route exact path='/finance/invoice' component={InvoiceMain}/>
            <Route exact path='/finance/loan' component={LoanMain}/>
            <Route exact path='/finance/pettycash' component={PettyCashMain}/>
            <Route exact path='/finance/salary' component={SalaryMain}/>
            {/*<Route exact path="/Purchases & Inventory" component={addSuppliers}/>
            <Route exact path="/pReq" component={purchasesRequest}/>*/}
            <Route exact path="/hr/employee" component={EmployeeList}/>
            <Route exact path="/hr/absence/abtype" component={AbsenceTypeList}/>
            <Route exact path="/hr/absence/ablist" component={AbsenceList}/>
            <Route exact path="/hr/attendence" component={AttendenceList}/>

            {/*<Route exact path="/pOrd" component={purchasesOrder}/>*/}


            <Route exact path="/maintenance/pool" component={PoolService}/>
            <Route exact path="/maintenance/serviceprovider" component={serviceProvider}/>
            <Route exact path="/housekeeping/laundry" component={LaundryManagement}/>
            <Route exact path="/housekeeping/cleaning" component={CleaningSchedule}/>

            <Route exact path="/edit" component={Editable}/>
            <Route exact path="/map" component={CustomerLocation}/>
            <Route exact path="/housekeeping/laundry" component={CleaningSchedule}/>
            <Route exact path="/housekeeping/cleaning" component={LaundryManagement}/>
            </Switch>
          </main>
        </div>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
          }     
}
}
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);