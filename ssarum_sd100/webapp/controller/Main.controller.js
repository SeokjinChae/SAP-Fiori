sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/DateFormat"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.odata.v2.ODataModel} ODataModel
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {sap.ui.core.format.DateFormat} DateFormat
     */
    function (Controller, ODataModel, JSONModel, DateFormat) {
        "use strict";

        return Controller.extend("ssarumsd100.controller.Main", {
            onInit: function () {
                this._oModel = new ODataModel("/sap/opu/odata/SAP/ZGWSAPSSARUM_ZBB_SRV/");
                this.getView().setModel(this._oModel);

                this._oVizFrame = this.getView().byId("idVizFrame");
                this._oVizModel = new JSONModel();
                this.getView().setModel(this._oVizModel, "viz");

                this._dateFormat = DateFormat.getDateTimeInstance({ pattern: "yyyy-MM-dd" });

                this._setVizProperties();

                this.onSearch(); // 데이터 로드를 위해 onInit에서 호출
            },

            _setVizProperties: function() {
                var oVizFrame = this.getView().byId("idVizFrame");
                oVizFrame.setVizProperties({
                    categoryAxis: {
                        label: {
                            formatString: "yyyy-MM-dd"
                        }
                    },
                    title: {
                        visible: false
                    }
                });
            },

            onSearch: function () {
                this._oModel.read("/ZBBT_SD060Set", {
                    success: function (oData) {
                        var oResults = this._processData(oData.results);
                        this._oVizModel.setData({ SubscriptionData: oResults });
                    }.bind(this),
                    error: function (oError) {
                        console.error("Error fetching data: ", oError);
                    }
                });
            },

            _processData: function (aData) {
                var oProcessedData = {};
                var oAccumulatedData = {};

                // 데이터 정렬
                aData.sort(function(a, b) {
                    return new Date(a.Substart) - new Date(b.Substart);
                });

                // 누적 합계 계산
                aData.forEach(function (oItem) {
                    var sDate = this._dateFormat.format(new Date(oItem.Substart));
                    if (!oProcessedData[sDate]) {
                        oProcessedData[sDate] = {};
                    }
                    if (!oProcessedData[sDate][oItem.Subno]) {
                        oProcessedData[sDate][oItem.Subno] = 0;
                    }
                    if (!oAccumulatedData[oItem.Subno]) {
                        oAccumulatedData[oItem.Subno] = 0;
                    }
                    oAccumulatedData[oItem.Subno] += parseFloat(oItem.Subquantity);
                    oProcessedData[sDate][oItem.Subno] = oAccumulatedData[oItem.Subno];
                }.bind(this));

                var aChartData = [];
                Object.keys(oProcessedData).forEach(function (sDate) {
                    Object.keys(oProcessedData[sDate]).forEach(function (sSubno) {
                        aChartData.push({
                            Date: sDate,
                            Subno: sSubno,
                            Subquantity: oProcessedData[sDate][sSubno]
                        });
                    });
                });

                return aChartData;
            },

            onFilterChange: function () {
                this.onSearch();
            },

            onAfterVariantLoad: function () {
                this.onSearch();
            }
        });
    });
