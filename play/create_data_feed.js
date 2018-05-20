/*jslint node: true */
"use strict";
var headlessWallet = require('../start.js');
var eventBus = require('intervlauecore-1.0-testnet/event_bus.js');

function onError(err){
	throw Error(err);
}

function createDataFeed(){
	var composer = require('intervlauecore-1.0-testnet/composer.js');
	var network = require('intervlauecore-1.0-testnet/network.js');
	var callbacks = composer.getSavingCallbacks({
		ifNotEnoughFunds: onError,
		ifError: onError,
		ifOk: function(objJoint){
			network.broadcastJoint(objJoint);
		}
	});
	
	var datafeed = {
		time: new Date().toString(), 
		timestamp: Date.now()
	};
	composer.composeDataFeedJoint("PYQJWUWRMUUUSUHKNJWFHSR5OADZMUYR", datafeed, headlessWallet.signer, callbacks);
}

eventBus.on('headless_wallet_ready', createDataFeed);
