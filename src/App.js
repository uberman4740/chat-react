import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'
import uuid from 'uuid'
import {createStore} from 'redux'

const initialState = {
    activeThreadId: '1-fca2',
    threads: [
        {
            id: '1-fca2',
            title: 'Buzz Aldrin',
            messages: [
                {
                    text: 'Twelve minutes to ignition.',
                    timestamp: Date.now(),
                    id: uuid.v4(),
                },
            ],
        },
        {
            id: '2-be91',
            title: 'Michael Collins',
            messages: [],
        },
    ],
};

function reducer(state, action){

}
const store = createStore(reducer,initialState)


class App extends Component {
  render() {

  }
}

export default App;
