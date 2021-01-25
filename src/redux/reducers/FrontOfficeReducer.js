const initState = {
    selectedRoom:null,
    selectedMonth:9,
    selectedDay:2,
    selectedCustomer:null,
    reservationType:"WEBSITE",
    numberOfPacks:0

}

const FrontOfficeReducer = (state = initState, action) => {
    switch (action.type){
        case 'MASTER_ROOM_TYPE_SELECTED':
            return ({
                ...state,
                selectedRoom:action.roomType
            });
        case 'MONTH_SELECTED':
                return ({
                    ...state,
                    selectedMonth:action.month,
                    
                });
        case 'DAY_SELECTED':
            console.log("reducer day",state.selectedDay)
                    return ({
                        ...state,
                        selectedDay:action.day
                    });
        case 'CUSTOMER_SELECTED':
                     return ({
                        ...state,
                        selectedCustomer:action.customer
                    });   
        case 'RESERVATION_TYPE_SELECTED':
                    return ({
                       ...state,
                       reservationType:action.reservationType
                       });       
        case 'NUMBER_OF_PACKS_SELECTED':
                    return ({
                       ...state,
                       numberOfPacks:action.numberOfPacks
                       });                                                        
            default :
            return state;
    }
}

export default FrontOfficeReducer