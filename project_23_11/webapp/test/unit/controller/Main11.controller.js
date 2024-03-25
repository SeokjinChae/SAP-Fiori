/*global QUnit*/

sap.ui.define([
	"project_23_11/controller/Main11.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Main11 Controller");

	QUnit.test("I should test the Main11 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
