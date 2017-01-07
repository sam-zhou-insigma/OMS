var fs = require("fs");
var http = require('http');
var async = require("async");


var options = {  
    hostname: 'localhost',  
    port: 3000,  
    path: '/api/v1/evolutility/insigma_view_tableinfo',  
    method: 'GET'  
};  
/**
 * Array.prototype.[method name] allows you to define/overwrite an objects method
 * needle is the item you are searching for
 * this is a special variable that refers to "this" instance of an Array.
 * returns true if needle is in the array, and false otherwise
 */
Array.prototype.contains = function ( needle ) {
  for (i in this) {
    if (this[i] == needle) return true;
  }
  return false;
}
Array.prototype.where =
   function(f)
   {
      var fn = f ;
      // if type of parameter is string         
      if ( typeof f == "string" )
         // try to make it into a function
         if ( ( fn = lambda( fn ) ) == null )
            // if fail, throw exception
            throw "Syntax error in lambda string: " + f ;
      // initialize result array
      var res = [] ;
      var l = this.length;
      // set up parameters for filter function call
      var p = [ 0, 0, res ] ;
      // append any pass-through parameters to parameter array               
      for (var i = 1; i < arguments.length; i++) p.push( arguments[i] );
      // for each array element, pass to filter function
      for (var i = 0; i < l ; i++)
      {
         // skip missing elements
         if ( typeof this[ i ] == "undefined" ) continue ;
         // param1 = array element             
         p[ 0 ] = this[ i ] ;
         // param2 = current indeex
         p[ 1 ] = i ;
         // call filter function. if return true, copy element to results            
         if ( !! fn.apply(this, p)  ) res.push(this[i]);
      }
      // return filtered result
      return res ;
   }

function getTitleField(result,tablename){
            return result.where(( el, i, res, param )=>el.columnno==2&&el.tablename==param,tablename)[0].fieldname;
        }


var reqCB_server=function (res) {  
    console.log('STATUS: ' + res.statusCode);  
    console.log('HEADERS: ' + JSON.stringify(res.headers));  
    res.setEncoding('utf8');  
    res.on('data', function (chunk) {  
        console.log(chunk);
        var result=JSON.parse(chunk);
        var tables=Array();
        result.forEach(function(item){
            if(!tables.contains(item.tablename))
            {
                tables.push(item.tablename);
                if(fs.exists(item.tablename+'.txt'))
                    fs.unlinkSync(item.tablename+'.txt');
                //writeline(item.tablename+'.txt',"Hello World!");
                fs.writeFileSync(item.tablename+'.txt', "module.exports = {\r    id: '"+item.tablename+
                "',\r    table: '"+item.tablename+
                "',\r    titleField: '"+getTitleField(result,item.tablename)+"',\r    searchFields: ['"+getTitleField(result,item.tablename)+"'],\r  fields:[");
                console.log(item.tablename);
            }
        });

        
        /*
        遍历字段
        格式如下
        {
            id: 'title', column: 'title', type: 'text', label: 'Title', required: true, 
            maxLength: 255,
            inMany: true
        },
        */
        async.each(result,function(fieldInfo,next){
            console.log(fieldInfo.tablename+'-'+fieldInfo.fieldname);
            var filename=fieldInfo.tablename+'.txt';
            if(fieldInfo.fieldname!='id')
            {
                var fieldDesc="\r     {id:'"+fieldInfo.fieldname+"',column:'"+fieldInfo.fieldname+"',type:'"+getFieldType(fieldInfo)+
                "',\r      label:'"+fieldInfo.fieldname+"',required:"+fieldInfo.notnullflag+",maxLength:"+fieldInfo.fieldlength+",\r     inMany: "+(fieldInfo.columnno<6).toString()+"},";
                fs.writeFileSync(filename, fieldDesc,{
                    flag: 'a'
                });
            }
            
            next(null);     
        },function(err) { 
            console.log('Error:' + err); 
        });

        //文件结尾
        tables.forEach(function(table){
            fs.writeFileSync(table+'.txt', "\r]};",{
                    flag: 'a'
                });
        });

        /**
         * 目前evol支持的数据类型包括：
         * boolean (yes/no),date,datetime,decimal
         * document,email,image,integer,lov (list of values),money,text,textmultiline,time,url 
         * */
        function getFieldType(dbfield)
        {
            switch(dbfield.typename){
                case "int4": return "integer";
                case "bool":return "boolean";
                case "timestamp":return "datetime";
                default:return "text";
            }
        }
        function writeline(filename,lineinfo)
        {
            fs.writeFileSync(filename,lineinfo+'\r\n');
        }
    });
}

