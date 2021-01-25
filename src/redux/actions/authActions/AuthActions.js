import { getFirestore } from "redux-firestore";
import {getFirebase} from 'react-redux-firebase'
import { firestore } from "firebase";
import { SIGNIN_SUCCESS, SIGNIN_ERROR } from "../../reducers/ActionTypes";


export const signIn = (Credentials) => {
    return(dispatch,getState,{getFirestore,getFirebase}) =>{
        const firebase = getFirebase();
        console.log('In action')
        firebase.auth().signInWithEmailAndPassword(
            Credentials.email,
            Credentials.password
        ).then(() =>{
            dispatch({
                type:SIGNIN_SUCCESS});
                //callback();
        }).catch((err) =>{
            console.log('error in action')
            dispatch({
                type:SIGNIN_ERROR,
                payLoad:"Invalid Login Credentials"})
        
        })
    }
}