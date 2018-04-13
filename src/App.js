import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import uuid from 'uuid';
import {createStore, combineReducers} from 'redux'
const moment = require('moment');

moment().format();

const initialState = {
    activeThreadId: '1',
    threads: [
        {
            id: '1',
            title: 'Karan',
            messages: [
                {
                    text: 'Hey! how are you?',
                    timestamp: moment(Date.now(), 'x').format('DD MMM YYYY hh:mm a'),
                    id: uuid.v4(),
                },
            ],
        },
        {
            id: '2',
            title: 'Steve',
            messages: [],
        },
    ],
};
const reducer = combineReducers({
    activeThreadId: activeThreadIdReducer,
    threads: threadsReducer,
});
function activeThreadIdReducer(state='1',action) {
    if (action.type === 'OPEN_THREAD'){
        return action.id


    }
    else{
        return state
    }
}
function threadsReducer(state=[
    {
        id: '1',
        title: 'Karan',
        messages: [
            {
                text: 'Hey! how are you?',
                timestamp: moment(Date.now(), 'x').format('DD MMM YYYY hh:mm a'),
                id: uuid.v4(),
            },
        ],
    },
    {
        id: '2',
        title: 'Steve',
        messages: [],
    },
],action){
    if (action.type === 'ADD_MESSAGE'){
        const newMessage = {
            text:action.text,
            timestamp: Date.now(),
            id: uuid.v4()
        }
        const index = state.findIndex(
            (i)=>
                i.id === action.threadId

        )
        const updatedThread = {
            ...state[index],
            messages: state[index].messages.concat(newMessage)
        }
        return [
            ...state.slice(0,index), updatedThread, ...state.slice(index+1,state.length),
        ]



    }
    else if (action.type === 'DELETE_MESSAGE'){
        const index = state.findIndex(
            (i)=> i.messages.find((m)=>m.id=== action.id)
        )
        const updatedThread = {
            ...state[index],
            messages: state[index].messages.filter((m)=> m.id !== action.id)
        }

        return [
            ...state.slice(0,index), updatedThread, ...state.slice(index+1,state.length),
        ]

    }
    else {
        return state
    }
}

const store = createStore(reducer);


class App extends Component {
    componentDidMount() {
        store.subscribe(() => this.forceUpdate());
        console.log(moment(Date.now(), 'x').format('DD MMM YYYY hh:mm a'));
    }

    render() {
        const state = store.getState();
        const activeThread = state.threads.find(thread => thread.id === state.activeThreadId);

        const tabs = state.threads.map(thread => (
            {
                id: thread.id,
                title: thread.title,
                active: thread.id === state.activeThreadId,
            }

        ));

        return (
            <div className="ui card fluid">
                <div className="ui segment">
                    <ThreadTabs tabs={tabs}/>
                    <Thread thread={activeThread}/>

                </div>
            </div>

        );
    }
}

class Thread extends Component {
    handleClick = (id) => {
        store.dispatch({
            type: 'DELETE_MESSAGE',
            id,

        });
    }

    render() {
        const messages = this.props.thread.messages.map((message, index) => (
            <div onClick={() => this.handleClick(message.id)} className="comment">
                <div
                    key={index} className="text"
                >
                    {message.text}
                    <span className="meta"> &nbsp;@{message.timestamp}</span>
                </div>
            </div>
        ));

        return (
            <div>
                <div>
                    {messages}
                </div>
                <div>
                    <MessageInput threadId={this.props.thread.id}/>
                </div>
            </div>
        );
    }
}

class MessageInput extends Component {
    componentDidMount() {
        console.log(this.props.threadId);
    }

    state = {
        value: '',
    }
    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }
    handleSubmit = () => {
        store.dispatch({
            type: 'ADD_MESSAGE',
            text: this.state.value,
            threadId: this.props.threadId,
        });
        this.setState({value: ''});
    }


    render() {
        return (
            <div className="ui input">
                <input
                    onChange={this.onChange}
                    value={this.state.value}
                    type="text"
                />
                <button
                    onClick={this.handleSubmit}
                    type="submit"
                    className="ui primary button"
                >Submit
                </button>

            </div>

        );
    }
}

class ThreadTabs extends Component {
    componentDidMount() {
        console.log('Active tab');
        console.log(this.props.tabs.map(tab => tab.active));
    }

    handleClick = (id) => {
        store.dispatch({
            type: 'OPEN_THREAD',
            id,
        });
    }


    render() {
        const tabs = this.props.tabs.map((tab, index) => (

            <div
                key={index}
                onClick={() => this.handleClick(tab.id)}
                className={tab.active ? 'active item' : 'item'}
            >

                {tab.title}
            </div>


        ));
        return (
            <div className="ui top attached tabular menu">
                {tabs}

            </div>
        );
    }
}

export default App;
