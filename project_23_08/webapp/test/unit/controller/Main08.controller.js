/*global QUnit*/

sap.ui.define([
	"project_23_08/controller/Main08.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Main08 Controller");

	QUnit.test("I should test the Main08 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
