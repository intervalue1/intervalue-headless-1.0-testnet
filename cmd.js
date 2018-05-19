var exec = require('child_process').exec; 
var data = {"jsonrpc":"2.0", "id":1, "method":"sendtoaddress", "params":["V75LBJES2LGYGLTK2VTEJICLHDSJ4RNA", 1] };
var cmdStr = "curl --data '"+ JSON.stringify(data) +"' http://127.0.0.1:6332";
console.log(cmdStr);
for(var i=1;i<501;i++){
	console.log("start----------"+i);
	exec(cmdStr, function(err,stdout,stderr){
    if(err) {
        console.log('sendtoaddress api error:'+stderr);
    } else {
        var data = JSON.parse(stdout);
        console.log(data);
    }
});
}