var reqCB_client=function (res) {  
    console.log('STATUS: ' + res.statusCode);  
    //console.log('HEADERS: ' + JSON.stringify(res.headers));  
    res.setEncoding('utf8');  
    res.on('data', function (chunk) {  
        //console.log(chunk);
        var result=JSON.parse(chunk);
        var tables=Array();
        result.forEach(function(item){
            if(!tables.contains(item.tablename))
            {
                tables.push(item.tablename);
                if(fs.exists(item.tablename+'_client.txt'))
                    fs.unlinkSync(item.tablename+'_client.txt');
                //writeline(item.tablename+'.txt',"Hello World!");
                fs.writeFileSync(item.tablename+'_client.txt', "module.exports = {\r    id: '"+item.tablename+
                "',\r    label: '"+item.tablename+"',\r    name: '"+item.tablename+
                "',\r    namePlural: '"+item.tablename+"',\r    icon: 'comics.png',\r    titleField: '"+getTitleField(result,item.tablename)+"',\r    searchFields: ['"+getTitleField(result,item.tablename)+"'],\r  fields:[");
                console.log(item.tablename);
            }
        });
        /*
        遍历字段
        格式如下
         {
            id: 'title',
            label: 'Title',
            type: 'text',
            width: 100,
            required: true,
            inMany: true
            },
        */
        async.each(result,function(fieldInfo,next){
            console.log(fieldInfo.tablename+'-'+fieldInfo.fieldname);
            var filename=fieldInfo.tablename+'_client.txt';
            if(fieldInfo.fieldname!='id')
            {
                var fieldDesc="\r{id:'"+fieldInfo.fieldname+"',type:'"+getFieldType(fieldInfo)+
                "',label:'"+fieldInfo.fieldname+"',\rrequired:"+fieldInfo.notnullflag+",width:"+fieldInfo.fieldlength+",\rinMany: "+(fieldInfo.columnno<6)+"//,defaultValue: 4\r},"
                fs.writeFileSync(filename, fieldDesc,{
                    flag: 'a'
                });
            }
            
            next(null);     
        },function(err) { 
            console.log('Error:' + err); 
        });

        //文件结尾
        tables.forEach(function(table){
            fs.writeFileSync(table+'_client.txt', "\r]};",{
                    flag: 'a'
                });
        });

        /**
         * 目前evol支持的数据类型包括：
         * boolean (yes/no),date,datetime,decimal
         * document,email,image,integer,lov (list of values),money,text,textmultiline,time,url 
         * */
        function getFieldType(dbfield)
        {
            switch(dbfield.typename){
                case "int4": return "integer";
                case "bool":return "boolean";
                case "timestamp":return "datetime";
                default:return "text";
            }
        }
        function writeline(filename,lineinfo)
        {
            fs.writeFileSync(filename,lineinfo+'\r');
        }
    });
}

var req_server = http.request(options, reqCB_server);
  
req_server.on('error', function (e) {  
    console.log('problem with request: ' + e.message);  
});  
  
req_server.end(); 

var req_client = http.request(options, reqCB_client);
  
req_client.on('error', function (e) {  
    console.log('problem with request: ' + e.message);  
});  
  
req_client.end(); 

/*var tableName='';
        async.each(result,function(fieldInfo,next){
            console.log(fieldInfo.tablename+'-'+fieldInfo.fieldname);
            var filename=fieldInfo.tablename+'.txt';
            if(tableName==fieldInfo.tablename)
            {
                
                fs.writeFileSync(filename, JSON.stringify(fieldInfo), {
                    flag: 'a'
                });
            }
            else{
                console.log("===================");
                fs.writeFileSync(filename, JSON.stringify(fieldInfo));
            }
            tableName=fieldInfo.tablename;
            next(null);     
        },function(err) { 
            console.log('Error' + err); 
        }); */