import firebase from 'firebase/app'

export const updateReservation = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection("reservation").doc(payload.id).update({
          ...payload
        });
    }

}

export const insertReservation = (payload) => {
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        const {name,customer ,additional,roomType,startDay,endDay,phone,roomId,roomNo} = payload;
        const state = getState();
        console.log(state.frontOffice.selectedMonth,state.frontOffice.selectedDay)

        console.log( new Date(Date.parse(state.frontOffice.selectedMonth + ' ' + (state.frontOffice.selectedDay) +' 2020'))
        )
        firestore.collection('reservation').add({
            customer:customer,
            endDay:firebase.firestore.Timestamp.fromDate(  new Date(Date.parse((state.frontOffice.selectedMonth + 1)+ ' ' + (state.frontOffice.selectedDay ) +' 2020'))
            ),
            roomType:roomType,
            startDay:firebase.firestore.Timestamp.fromDate(  new Date(Date.parse((state.frontOffice.selectedMonth + 1)+ ' ' + (state.frontOffice.selectedDay ) +' 2020'))
            ),
            status:'Open',
            roomNo:roomNo,
            ReservationType:state.frontOffice.reservationType
        }).then((doc) => {
            console.log("Document written with ID: ", doc.id);
        }).catch((error) => {
            console.log("Error writing reservation ", error);
        })
    }
}

export const deleteReservation = (ReservationId) => {
    console.log(ReservationId)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('reservation').doc(ReservationId).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}

export const insertReservationItem = (roomType,roomNo) => {
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        //const {name,customerEmail ,additional,roomType,startDay,endDay,phone,roomId,roomNo} = payload;
        const state = getState();
        console.log("actionn dayyy",state.frontOffice.selectedDay)

        console.log( new Date(Date.parse(state.frontOffice.selectedMonth + ' ' + (state.frontOffice.selectedDay) +' 2020'))
        )
        firestore.collection('reservation').add({
            customer:state.frontOffice.selectedCustomer,
            endDay:firebase.firestore.Timestamp.fromDate(  new Date(Date.parse((state.frontOffice.selectedMonth + 1)+ ' ' + (state.frontOffice.selectedDay ) +' 2020'))
            ),
            roomType:roomType,
            startDay:firebase.firestore.Timestamp.fromDate(  new Date(Date.parse((state.frontOffice.selectedMonth + 1)+ ' ' + (state.frontOffice.selectedDay ) +' 2020'))
            ),
            status:'Open',
            roomNo:roomNo,
            reservationType:state.frontOffice.reservationType,
            numberOfPacks:state.frontOffice.numberOfPacks

        }).then((doc) => {
            console.log("Document written with ID: ", doc.id);
        }).catch((error) => {
            console.log("Error writing reservation ", error);
        })
    }
}