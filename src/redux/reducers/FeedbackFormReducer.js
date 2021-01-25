const initState = {
    title:"abce"
}

const FrontOfficeReducer = (state = initState, action) => {
    switch (action.type){
        case 'FEEDBACK_STATE_CHANGE':
                    return ({
                        ...state,
                        state:action.state
                    })
                                                                      
            case 'FEEDBACK_INITIAL_STATE_CHANGE':
                return ({
                    ...state,
                    inintState:action.state
                })
                                                                  
        default :
            return state;
    }
}

export default FrontOfficeReducer