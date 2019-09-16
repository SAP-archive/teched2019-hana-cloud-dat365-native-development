/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"teched/dat365/ui/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});