/*jslint node: true */
"use strict";
var headlessWallet = require('../start.js');
var eventBus = require('intervlauecore-1.0-testnet/event_bus.js');

function onError(err){
	throw Error(err);
}

function createPayment(){
	var composer = require('intervlauecore-1.0-testnet/composer.js');
	var network = require('intervlauecore-1.0-testnet/network.js');
	var callbacks = composer.getSavingCallbacks({
		ifNotEnoughFunds: onError,
		ifError: onError,
		ifOk: function(objJoint){
			network.broadcastJoint(objJoint);
		}
	});
	
	var from_address = "PYQJWUWRMUUUSUHKNJWFHSR5OADZMUYR";
	var payee_address = "LS3PUAGJ2CEYBKWPODVV72D3IWWBXNXO";
	var arrOutputs = [
		{address: from_address, amount: 0},      // the change
		{address: payee_address, amount: 10000}  // the receiver
	];
	composer.composePaymentJoint([from_address], arrOutputs, headlessWallet.signer, callbacks);
}

eventBus.on('headless_wallet_ready', createPayment);
