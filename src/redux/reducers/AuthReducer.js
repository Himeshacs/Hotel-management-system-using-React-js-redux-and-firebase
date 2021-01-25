import { SIGNIN_SUCCESS, SIGNIN_ERROR } from "./ActionTypes";

const initState = {
    loginError:null,

}

const AuthReducer = (state = initState, action) => {
    switch (action.type){
        case SIGNIN_SUCCESS :
                    return ({
                        ...state,
                        loginError:null
                    })
                                                                      
            case SIGNIN_ERROR:
                return ({
                    ...state,
                    loginError:true
                })
                                                                  
        default :
            return state;
    }
}

export default AuthReducer