sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/Filter', 
    'sap/ui/model/FilterOperator',
    'sap/ui/model/json/JSONModel'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Filter,FilterOperator,JSONModel) {
        "use strict";

        return Controller.extend("exam.exprogram23.controller.Main", {
            onInit: function () {
                

                // var oData88 = [{   
                //     CategoryID: "1",
                //     ProductName: "2",
                //     UnitsInStock: "3",
                //     UnitsOnOrder: "4"
                // }];

                // var oData88 = {
                //     list : [
                //         { CategoryID: "1",ProductName: "2",UnitsInStock: "3",UnitsOnOrder: "4" }
                //     ]
                // };

                var oData88 = {
                    CategoryID: "1",
                    ProductName: "2",
                    UnitsInStock: "3",
                    UnitsOnOrder: "4"
                }


                var oData99 = {   
                    Value: 'test' //sales
                };

                var oModel88 = new JSONModel(oData88);
                var oModel99 = new JSONModel(oData99);

                this.getView().setModel(oModel88, "product");
                this.getView().setModel(oModel99, "sales");
            },

            onSearch: function () {
                var sID = this.byId("idID").getValue();
                var sCN = this.byId("idCN").getValue();
            
                var aFilters = [];
            
                if (sID) {
                    var oFilterID = new Filter({
                        path: 'CategoryID',
                        operator: FilterOperator.GE,
                        value1: sID
                    });
            
                    aFilters.push(oFilterID);
                }
            
                if (sCN) {
                    var oFilterCN = new Filter({
                        path: 'CategoryName',
                        operator: FilterOperator.Contains,
                        value1: sCN
                    });
            
                    aFilters.push(oFilterCN);
                }
            
                var oCombinedFilter = new Filter({
                    filters: aFilters,
                    and: true
                });
            
                this.byId("categoryTable").getBinding("items").filter(oCombinedFilter);
            },

            onSelectionChange : function(oEvent){
                var sPath = oEvent.getParameters().listItem.getBindingContextPath();
                var oSelectData = this.getView().getModel().getProperty(sPath);

            }
        });
    });
