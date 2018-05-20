/*jslint node: true */
"use strict";
var headlessWallet = require('../start.js');
var eventBus = require('intervlauecore-1.0-testnet/event_bus.js');

function onError(err){
	throw Error(err);
}

function createProfile(){
	var composer = require('intervlauecore-1.0-testnet/composer.js');
	var network = require('intervlauecore-1.0-testnet/network.js');
	var callbacks = composer.getSavingCallbacks({
		ifNotEnoughFunds: onError,
		ifError: onError,
		ifOk: function(objJoint){
			network.broadcastJoint(objJoint);
		}
	});
	
	var profile = {
		age: 24,
		name: "George",
		emails: ["george@example.com", "george@anotherexample.com"]
	};
	composer.composeProfileJoint("PYQJWUWRMUUUSUHKNJWFHSR5OADZMUYR", profile, headlessWallet.signer, callbacks);
}

eventBus.on('headless_wallet_ready', createProfile);
