/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"teched/dat365/worklistUI/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
