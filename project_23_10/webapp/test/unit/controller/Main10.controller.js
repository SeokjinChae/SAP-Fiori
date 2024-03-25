/*global QUnit*/

sap.ui.define([
	"project_23_10/controller/Main10.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Main10 Controller");

	QUnit.test("I should test the Main10 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
