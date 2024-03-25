/*global QUnit*/

sap.ui.define([
	"odata/project_23_09/controller/Main09.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Main09 Controller");

	QUnit.test("I should test the Main09 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
