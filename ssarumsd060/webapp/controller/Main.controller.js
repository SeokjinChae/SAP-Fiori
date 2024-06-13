sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/format/DateFormat"
], function (Controller, ODataModel, JSONModel, Filter, FilterOperator, DateFormat) {
    "use strict";

    // 클래스 외부에 productNames 정의
    var productNames = {
        "FG0001": "홍삼정 에브리타임(스틱)",
        "FG0002": "홍삼캔디",
        "FG0003": "홍삼양갱",
        "FG0004": "뽀로로홍삼",
        "FG0005": "홍삼구미",
        "FG0006": "홍삼말랭이",
        "FG0007": "홍삼톤 리미티드",
        "FG0008": "홍삼 절편",
        "FG0009": "아이패스 파워스틱",
        "FG0010": "홍삼 초코 크런치",
        "FG0011": "홍삼정",
        "FG0012": "홍삼정환",
        "FG0013": "천녹정편"
    };

    return Controller.extend("ssarumsd060.controller.Main", {
        onInit: function () {
            // OData 모델 설정
            var oDataModel = this.getOwnerComponent().getModel();
            this.getView().setModel(oDataModel, "odata");

            // i18n 모델 설정
            var i18nModel = this.getOwnerComponent().getModel("i18n");
            this.getView().setModel(i18nModel, "i18n");

            // JSON 모델 초기화
            this.getView().setModel(new JSONModel(), "chartData");
            this.getView().setModel(new JSONModel(), "tableData");

            // 날짜 모델 초기화
            var oModel = new sap.ui.model.json.JSONModel();
            var oDate = new Date();
            var oFirstDay = new Date(oDate.getFullYear(), oDate.getMonth(), 1);
            oModel.setData({
                startDate: oFirstDay,
                endDate: oDate
            });
            this.getView().setModel(oModel);

            // 데이터 로드
            this._loadData();
        },

        _loadData: function (aFilters) {
            var oDataModel = this.getView().getModel("odata");
            var oBindingParams = {
                success: this._onDataLoadSuccess.bind(this),
                error: this._onDataLoadError.bind(this)
            };
            
            if (aFilters) {
                oBindingParams.filters = aFilters;
            }

            oDataModel.read("/ZBBC_SD_MYSALESet", oBindingParams);
        },

        _onDataLoadSuccess: function (oData) {
            var aResults = oData.results;
            this.getView().getModel("tableData").setData({ results: aResults });
            this._groupAndSetChartData(aResults);
        },

        _onDataLoadError: function (oError) {
            console.error("Data load error", oError);
        },

        _groupAndSetChartData: function (aData) {
            var oGroupedData = this._groupDataByMatno(aData);
            var oJSONModel = this.getView().getModel("chartData");
            oJSONModel.setData(oGroupedData);
        },

        _groupDataByMatno: function (aData) {
            var oGroupedData = {};

            aData.forEach(function (item) {
                var productName = productNames[item.Matno] || item.Matno; // 매핑된 이름을 사용하거나 기본적으로 Matno를 사용
                if (!oGroupedData[productName]) {
                    oGroupedData[productName] = {
                        Matno: productName,
                        Pdtotal: 0
                    };
                }
                oGroupedData[productName].Pdtotal += parseFloat(item.Pdtotal);
            });

            return {
                results: Object.values(oGroupedData)
            };
        },

        onFilterData: function () {
            var oView = this.getView();
            var oStartDate = oView.byId("startDate").getDateValue();
            var oEndDate = oView.byId("endDate").getDateValue();
            var sSelectedMatno = oView.byId("matnoComboBox").getSelectedKey();

            var aFilters = [];
            
            if (oStartDate && oEndDate) {
                var oDateFormat = DateFormat.getDateInstance({pattern: "yyyy-MM-dd"});
                var sStartDate = oDateFormat.format(oStartDate);
                var sEndDate = oDateFormat.format(oEndDate);

                aFilters.push(new Filter({
                    filters: [
                        new Filter("Orderdate", FilterOperator.GE, sStartDate),
                        new Filter("Orderdate", FilterOperator.LE, sEndDate)
                    ],
                    and: true
                }));
            }

            if (sSelectedMatno) {
                aFilters.push(new Filter("Matno", FilterOperator.EQ, sSelectedMatno));
            }

            this._loadData(aFilters);
        },

        fnDateToString: function (sValue) {
            if (sValue) {
                var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
                    pattern: 'yyyy-MM-dd'
                });
                return oDateFormat.format(new Date(sValue));
            }
            return sValue;
        },

        onSelectData: function (oEvent) {
            // 차트 데이터 선택 시 처리 로직
        },

        onTableItemPress: function (oEvent) {
            // 테이블 아이템 클릭 시 처리 로직
        },
        
    });
});
