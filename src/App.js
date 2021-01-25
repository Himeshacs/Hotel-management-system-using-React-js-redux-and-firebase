import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Dashboard from './pages/Dashboard';
import { BrowserRouter } from 'react-router-dom';
import { Switch } from '@material-ui/core';

function App() {
  const room = useSelector(state => {
    console.log(state)
  })
//    <Dashboard/>

  return (
    <div className="App">    
      <Dashboard/>
    </div>
  );
}

export default firestoreConnect((props) => [
  {collection: 'roomtype'}
])(App);
