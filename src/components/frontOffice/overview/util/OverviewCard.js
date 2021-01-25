import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import RoomTypeOfReservationsChart from '../RoomTypeOfReservationsChart';
import ReservationTypesChart from '../ReservationTypesChart';
import RoomsAvailableOfRoomTypeChart from '../RoomsAvailableOfRoomTypeChart';
import { CircularProgress } from '@material-ui/core';
import MonthlyReservationChart from '../MonthlyReservationChart';

const useStyles = makeStyles(({ spacing }) => ({
  card: {
    marginTop: 40,
    borderRadius: spacing(0.5),
    transition: '0.3s',
    width: '90%',
    overflow: 'initial',
    background: '#ffffff',
    marginBottom: "55px"
  },
  content: {
    paddingTop: 0,
    textAlign: 'left',
    overflowX: 'auto',
    '& table': {
      marginBottom: 0,
      height:"300px"
    }
  },
}));

function OverviewCard(props) {
  const classes = useStyles();
  const cardHeaderStyles = useContainedCardHeaderStyles();
  const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
  const cardHeaderShadowStyles = useFadedShadowStyles();
  return (
    <Card className={cx(classes.card, cardShadowStyles.root)}>
      <CardHeader
        className={cardHeaderShadowStyles.root}
        classes={cardHeaderStyles}
        title={'Desserts'}
        subheader={'Select your favourite'}
      />
        {props.chart == 0 ? 
            <ReservationTypesChart/> : props.chart == 1 ? 
                <RoomsAvailableOfRoomTypeChart/> : props.chart == 2 ? 
                    <RoomTypeOfReservationsChart/> : props.chart == 3 ? <MonthlyReservationChart/> : <CircularProgress style={{marginTop:"200px"}} />}
    </Card>
  );
}
export default OverviewCard