
// oms-UI-React :: utils/url.js

// https://github.com/evoluteur/oms-ui-react
// (c) 2016 Olivier Giulieri

module.exports = {

	querySearch(query){
		// - make uri params string from query object
		// - example: {a:'aaa', b: 'bbb'} => "a=aaa&b=bbb"
		var url = ''
		for(var prop in query) {
			if(query.hasOwnProperty(prop)){
				url += prop+'='+encodeURI(query[prop]||'')+'&'
			}
		}
		return url.slice(0, -1);
	}

}
