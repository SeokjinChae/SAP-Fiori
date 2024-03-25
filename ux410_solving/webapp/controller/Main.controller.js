sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/controls/VizFrame",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/data/DimensionDefinition",
    "sap/viz/ui5/data/MeasureDefinition",
    "sap/viz/ui5/controls/common/feeds/FeedItem"


],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("sap.btp.ux410solving.controller.Main", {
            onInit: function () {

                this.oRouter = this.getOwnerComponent().getRouter()
                this.oRouter.getRoute('RouteMain').attachPatternMatched(this._onPatternMatched,this)

                var oData ={
                    list : [
                        {key: 'bar'},
                        {key: 'column'},
                        {key: 'line'},
                        {key: 'donut'}
                    ]
                }
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel, "typeList")
            },

            onSearch : function(){

                //                   4번                     //
                var sSearchValue = this.byId("idfilterbar").getFilterGroupItems()[0].getControl().getValue();

                var oVizFrame = this.byId("idChart");

                var oBindingInfo = oVizFrame.getDataset().getBindingInfo("data");

                var oFilter = new sap.ui.model.Filter("OrderID", sap.ui.model.FilterOperator.EQ, sSearchValue);

                oBindingInfo.filters = [oFilter];

                oVizFrame.getDataset().bindData(oBindingInfo);

                //                    7번                     //
                var oVizFrame2 = this.byId("idChart");

                var sSelectedChartType = this.byId("idcomBox2").getSelectedKey();
            
                oVizFrame2.setVizType(sSelectedChartType);


            },
            onGoDetail : function(){
                this.oRouter.navTo("RouteDetail",{
                    key1 : "okok",
                    key2 : 123
                },true)
                //navTo(라우트객체이름,{파라미터정보},히스토리초기화)
            },
            

        });
    });
