var GoogleSpreadsheet = require('google-spreadsheet')
var creds = require('./client_secret_sheets.json')
var doc = new GoogleSpreadsheet('1TAKKnCgtzLoA3hC_R10JRE0s3ysVIZpeugErsm8unR8');
const ipInfo = require("ipinfo");
var moment = require('moment-timezone');
moment().format();

const membersFP = __dirname +'/members.csv'
const photosFP = __dirname +'/photos.csv'
const clientsFP = __dirname +'/clients.csv'

const csv=require('csvtojson')

exports.log = function (logo, callback) {
	doc.useServiceAccountAuth(creds, function (err) {
    var timestamp=logo["Timestamp"]
    logo["Date"]=""+timestamp.format("MM/DD/YYYY");
    logo["Hour"]=""+timestamp.hour();
		logo["Timestamp"]=""+timestamp.format()
		ipInfo(logo["IP"], (err, cLoc) => {
        if(!err){
					if(cLoc){
						if(cLoc.country && cLoc.region && cLoc.city && cLoc.postal){
							logo["Location"] = cLoc.country + "," + cLoc.region + "," + cLoc.city+","+cLoc.postal;
						} else{ logo["Location"]="";}
						if(cLoc.loc){
			      	logo["LatLong"] = cLoc.loc.split(",")[0]+"/"+cLoc.loc.split(",")[1];
						}
						else{ logo["LatitudeLongitude"]="";}
						if(cLoc.org){
							logo["Organization"]=cLoc.org
						} else{logo["Organization"]="";}
					}
				}
				doc.addRow(1, logo, callback)
			});
	});
}

exports.getMembers = function (callback) {
	csv()
	.fromFile(membersFP)
	.then((jsonObj)=>{
	    callback(jsonObj)
	})
}
exports.getClients = function (callback) {
	csv()
	.fromFile(clientsFP)
	.then((jsonObj)=>{
			callback(jsonObj)
	})
}

exports.getMember = function (name, callback) {
	csv()
	.fromFile(membersFP)
	.then((jsonObj)=>{
	    callback(jsonObj.find(member => member.name.toLowerCase().replace(/ /g, "") === name))
	})
}

exports.getBoardMembers = function (callback) {
	csv()
	.fromFile(membersFP)
	.then((jsonObj)=>{
			callback(jsonObj.filter(member => 'yes' === member['board']))
	})
}

exports.getPhotos = function (callback) {
	csv()
	.fromFile(photosFP)
	.then((jsonObj)=>{
	    callback(jsonObj)
	})
}
