/*! *******************************************************
 *
 * OMS-server-node :: utils/logger.js
 * Simple formatted console logger.
 *
 * https://github.com/evoluteur/OMS-server-node
 * (c) 2016 Olivier Giulieri
 ********************************************************* */

var config = require('../../config.js');
var pkg = require('../../package.json');

var consoleLog = config.consoleLog;

module.exports = {

	ascii_art: function(){
		if(consoleLog){
			console.log(
				'         ___  ___ _ ____   _____ _ __    __/ |\n'+
				'  ____  / __|/ _ \\ \'__\\ \\ / / _ \\ \'__|  |___/\n' + 
				' |____| \\__ \\  __/ |   \\ V /  __/ |\n'+
				'        |___/\\___|_|    \\_/ \\___|_|      '+pkg.version+'\n\n'+
				new Date() + '\n'
			);
		}
	},

	 logReq: function(title, req){
		if(consoleLog){
			console.log('\n\n--- '+title+' : '+req.params.entity+' ---');
			console.log('params = '+JSON.stringify(req.params, null, 2));
			console.log('query = '+JSON.stringify(req.query, null, 2));
			console.log('body = '+JSON.stringify(req.body, null, 2));
		}
	},

	 logObject: function(title, obj){
		if(consoleLog){
			console.log(title+' = '+JSON.stringify(obj, null, 2));
		}
	},

	logSQL: function (sql){
		if(consoleLog){
			console.log('sql = '+sql+'\n');
		}
	},

	logError: function(err){
		console.error(err);
	},

	errorMsg: function(err, method){
		if(consoleLog){
			return {
				error: err,
				method: method
			}
		}else{
			return {
				error: 'Error'
			}
		}
	},

};
