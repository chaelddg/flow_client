"use strict";

import AppDispatcher from '../dispatchers/AppDispatcher';
import AppConstants from '../constants/AppConstants';

export default {

    addMessage: (name,message) => {
        AppDispatcher.dispatch({
            actionType: AppConstants.ADD_MESSAGE,
            name: name,
            message: message
        });
    },

    getMessage: () => {
        AppDispatcher.dispatch({
            actionType: AppConstants.GET_MESSAGE
        });
    },


}
