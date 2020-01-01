var express = require('express');
var favicon = require('serve-favicon');
const ipInfo = require("ipinfo");
const requestIp = require('request-ip');
var moment = require('moment');
moment().format();
var https = require("https");
var request = require('request');
var methodOverride = require('method-override');

BLACKLISTED_ORGS = ["Amazon", "Google", "Microsoft", "Facebook"];

var app = express();

var Admin = require(__dirname + '/models/Admin')
var Members = require(__dirname + '/models/Members')

app.use(express.static('public'));
app.use(methodOverride('_method'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/images/favicon.png'));
/*
app.use('/member', express.static('public'));
app.use('/member', favicon(__dirname + '/public/images/favicon.png'));
*/

app.use(express.urlencoded());


var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log('Server started at ' + new Date() + ', on port ' + port + '!');
});


app.get('/', function (request, response) {
		const ip = requestIp.getClientIp(request);
		ipInfo(ip, (err, cloc) => {
			if(!request.query.wakeup && (err || !cloc || !BLACKLISTED_ORGS.reduce((t,c)=>{t||c.includes(cloc.org)},false))){
		    var log = {
		      'Timestamp': moment().tz('America/New_York'),
					'IP': ip,
		      'Verb': "GET",
		      'Route': "/",
					'Page': "Home",
		    }
		    console.log(log);
				Admin.log(log, function(){});
			}
			else{
				var log = {
		      'Timestamp': moment().tz('America/New_York'),
					'IP': ip,
		      'Verb': "GET",
		      'Route': "/",
					'Page': "Home (Self-Request)",
		    }
		    console.log(log);
			}

			response.render('index')
		})
});


setInterval(function() {
			https.get("https://www.whartonmanagementclub.com/?wakeup=true");
}, 300000); // keeps Heroku website awake
