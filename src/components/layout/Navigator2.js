import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import PeopleIcon from '@material-ui/icons/People';
import { StarHalfRounded } from '@material-ui/icons';
import { StepIcon } from '@material-ui/core';
import { SvgIcon } from 'material-ui';
import { SpeedDialIcon } from '@material-ui/lab';


const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
    color:"white"
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
    color:"white"
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
});

function Navigator2(props) {
  const { classes, ...other } = props;
  const [frontOffice, setFrontOffice] = React.useState(false);
  const [finance, setFinance] = React.useState(false);
  const [frontOfficeChart, setFrontOfficeChart] = React.useState(false);

  const [maintenance, setMaintenance] = React.useState(false);
  const [houseKeeping, setHouseKeeping] = React.useState(false);
  const [purchasesnInventory, setpurchasesnInventory] = React.useState(false);
  const [fnb,setFnb] = React.useState(false);
  const [production,setProduction] = React.useState(false);
  const [services,setServices] = React.useState(false);
  const [humanResource, setHumanResource] = React.useState(false);


   const handleFinance = () => {
        setFinance(!finance);
        props.setModule("Finance")
    };

  const handleFrontOfficeChart = () => {
    setFrontOfficeChart(!frontOfficeChart);
      props.setModule("Front Office")
     };
  
  const handleFrontOffice = () => {
    setFrontOffice(!frontOffice);
    props.setModule("Front Office")
   };

   const handleMaintnance = () => {
    setMaintenance(!maintenance);
    props.setModule("Maintenance")
};
const handleHouseKeeping = () => {
  setHouseKeeping(!maintenance);
  props.setModule("House Keeping")
};
   const handlePurchasesnInventory = () => {
    setpurchasesnInventory(!purchasesnInventory);
    props.setModule("Purchases and Inventory")
};

   const handleFnb = () => {
     setFnb(!fnb);
     props.setModule("Food and Beverage")
   };

   const handleProduction = () => {
    setProduction(!production);
    props.setModule("Food and Beverage - Production")
   };
   const handleServices = () => {
    setServices(!services);
   };
   const handleHumanResource = () => {
    setHumanResource(!humanResource);
    props.setModule("Human Resources")
  };

//----------------------------------------UI ELEMENTS -----------------------------------------------------------------------
const purchasesnInventoryNav  = (
  <div>
<ListItem button onClick={handlePurchasesnInventory} className={clsx(classes.item,classes.itemActiveItem)}>
    <ListItemIcon className={classes.itemIcon}>
      <ShoppingCartIcon />
    </ListItemIcon>
    <ListItemText primary="Purchases and Inventory" 
    classes={{
              primary: classes.categoryHeaderPrimary,
            }}/>
    {purchasesnInventory ? <ExpandLess /> : <ExpandMore />}
  </ListItem>
  <Collapse in={purchasesnInventory} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
      <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
        <ListItemIcon className={classes.itemIcon}>
          <ShoppingCartIcon />
        </ListItemIcon>
    <Link to="/PnI" >
        <ListItemText  
            classes={{
          primary: classes.itemPrimary,
        }}
        >Add Suppliers</ListItemText></Link>
      </ListItem>
      <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
        <ListItemIcon className={classes.itemIcon}>
          <ShoppingCartIcon />
        </ListItemIcon>
    <Link to="/sup" >
        <ListItemText  
            classes={{
          primary: classes.itemPrimary,
        }}
        >Current Suppliers</ListItemText></Link>
      </ListItem>
      <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
        <ListItemIcon className={classes.itemIcon}>
          <ShoppingCartIcon />
        </ListItemIcon>
    <Link to="/pReq" >
        <ListItemText  
            classes={{
          primary: classes.itemPrimary,
        }}
        >Purchases Request</ListItemText></Link>
      </ListItem>
      <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
        <ListItemIcon className={classes.itemIcon}>
          <ShoppingCartIcon />
        </ListItemIcon>
    <Link to="/pReqMng" >
        <ListItemText  
            classes={{
          primary: classes.itemPrimary,
        }}
        >Purchases Request Managment</ListItemText></Link>
      </ListItem>
      <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
        <ListItemIcon className={classes.itemIcon}>
          <ShoppingCartIcon />
        </ListItemIcon>
    <Link to="/pOrd" >
        <ListItemText  
            classes={{
          primary: classes.itemPrimary,
        }}
        >Purchases Order</ListItemText></Link>
      </ListItem>
      <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
        <ListItemIcon className={classes.itemIcon}>
          <ShoppingCartIcon />
        </ListItemIcon>
    <Link to="/pTable" >
        <ListItemText  
            classes={{
          primary: classes.itemPrimary,
        }}
        >Order Table</ListItemText></Link>
      </ListItem>
      <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
        <ListItemIcon className={classes.itemIcon}>
          <ShoppingCartIcon />
        </ListItemIcon>
    <Link to="/addCon" >
        <ListItemText  
            classes={{
          primary: classes.itemPrimary,
        }}
        >Add Contract</ListItemText></Link>
      </ListItem>
      <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
        <ListItemIcon className={classes.itemIcon}>
          <ShoppingCartIcon />
        </ListItemIcon>
    <Link to="/conTable" >
        <ListItemText  
            classes={{
          primary: classes.itemPrimary,
        }}
        >Contract Details</ListItemText></Link>
      </ListItem>
    </List>
  </Collapse>
  </div>
)
const maintenanceNav = (
    <div>
  <ListItem button onClick={handleMaintnance} className={clsx(classes.item,classes.itemActiveItem)}>
      <ListItemIcon className={classes.itemIcon}>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Maintenance" 
      classes={{
                primary: classes.categoryHeaderPrimary,
              }}/>
      {maintenance ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={maintenance} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <PeopleIcon />
          </ListItemIcon>
		  <Link to="/maintenance/pool" >
          <ListItemText  
              classes={{
            primary: classes.itemPrimary,
          }}
          >Pool Maintenance</ListItemText></Link>
        </ListItem>
        <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <PeopleIcon />
          </ListItemIcon>
		  <Link to="/maintenance/service" >
          <ListItemText  
              classes={{
            primary: classes.itemPrimary,
          }}
          >Services Management</ListItemText></Link>
        </ListItem>
        <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <PeopleIcon />
          </ListItemIcon>
		  <Link to="/maintenance/serviceprovider" >
          <ListItemText  
              classes={{
            primary: classes.itemPrimary,
          }}
          >Service Providers</ListItemText></Link>
        </ListItem>
        <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <PeopleIcon />
          </ListItemIcon>
		  <Link to="/maintenance/movement" >
          <ListItemText  
              classes={{
            primary: classes.itemPrimary,
          }}
          >Movement Activity</ListItemText></Link>
        </ListItem>
      </List>
    </Collapse>
    </div>
)

const houseKeepingNav = (
  <div>
<ListItem button onClick={handleHouseKeeping} className={clsx(classes.item,classes.itemActiveItem)}>
    <ListItemIcon className={classes.itemIcon}>
      <PeopleIcon />
    </ListItemIcon>
    <ListItemText primary="Housekeeping" 
    classes={{
              primary: classes.categoryHeaderPrimary,
            }}/>
    {houseKeeping ? <ExpandLess /> : <ExpandMore />}
  </ListItem>
  <Collapse in={houseKeeping} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
      <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
        <ListItemIcon className={classes.itemIcon}>
          <PeopleIcon />
        </ListItemIcon>
    <Link to="/housekeeping/laundry" >
        <ListItemText  
            classes={{
          primary: classes.itemPrimary,
        }}
        >Laundry Management</ListItemText></Link>
      </ListItem>
      <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
        <ListItemIcon className={classes.itemIcon}>
          <PeopleIcon />
        </ListItemIcon>
    <Link to="/housekeeping/cleaning" >
        <ListItemText  
            classes={{
          primary: classes.itemPrimary,
        }}
        >Room Cleaning</ListItemText></Link>
      </ListItem>
         </List>
  </Collapse>
  </div>
)

const frontOfficeNav = (
    <div>
    <ListItem button onClick={handleFrontOffice} className={clsx(classes.item,classes.itemActiveItem)}>
      <ListItemIcon className={classes.itemIcon}>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Front Office" 
      classes={{
                primary: classes.categoryHeaderPrimary,
              }}/>
      {frontOffice ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={frontOffice} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItem button onClick={handleFrontOfficeChart} className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <PeopleIcon />
          </ListItemIcon>
          <Link to="/frontoffice/overview" >
          <ListItemText  
              classes={{
            primary: classes.categoryHeaderPrimary,
          }}
          >Analytics</ListItemText></Link>
          {frontOfficeChart ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={frontOfficeChart} timeout="auto" unmountOnExit>
        <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <PeopleIcon />
          </ListItemIcon>
          <Link to="/frontoffice/analytics/reservation" >
          <ListItemText  
              classes={{
            primary: classes.itemPrimary,
          }}
          >Reservation Analytics</ListItemText> </Link>
        </ListItem>
        <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <PeopleIcon />
          </ListItemIcon>
          <Link to="/frontoffice/analytics/feedback" >
          <ListItemText  
              classes={{
            primary: classes.itemPrimary,
          }}
          >Feedback Analytics</ListItemText> </Link>
        </ListItem>
        <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <PeopleIcon />
          </ListItemIcon>
          <Link to="/frontoffice/analytics/customer" >
          <ListItemText  
              classes={{
            primary: classes.itemPrimary,
          }}
          >Customer Analytics</ListItemText> </Link>
        </ListItem>
        </Collapse>
        <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <PeopleIcon />
          </ListItemIcon>
          <Link to="/frontoffice/rooms" >
          <ListItemText  
              classes={{
            primary: classes.categoryHeaderPrimary,
          }}
          >Room Handling</ListItemText> </Link>
        </ListItem>
        <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <PeopleIcon />
          </ListItemIcon>
          <Link to="/frontoffice/customers" >
          <ListItemText  
              classes={{
            primary: classes.categoryHeaderPrimary,
          }}
          >Customer Handling</ListItemText></Link>
        </ListItem>
        <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <PeopleIcon />
          </ListItemIcon>
          <Link to="/frontoffice/feedback" >
          <ListItemText  
              classes={{
            primary: classes.categoryHeaderPrimary,
          }}
          >Feedback Handling</ListItemText></Link>
        </ListItem>
        <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <PeopleIcon />
          </ListItemIcon>
          <Link to="/frontoffice/reservation" >
          <ListItemText  
              classes={{
            primary: classes.categoryHeaderPrimary,
          }}
          >Reservation Handling</ListItemText></Link>
        </ListItem>
        <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <PeopleIcon />
          </ListItemIcon>
          <Link to="/frontoffice/roomtypes" >
          <ListItemText  
              classes={{
            primary: classes.categoryHeaderPrimary,
          }}
          >Room Types</ListItemText></Link>
        </ListItem>
      </List>
    </Collapse>
    </div>
)
const financeNav = (
    <div>
  <ListItem button onClick={handleFinance} className={clsx(classes.item, classes.itemActiveItem)}>
      <ListItemIcon className={classes.itemIcon}>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Finance" 
      classes={{
                primary: classes.categoryHeaderPrimary,
              }}/>
      {finance ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={finance} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <StarBorder />
          </ListItemIcon>
		  <Link to="/finance/assetss" >
          <ListItemText  
              classes={{
            primary: classes.itemPrimary,
          }}
          >AssetManagement</ListItemText></Link>
        </ListItem>
        <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <StarBorder />
          </ListItemIcon>
		  <Link to="/finance/pettycash" >
          <ListItemText  
              classes={{
            primary: classes.itemPrimary,
          }}
          >Petty Cash Management</ListItemText></Link>
        </ListItem>
        <ListItem button className={clsx(classes.item, classes.nested,classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <StarBorder />
          </ListItemIcon>
		  <Link to="/finance/cashflow" >
          <ListItemText  
              classes={{
            primary: classes.itemPrimary,
          }}
          >Cash flow managemnt</ListItemText></Link>
        </ListItem>
		        <ListItem button className={clsx(classes.item, classes.nested,classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <StarBorder />
          </ListItemIcon>
		  <Link to="/finance/invoice" >
          <ListItemText  
              classes={{
            primary: classes.itemPrimary,
          }}
          >Invoice</ListItemText></Link>
        </ListItem>
		        <ListItem button className={clsx(classes.item, classes.nested,classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <StarBorder />
          </ListItemIcon>
		  <Link to="/finance/loan" >
          <ListItemText  
              classes={{
            primary: classes.itemPrimary,
          }}
          >Loan Management</ListItemText></Link>
        </ListItem>
		        <ListItem button className={clsx(classes.item, classes.nested,classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <StarBorder />
          </ListItemIcon>
		  <Link to="/finance/salary" >
          <ListItemText  
              classes={{
            primary: classes.itemPrimary,
          }}
          >Salary Management</ListItemText></Link>
        </ListItem>
      </List>
    </Collapse>
    </div>
)
const humanResourceNav = (
  <div>
<ListItem button onClick={handleHumanResource} className={clsx(classes.item,classes.itemActiveItem)}>
    <ListItemIcon className={classes.itemIcon}>
      <PeopleIcon />
    </ListItemIcon>
    <ListItemText primary="Human Resource" 
    classes={{
              primary: classes.categoryHeaderPrimary,
            }}/>
    {humanResource ? <ExpandLess /> : <ExpandMore />}
  </ListItem>
  <Collapse in={humanResource} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
      <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
        <ListItemIcon className={classes.itemIcon}>
          <PeopleIcon />
          </ListItemIcon>
          <Link to="/hr/employee" >
        <ListItemText  
            classes={{
          primary: classes.itemPrimary,
        }}
        >Employee Management</ListItemText></Link>
      </ListItem>
      <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
        <ListItemIcon className={classes.itemIcon}>
          <PeopleIcon />
        </ListItemIcon>
          <Link to="/hr/attendence" >
        <ListItemText  
            classes={{
          primary: classes.itemPrimary,
        }}
        >Attendence Management</ListItemText></Link>
      </ListItem>
      <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
        <ListItemIcon className={classes.itemIcon}>
          <PeopleIcon />
        </ListItemIcon>
          <Link to="/hr/absence/abtype" >
        <ListItemText  
            classes={{
          primary: classes.itemPrimary,
        }}
        >Absence Type</ListItemText></Link>
      </ListItem>
      <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
        <ListItemIcon className={classes.itemIcon}>
          <PeopleIcon />
        </ListItemIcon>
          <Link to="/hr/absence/ablist" >
        <ListItemText  
            classes={{
          primary: classes.itemPrimary,
        }}
        >Absence List</ListItemText></Link>
      </ListItem>
    </List>
  </Collapse>
  </div>
)
const fnbNav = (
  <div>
<ListItem button onClick={handleFnb} className={clsx(classes.item, classes.itemActiveItem)}>
    <ListItemIcon className={classes.itemIcon}>
      <SpeedDialIcon />
    </ListItemIcon>
    <ListItemText primary="Food and Beverage" 
    classes={{
              primary: classes.categoryHeaderPrimary,
            }}/>
    {fnb ? <ExpandLess /> : <ExpandMore />}
  </ListItem>
  <Collapse in={fnb} timeout="auto" unmountOnExit>
  <List>
    <List component="div" disablePadding>
      <ListItem button onClick={handleProduction} className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
        <ListItemIcon className={classes.itemIcon}>
          <StarHalfRounded />
        </ListItemIcon>
    {/* <Link to="/fnb/production" > */}
    <ListItemText primary="Production" 
    classes={{
              primary: classes.categoryHeaderPrimary,
            }}/>
    {production ? <ExpandLess /> : <ExpandMore />}
  </ListItem>
         <Collapse in={production} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
      <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
        <ListItemIcon className={classes.itemIcon}>
          <StarBorder />
        </ListItemIcon>
    <Link to="/fnb/production/management" >
        <ListItemText  
            classes={{
          primary: classes.itemPrimary,
        }}
        >Management</ListItemText></Link>
      </ListItem>
      <ListItem button  onClick={handleProduction} className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
        <ListItemIcon className={classes.itemIcon}>
          <StarBorder />
        </ListItemIcon>
    <Link to="/fnb/production/reports" >
        <ListItemText  
            classes={{
          primary: classes.itemPrimary,
        }}
        >Reports</ListItemText></Link>
      </ListItem>
    </List>
  </Collapse>
      {/* <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
        <ListItemIcon className={classes.itemIcon}>
          <StarBorder />
        </ListItemIcon>
    <Link to="/fnb/services" >
        <ListItemText  
            classes={{
          primary: classes.itemPrimary,
        }}
        >Services</ListItemText></Link>
      </ListItem> */}
      <ListItem button onClick={handleServices} className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
        <ListItemIcon className={classes.itemIcon}>
          <StarHalfRounded />
        </ListItemIcon>
    {/* <Link to="/fnb/production" > */}
    <ListItemText primary="Services" 
    classes={{
              primary: classes.categoryHeaderPrimary,
            }}/>
    {services ? <ExpandLess /> : <ExpandMore />}
  </ListItem>
         <Collapse in={services} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
      <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
        <ListItemIcon className={classes.itemIcon}>
          <StarBorder />
        </ListItemIcon>
    <Link to="/fnb/services/orderMng" >
        <ListItemText  
            classes={{
          primary: classes.itemPrimary,
        }}
        >Order management</ListItemText></Link>
      </ListItem>
      <ListItem button  onClick={handleServices} className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
        <ListItemIcon className={classes.itemIcon}>
          <StarBorder />
        </ListItemIcon>
    <Link to="/fnb/services/barInvMng" >
        <ListItemText  
            classes={{
          primary: classes.itemPrimary,
        }}
        >Bar Inventory</ListItemText></Link>
      </ListItem>
    </List>
  </Collapse>

    </List>
    </List>
  </Collapse>
  </div>
)
  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          HOTEL-SYS
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            Dashboard
          </ListItemText>
        </ListItem>
      </List>
      <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                Modules
              </ListItemText>
            </ListItem>
      {frontOfficeNav}
      {financeNav}
      {maintenanceNav}
      {purchasesnInventoryNav}
      {fnbNav}
      {humanResourceNav}
      {houseKeepingNav}
    </Drawer>
  );
}

Navigator2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator2);