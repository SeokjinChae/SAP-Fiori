sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

],
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("ssarumsd090.controller.Detail2", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteDetail2").attachPatternMatched(this._onPatternMatched, this);
            },

            _onPatternMatched: function(oEvent) {
                var oArgs = oEvent.getParameter("arguments");
                var sOrderno = oArgs.Orderno;

                console.log("Detail Pattern Matched with Orderno:", sOrderno);
                
                // 바인딩 경로 확인
                var sBindingPath = "/ZBBC_SD_liveSet('" + sOrderno + "')";
                console.log("Binding Path:", sBindingPath);

                this.byId("idForm").bindElement(sBindingPath);

                var aFilter = [];

                if(sOrderno){
                   aFilter.push(
                    new Filter({
                        path : 'Orderno',
                        operator : FilterOperator.EQ,
                        value1 : sOrderno
                    })
                   );
                }

                console.log(aFilter)

             this.byId('item_sd060').getBinding('items').filter(aFilter);              
            //     var oModel = this.getOwnerComponent().getModel();
            // var that = this;

            // oModel.read(sBindingPath, {
            //     filters: aFilter,
            //     success: function(oData) {
            //         var oDetailModel = new sap.ui.model.json.JSONModel(oData);
            //         that.getView().setModel(oDetailModel, "detail");

            //         // Form 바인딩
            //         var oForm = that.byId("idForm");
            //         oForm.bindElement("detail>/results/0");

            //         // Table 바인딩
            //         var oTable = that.byId("item_sd050");
            //         oTable.setModel(oDetailModel);
            //         oTable.bindItems({
            //             path: "detail>/results",
            //             template: oTable.getBindingInfo("items").template
            //         });
            //     },
            //     error: function(oError) {
            //         console.error("Failed to fetch data", oError);
            //     }
            // });
            },

            onNavBack: function() {
                this.oRouter.navTo("RouteMain", {
                    "query": {
                        tab: "okok",
                        test: 10
                    }
                });
            }
        });
    });