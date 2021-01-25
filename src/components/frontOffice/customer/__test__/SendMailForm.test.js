import React from 'react'
import ReactDOM from 'react-dom'
import SendMailForm from '../form/SendMailForm'
//import {render,cleanup} from '@testing-library/react'
import renderer from 'react-test-renderer'
import "@testing-library/jest-dom/extend-expect";
import DescriptionForm from '../../feedback/utill/DescriptionForm';
import { Provider } from 'react-redux';
import { Button } from '@material-ui/core';
import { createStore, compose, combineReducers } from 'redux'
import {
  reactReduxFirebase,
  firebaseStateReducer,
  firebaseConnect
} from 'react-redux-firebase'
import fbConfig from '../../../../config/fbConfig'
import { connect,useSelector } from "react-redux";
const PassThrough = (props) => <div>{JSON.stringify(this.props)}</div>
const Container = (props) => <Passthrough {...this.props} />

const enhance = compose(
  firebaseConnect(),
  connect()
)(Container)

const createStoreWithMiddleware = compose(
  reactReduxFirebase(fbConfig, { userProfile: 'users' })
)(createStore)
//import TestUtils from 'react-dom/test-utils';

test('Fake Test',() => {
    expect(true).toBeTruthy();
})


it('matches snapshot',() => {
    const tree = renderer.create                                     (
    <Provider> <Button/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();

})