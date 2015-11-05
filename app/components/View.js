"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppStore from '../stores/AppStore';

class View extends React.Component {

    constructor() {
        super();
        this.state = { messages: [] } ;
        this._onChange = this._onChange.bind(this);
        this._Message = this._Message.bind(this);
        let self = this;
        self.primus = AppStore._getSocket();
    }

    _Message() {
        let prom = AppStore._getMessages();
        let self = this;
        prom.then(
            function(value) {
               self.setState({
                    messages: value
               })
            },
            function(err) {

            }
        )
    }

    componentDidMount() {
        console.log(self.primus);
        this._Message();
        AppStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        AppStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        var self = this;
        setTimeout(function(){
            self.setState({
                messages: self._Message()
            });
        }, 30)
    }

    render() {
        let msg = this.state.messages;
        return (
            <div className="container">
                <h1 className="header-title">Spike</h1>
                <App messages={msg} />
            </div>
        );
    }

}

module.exports = View;
