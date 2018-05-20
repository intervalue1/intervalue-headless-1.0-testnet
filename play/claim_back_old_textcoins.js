/*jslint node: true */
"use strict";
var headlessWallet = require('../start.js');
var eventBus = require('intervaluecore-1.0-testnet/event_bus.js');


function claimBack(){
	headlessWallet.readFirstAddress(address => {
		var Wallet = require('intervaluecore-1.0-testnet/wallet.js');
		Wallet.claimBackOldTextcoins(address, 7);
	});
}

eventBus.on('headless_wallet_ready', claimBack);
