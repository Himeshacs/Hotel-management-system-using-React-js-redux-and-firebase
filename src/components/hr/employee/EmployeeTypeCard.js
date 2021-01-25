import React from 'react';
import cx from 'clsx';
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered';

const useStyles = makeStyles(({ palette }) => ({
  card: {
    borderRadius: 12,
    minWidth: 25,
    textAlign: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 'auto',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 0,
  },
  subheader: {
    fontSize: 14,
    color: palette.grey[500],
    marginBottom: '0.875em',
  },
  statLabel: {
    fontSize: 12,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: '1px',
  },
}));

//export const EmployeeTypeCard = React.memo(function ProfileCard() {
  //const styles = useStyles();
  //const shadowStyles = useFadedShadowStyles();
  //const borderedGridStyles = useGutterBorderedGridStyles({
   // borderColor: 'rgba(0, 0, 0, 0.08)',
   // height: '50%',
 // });
  //        <Avatar className={styles.avatar} src={'https://i.pravatar.cc/300'} />

  export const EmployeeCard = (props) => {
    const employees = useSelector(state => state.firestore.ordered.employee)    
    const data = employees ? (employees.map(employee => ({...employee}))) : (null)    
    const count =  data.filter(employee => employee.emptype == props.employeeType.id).length
    console.log(data,count,props);
    const styles = useStyles();
  const shadowStyles = useFadedShadowStyles();
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: 'rgba(0, 0, 0, 0.08)',
    height: '50%',
  });
  return (
    <Card className={cx(styles.card, shadowStyles.root)}>
      <CardContent>
        <h1 className={styles.heading}>{props.employeeType? props.employeeType.id : (null)}</h1>
      </CardContent>
      <Divider light />
      <Box display={'flex'}>
        
          <h1>{count}</h1>
        
      </Box>
    </Card>
    
  )
};

export default firestoreConnect([    
  {collection: 'employee'},    
  {collection: 'employeeType'}
  ]) (EmployeeCard)