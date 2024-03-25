sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("project2311.controller.Main11", {
            onInit: function () {
                var oData = {
                    chartDataset :[
                        {year : "2020",price : "1000"},
                        {year : "2021",price : "2000"},
                        {year : "2022",price : "3000"},
                        {year : "2023",price : "4000"}
                    ]
                }

                this.getView().setModel(new JSONModel(oData),"chart")

            }
        });
    });
