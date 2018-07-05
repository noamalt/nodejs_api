//check servers alive
//var ping = require('ping');
var Monitor = require('ping-monitor');



 var myWebsite = new Monitor({
    website: 'www.zurichprime.com',
    interval: 0.5
});

myWebsite.on('error', function (msg) {
    console.log(msg);
});
 
 
myWebsite.on('up', function (res) {
    console.log('Yay!! ' + res.website + ' is up.');
}); 

