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

        if
            (action.type === 'ADD_MESSAGE')
        {
            const newMessage = {
                id: uuid.v4(),
                text: action.text,
                time: Date.now()
            }
            const threadIndex = state.threads.findIndex((t) => (
                t.id === action.threadId
            ))
            console.log("In reducer")
            console.log(threadIndex)

            const newThread = {
                ...state.threads[threadIndex],
                messages: state.threads[threadIndex].messages.concat(newMessage)
            }
            return {
                ...state,
                threads: [...state.threads.slice(0, threadIndex), newThread, ...state.threads.slice(threadIndex + 1, state.threads.length)

                ]

            }
        }
        else
            if (action.type === 'DELETE_MESSAGE') {
                const threadIndexx = state.threads.findIndex(
                    (t) => t.messages.find((m) => (
                        m.id === action.id
                    ))
                )
                const oldThread = state.threads[threadIndexx]
                const newThread = {...oldThread, messages: oldThread.messages.filter((m) => m.id !== action.id)}
                return {
                    ...state,
                    threads: [...state.threads.slice(0, threadIndexx), newThread, ...state.threads.slice(threadIndexx + 1, state.threads.length)

                    ]

                }
            }

            else {
                return state

            }



    // return state
    // type: 'ADD_MESSAGE',
    //     text: this.state.value,
    //     threadId: this.props.threadId
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

class Thread extends Component {
    handleClick = (id) => {
        store.dispatch({
            type: 'DELETE_MESSAGE',
            id: id

        })
    }

    render() {
        const messages = this.props.thread.messages.map((message, index) => (
            <div onClick={() => this.handleClick(message.id)}>
                <div key={index}>
                    {message.text}
                </div>
            </div>



        ))

        return (
            <div>
                <div>
                    {messages}
                </div>

                <div>
                    <MessageInput threadId={this.props.thread.id}/>
                </div>
            </div>


        )
    }
}

class MessageInput extends Component {
    componentDidMount() {
        console.log(this.props.threadId)
    }

    state = {
        value: ''
    }
    onChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    handleSubmit = () => {
        store.dispatch({
            type: 'ADD_MESSAGE',
            text: this.state.value,
            threadId: this.props.threadId
        })
        this.setState({value: ''})

    }


    render() {
        return (
            <div>
                <input
                    onChange={this.onChange}
                    value={this.state.value}
                    type='text'
                />
                <button
                    onClick={this.handleSubmit}
                    type='submit'
                >Submit
                </button>

            </div>

        )
    }
}

class ThreadTabs extends Component {
    componentDidMount() {
        console.log("Active tab")
        console.log(this.props.tabs.map(tab => tab.active))
    }


    render() {
        const tabs = this.props.tabs.map((tab, index) => (
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
