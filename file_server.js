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
			if(!request.query.wakeup && (err || !cloc || !cloc.org || !BLACKLISTED_ORGS.reduce((t,c)=>{return t||cloc.org.includes(c)},false))){
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


app.get('/news', function (request, response) {
		const ip = requestIp.getClientIp(request);
		var log = {
			'Timestamp': moment().tz('America/New_York'),
			'IP': ip,
			'Verb': "GET",
      'Route': "/news",
			'Page': "News"
    }
    console.log(log);
		Admin.log(log, function(){});

		response.status(200);
		response.setHeader('Content-Type', 'text/html')
		response.render('newsblog');
});


app.get('/news/:id', function (request, response) {
		const ip = requestIp.getClientIp(request);
		var log = {
			'Timestamp': moment().tz('America/New_York'),
			'IP': ip,
			'Verb': "GET",
      'Route': "/news/:id",
			'Page': "News Post: " + req.params.id
    }
    console.log(log);
		Admin.log(log, function(){});

		response.status(200);
		response.setHeader('Content-Type', 'text/html')
		response.render('news', {id: req.params.id});
});


app.get('/about', function (request, response) {
		const ip = requestIp.getClientIp(request);
		var log = {
			'Timestamp': moment().tz('America/New_York'),
			'IP': ip,
			'Verb': "GET",
      'Route': "/about",
			'Page': "About"
    }
    console.log(log);
		Admin.log(log, function(){});

		response.status(200);
		response.setHeader('Content-Type', 'text/html')
		response.render('about');
});


app.get('/member/:name', function (request, response) {
		const ip = requestIp.getClientIp(request);
		var log = {
			'Timestamp': moment().tz('America/New_York'),
			'IP': ip,
			'Verb': "GET",
      'Route': "/member/:name",
			'Page': "Member: " + req.params.name
    }
    console.log(log);
		Admin.log(log, function(){});

		response.status(200);
		response.setHeader('Content-Type', 'text/html')
		response.render('member', {name: req.params.name});
});


app.get('/activities', function (request, response) {
		const ip = requestIp.getClientIp(request);
		var log = {
			'Timestamp': moment().tz('America/New_York'),
			'IP': ip,
			'Verb': "GET",
      'Route': "/activities",
			'Page': "Activities"
    }
    console.log(log);
		Admin.log(log, function(){});

		response.status(200);
		response.setHeader('Content-Type', 'text/html')
		response.render('activities');
});


app.get('/clients', function (request, response) {
		const ip = requestIp.getClientIp(request);
		var log = {
			'Timestamp': moment().tz('America/New_York'),
			'IP': ip,
			'Verb': "GET",
      'Route': "/clients",
			'Page': "Clients"
    }
    console.log(log);
		Admin.log(log, function(){});

		response.status(200);
		response.setHeader('Content-Type', 'text/html')
		response.render('clients');
});


app.get('/sponsors', function (request, response) {
		const ip = requestIp.getClientIp(request);
		var log = {
			'Timestamp': moment().tz('America/New_York'),
			'IP': ip,
			'Verb': "GET",
      'Route': "/sponsors",
			'Page': "Sponsors"
    }
    console.log(log);
		Admin.log(log, function(){});

		response.status(200);
		response.setHeader('Content-Type', 'text/html')
		response.render('sponsors');
});


app.get('/contact', function (request, response) {
		const ip = requestIp.getClientIp(request);
		var log = {
			'Timestamp': moment().tz('America/New_York'),
			'IP': ip,
			'Verb': "GET",
      'Route': "/contact",
			'Page': "Contact"
    }
    console.log(log);
		Admin.log(log, function(){});

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('contact');
});

/* //TODO
setInterval(function() {
			https.get("https://www.whartonmanagementclub.com/?wakeup=true");
}, 1800000); // keeps Heroku website awake
*/
