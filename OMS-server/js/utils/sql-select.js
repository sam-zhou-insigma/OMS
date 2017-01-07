/*! *******************************************************
 *
 * OMS-server-node :: utils/sql-select.js
 *
 * https://github.com/evoluteur/OMS-server-node
 * (c) 2016 Olivier Giulieri
 ********************************************************* */

// - SQL for a single field/column in update/create/order
var columnName = {
	'update': function(f, idx){
		return '"'+f.column+'"=$'+idx;
	},
	'insert': function(f){
		return f.column;
	},
	'order': function(f){
		// - generate sql ORDER BY clause (for 1 field)
		if(f){
			if(f.type==='lov' && f.lovtable){
				return '"'+f.id+'_txt"';
			}else{
				var col = 't1."'+f.column+'"';
				if(f.type==='boolean'){
					return 'CASE WHEN '+col+'=TRUE THEN TRUE ELSE FALSE END'
				}else if(f.type==='text'){
					// TODO: better way?
					return 'LOWER('+col+')'
				}
				return col;
			}
			return 'id';
		}
	}
}

module.exports = {

	columnName: columnName,
	
	// - returns the SELECT clause for SQL queries
	select: function(fields, collecs, table, action){
		var sql,
			sqlfs = [],
			tQuote = table ? 't1."' : '"';

		if(fields){
			fields.forEach(function(f, idx){
				if(f.type==='lov' && action!=='C' && action!=='U'){
					sqlfs.push(f.t2+'.'+(f.lovcolumn ? f.lovcolumn : 'name')+' AS "'+f.id+'_txt"')
				}
				sql = tQuote+f.column
				//if(f.type==='money'){
					//sql += '"::money'
				//}else if(f.type==='integer'){
					//sql += '"::integer'
				//}else if(f.type==='decimal'){
					//sql += '"::float'
				//}else{
					sql += '"'
				//}
				if(f.column && f.id!=f.column){
					sql += ' AS "'+f.id+'"'
				}
				sqlfs.push(sql);
			});
		}
		/*
		if(collecs){
			sqlfs=sqlfs.concat(collecs.map(function(c){
				return tQuote+(c.column||c.id)+'"';
			}));
		}*/
		return sqlfs.join(',');
	},

	// - returns lists of names and values (for Insert or Update)
	namedValues: function(m, req, action){
		var fnName = columnName[action],
			ns = [],
			vs = [];

		m.fields.forEach(function(f){
			if(f.column!='id' && f.type!='formula' && !f.readOnly){
				var fv=req.body[f.id];
				if(fv!=null){
					switch(f.type){
						case 'panel-list':
							vs.push(JSON.stringify(fv));
							ns.push(fnName(f, vs.length));
							break;
						case 'boolean':
							vs.push((fv&&fv!=='false')?'TRUE':'FALSE');
							ns.push(fnName(f, vs.length));
							break;
						case 'date':
						case 'time':
						case 'datetime':
						case 'lov':
							vs.push((!fv)?null:fv);
							ns.push(fnName(f, vs.length));
							break;
						default:
							vs.push(fv);
							ns.push(fnName(f, vs.length));
					}
				}
			}
		});
		if(m.collecs){
			m.collecs.forEach(function(f){
				var fv=req.body[f.id];
				if(fv!=null){
					vs.push(JSON.stringify(fv));
					ns.push(fnName(f, vs.length));
				}
			});
		}
		return {
			names: ns,
			values: vs
		};
	}

}
