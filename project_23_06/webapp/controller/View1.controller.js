sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Fragment) {
        "use strict";

        return Controller.extend("project2306.controller.View1", {
            onInit: function () {

            },

        HelloButtonPress: function()
        {
            sap.m.MessageToast.show("123")
        },
        onOpenDialog: function(){
            this.byId("idDialog").open()
        },

        
        onClose: function(){
            this.byId("idDialog").close()
            sap.ui.getCore().byId("idDialog").close();
        },
        onOpenDialog_con: function(){
            var dialog = sap.ui.getCore().byId("idDialog");
            if(!dialog){
                Fragment.load({
                    name : "project2306.view.fragment.Dialog",
                    type : "XML",
                    controller : this
    
                }).then(function(oDialog){
                    oDialog.open();
                });
            }else{
                dialog.open();
            }

        }
        });
    });
