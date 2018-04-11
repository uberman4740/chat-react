import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css'
import uuid from 'uuid'
import {createStore} from 'redux'

const initialState = {
    activeThreadId: '1',
    threads: [
        {
            id: '1',
            title: 'Title 1',
            messages: [
                {
                    text: 'Text1 for Title1',
                    timestamp: Date.now(),
                    id: uuid.v4(),
                },
            ],
        },
        {
            id: '2',
            title: 'Title 2',
            messages: [],
        },
    ],
};

function reducer(state, action) {
    return state

}

const store = createStore(reducer, initialState)


class App extends Component {

    componentDidMount() {
        store.subscribe(() => this.forceUpdate())
    }

    render() {
        const state = store.getState();
        const activeThread = state.threads.find(
            (thread) => thread.id === state.activeThreadId
        )

        const tabs = state.threads.map(thread => (
            {
                id: thread.id,
                title: thread.title,
                active: thread.id === state.activeThreadId
            }

        ))

        return (
            <div>
                <ThreadTabs tabs={tabs}/>
                <Thread thread={activeThread}/>

            </div>
        )


    }
}
class Thread extends Component{
    render(){
        const messages = this.props.thread.messages.map((message,index)=>(
            <div key={index}>
                {message.text}
            </div>
        ))

        return(
            <div>
                {messages}
            </div>
        )
    }
}

class ThreadTabs extends Component {
    componentDidMount(){
        console.log(this.props.tabs.map(tab=>tab.active))
    }


    render() {
        const tabs = this.props.tabs.map((tab,index) => (
            <div key={index}>
                {tab.title}
            </div>


        ))
        return (
            <div>
                {tabs}

            </div>
        )
    }
}

export default App;
