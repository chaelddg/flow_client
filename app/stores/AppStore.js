"use strict";

import AppConstants from '../constants/AppConstants';
import BaseStore from './BaseStore';
import MessageService from '../services/MessageService';

class AppStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
    }

    _getSocket() {
        let self = this;
        let host = window.location.host;
        let path = host.split(":");
        let port = ":3001";

        let url = path[0] + port;
        self.primus = new Primus('ws://'+url+'/');
        return self.primus;
    }

    _postMessage(chat_name, chat_msg) {
        console.log('*** [app store] _postMessage');
        MessageService.postMessage(chat_name, chat_msg);
    }

    _getMessages() {

       return MessageService.getMessage();

    }

    _registerToActions(action) {
        switch (action.actionType) {
            case AppConstants.ADD_MESSAGE:
                this._postMessage(action.name, action.message);
                this._getMessages()
                this.emitChange();
                break;
            default:
        }
    }
}

module.exports = new AppStore();
