'use strict';

import reqwest from 'reqwest';
import when from 'when';

class MessageService {

	postMessage(name, message) {
		console.log('**** [MessageService] postMessage ');

		let host = window.location.host;
		let path = host.split(":");
		let port = ":3001";

		let url = path[0] + port;
		reqwest({
			url: 'http://'+ url +'/messages'
		  , method: 'post'
		  , data: { name: name, message: message }
		  , success: function (resp) {
		      return resp;
		    }
		})
	}

	getMessage() {
		let host = window.location.host;
		let path = host.split(":");
		let port = ":3001";

		let url = path[0] + port;
		return when(reqwest({
			url: 'http://'+ url +'/messages',
			method: 'GET',
			crossOrigin: true,
			type: 'json'
		}));
	}

}

export default new MessageService()