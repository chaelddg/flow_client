"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
import AppBase from './AppBase';
import '../assets/styles.js';
import '../assets/scripts.js';

class App extends AppBase {

    constructor(props) {
        super();
        // console.log(this.props.messages);
        // this.state = { messages: this.props.messages }
        this._bind('_handleClick');
        let self = this;
        self.primus = AppStore._getSocket();
    }

    _handleClick(e) {
        e.preventDefault();

        console.log('clicked');

        let chat_name = ReactDOM.findDOMNode(this.refs.chat_name).value;
        let chat_msg = ReactDOM.findDOMNode(this.refs.chat_msg).value;

    
        if (chat_name !== null && chat_msg !== null || chat_name.trim() !== ""  && chat_msg.trim() !== "") {
            let self = this;
            
            AppActions.addMessage(chat_name, chat_msg);
            // self.primus.send('chat_send',  { "res": "sent" });

        } else {
            return;
        }
    }

    render() {
        return (
            <div className="wrapper">
                <input className="name_me" type="text" onChange={this._onChange} placeholder="Name here ... " ref="chat_name" />
                <input className="type_me" type="text" onChange={this._onChange} placeholder="Type here ... " ref="chat_msg" />
                <input className="click_me" onClick={this._handleClick} unselectable="on" type="submit" value="Submit" />
                <div className="display_result">
                    <ul>
                        {
                            (()=> {
                                if (this.props.messages) {
                                    return (this.props.messages.map((msg, i) => {
                                        return (<li key={i}><strong>{msg.name}</strong>&nbsp; - &nbsp;{msg.message}</li>);
                                    }));
                                }
                            })()
                        }
                    </ul>
                </div>
            </div>
        )
    }

}

module.exports = App;
