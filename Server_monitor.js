//check servers alive
var ping = require('ping');
 
var hosts = ['devsrv', '10.1.22.100','185,38,200,152'];
hosts.forEach(function(host){
    ping.sys.probe(host, function(isAlive){
        var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
        console.log(msg);
    });
});
