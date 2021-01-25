export const onMasterClick = (roomType) => {
    return (dispatch,getState,{getFirestore,getFirebase}) => {
             dispatch({type:'MASTER_ROOM_TYPE_SELECTED',
                        roomType:roomType})
    }
}



export const handleMonthPickReservation = (month) => {
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        console.log(getState())

             dispatch({type:'MONTH_SELECTED',
                        month:month -1})
    }
}

export const handleCustomerPick = (customer) => {
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        console.log(getState())

             dispatch({type:'CUSTOMER_SELECTED',
                        customer:customer})
    }
}

export const handleReservationTypePick = (reservationType) => {
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        console.log(getState())

             dispatch({type:'RESERVATION_TYPE_SELECTED',
                reservationType:reservationType})
    }
}

export const handleNumberOfPacks = (numberOfPacks) => {
    return (dispatch,getState,{getFirestore,getFirebase}) => {
             dispatch({type:'NUMBER_OF_PACKS_SELECTED',
             numberOfPacks:numberOfPacks})
    }
}

export const handleDayPick = (day) => {
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        console.log("in nav actions",day)

             dispatch({type:'DAY_SELECTED',
                        day:day})
    }
}


export const changeFeedbackFormState = (state) => {
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        console.log("in nav actions",state)

             dispatch({type:'FEEDBACK_STATE_CHANGE',
                        state:state})
    }
}

export const changeFeedbackInitialFormState = (state) => {
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        console.log("in nav actions",state)

             dispatch({type:'FEEDBACK_INITIAL_STATE_CHANGE',
                        state:state})
    }
}