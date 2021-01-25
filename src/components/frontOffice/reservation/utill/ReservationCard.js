import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { useSelector, connect } from 'react-redux';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered';

import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CancelIcon from '@material-ui/icons/Cancel';
import {deleteReservation} from '../../../../redux/actions/frontOfficeActions/ReservationActions'
import ReservationDetails from '../forms/ReservationDetails';
const useStyles = makeStyles(({ palette }) => ({
  card: {
    borderRadius: 12,
    minWidth: 150,
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

export const ReservationCard = React.memo(function ProfileCard(props) {
  const styles = useStyles();
  const shadowStyles = useFadedShadowStyles();
  console.log(props.reservation)
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: 'rgba(0, 0, 0, 0.08)',
    height: '50%',
  });

  const handleDelete = () => {
    props.deleteReservation(props.reservation.id)
  }
  return (
    <Card className={cx(styles.card, shadowStyles.root)}>
      <Box display={'flex'} style={{padding: "8px 0"}}>
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
        <IconButton color="primary" aria-label="add to shopping cart" >
        <ReservationDetails reservation={props.reservation}/>
        </IconButton>
        </Box>
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
          <IconButton color="primary" aria-label="add to shopping cart" onClick={handleDelete}>
            <CancelIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
});

const mapDispatchToProps = (dispatch) => {
  return {
      deleteReservation: (payload) => dispatch(deleteReservation(payload))
  }
}
export default connect(null,mapDispatchToProps)( ReservationCard)