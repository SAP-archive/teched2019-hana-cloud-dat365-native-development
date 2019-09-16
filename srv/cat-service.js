/*eslint no-console: 0, no-unused-vars: 0, no-undef:0, no-process-exit:0*/
/*eslint-env node, es6 */
"use strict";
/**
 * Implementation for CatalogService defined in ./cat-service.cds
 */

module.exports = (srv) => {
	
	function getSafe (fn, defaultVal) {
		try {
			return fn();
		} catch (e) {
			return defaultVal;
		}
	}
	
	srv.on("READ", "User", async(req) => {
		try {
			console.log(`Data: ${JSON.stringify(req.query)}`);
			console.log(`Auth Info: ${JSON.stringify(req.user)}`);
			let data = [];
			data.push({
				"id": getSafe(() => req.user.id),
				"givenName": getSafe(() => req.user.name.givenName),
				"familyName": getSafe(() => req.user.name.familyName),	
				"email": getSafe(() => req.user.emails[0].value),
				"locale": getSafe(() => req.user.locale),
			});
			req.reply(data);
		} catch (err) {
			console.error(err.toString());
		}
	});


};
