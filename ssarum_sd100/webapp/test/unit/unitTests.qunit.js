/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ssarum_sd100/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
