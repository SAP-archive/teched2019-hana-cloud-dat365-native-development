/*eslint no-console: 0, no-unused-vars: 0, no-undef:0, no-process-exit:0*/
/*eslint-env node, es6 */

"use strict";
const https = require("https");
const port = process.env.PORT || 3100;
const server = require("http").createServer();

const cds = require("@sap/cds");
//Initialize Express App for XSA UAA and HDBEXT Middleware
const xsenv = require("@sap/xsenv");
const passport = require("passport");
const xssec = require("@sap/xssec");
const xsHDBConn = require("@sap/hdbext");
const express = require("express");
xsenv.loadEnv();

https.globalAgent.options.ca = xsenv.loadCertificates();
global.__base = __dirname + "/";
global.__uaa = process.env.UAA_SERVICE_NAME;

//logging
var logging = require("@sap/logging");
var appContext = logging.createAppContext();

//Initialize Express App for XS UAA and HDBEXT Middleware
var app = express();

//Build a JWT Strategy from the bound UAA resource
passport.use("JWT", new xssec.JWTStrategy(xsenv.getServices({
	uaa: {
		tag: "xsuaa"
	}
}).uaa));

//Add XS Logging to Express
app.use(logging.middleware({
	appContext: appContext,
	logNetwork: true
}));

//Add Passport JWT processing
app.use(passport.initialize());

var hanaOptions = xsenv.getServices({
	hana: {
		plan: "hdi-shared"
	}
});

hanaOptions.hana.pooling = true;
//Add Passport for Authentication via JWT + HANA DB connection as Middleware in Expess
app.use(
	xsHDBConn.middleware(hanaOptions.hana),
	passport.authenticate("JWT", {
		session: false
	}),	
);

//CDS OData V4 Handler
var options = {
	kind: "hana",
	logLevel: "error"
};

//Use Auto Lookup in CDS 2.10.3 and higher
/*Object.assign(options, hanaOptions.hana, {
	driver: options.driver
});*/

cds.connect(options);
var odataURL = "/catalog/";
// Main app
cds.serve(
	"gen/csn.json", {
		crashOnError: false
	})
	.to("fiori")
	.at(odataURL)
	.with(require("./cat-service"))
	.in(app)
	.catch((err) => {
		console.log(err);
		process.exit(1);
	});

console.log(`CDS Build Target: ${cds.env.build.target}`);
console.log(`CDS SQL Mapping: ${cds.env.sql_mapping}`);
//console.log(`CDS Requires: ${JSON.stringify(cds.env.requires)}`);

app.get("/node", (req, res) => {
	res.redirect(odataURL);
});

//Setup Additonal Node.js Routes
require("./router")(app, server);

//Start the Server 
server.on("request", app);
server.listen(port, function () {
	console.info(`HTTP Server: ${server.address().port}`);
});