/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"teched/dat365/ui/advUI/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});