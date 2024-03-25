sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     
@param {typeof sap.ui.core.mvc.Controller} Controller*/
  function (Controller) {"use strict";

        return Controller.extend("project2303.controller.Main", {
            onInit: function () {

            },

            onClick: function() {
                var oInput = this.getView().byId("idInput");
                var sValue = oInput.getValue();
                this.byId("idText").setText(sValue);

            }
        });
    });
