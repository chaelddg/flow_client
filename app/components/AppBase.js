"use strict";

import React from 'react';

class AppBase extends React.Component {

    _bind(...methods) {
        methods.forEach( (method) => this[method]  = this[method].bind(this) );
    }

}

module.exports = AppBase;
