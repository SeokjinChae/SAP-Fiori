sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/ui/core/format/DateFormat",
    "sap/ui/core/format/NumberFormat"
],
    function (Controller, Filter, FilterOperator, MessageBox, DateFormat, NumberFormat) {
        "use strict";

        return Controller.extend("ssarumpp070.controller.Main", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteMain").attachPatternMatched(this._onPatternMatched, this);
                this._matnoMap = {
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
                this._dateFormat = DateFormat.getDateInstance({ pattern: "yyyy.MM.dd" });
                this._currencyFormat = NumberFormat.getCurrencyInstance({
                    currencyCode: false,
                    decimals: 0
                });
                this._loadTodayData();
                this._loadAllData();
            },
            _onPatternMatched: function () {
                this._loadTodayData();
                this._loadAllData();
            },
            _loadTodayData: function () {
                var oDataModel = this.getView().getModel();
                var today = new Date();
                var sDateFormat = DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" });
                var sToday = sDateFormat.format(today);

                var aFilter = [new Filter("Performdat", FilterOperator.EQ, sToday)];

                oDataModel.read("/ZBBT_PP070Set", {
                    filters: aFilter,
                    success: function (oReturn) {
                        var transformedData = this._transformData(oReturn.results, "Prquan");
                        var oModel = new sap.ui.model.json.JSONModel({ results: transformedData });
                        var oChart1 = this.byId("idChart1");
                        oChart1.setModel(oModel);
                        oChart1.getDataset().bindData("/results");
                    }.bind(this),
                    error: function (oError) {
                        console.log("데이터 조회 중 오류 발생: ", oError);
                    }
                });
            },

            _loadAllData: function () {
                var oDataModel = this.getView().getModel();
                oDataModel.read("/ZBBT_PP070Set_W", {
                    success: function (oReturn) {
                        var transformedData = this._transformData(oReturn.results, "Prquan");
                        var oModel = new sap.ui.model.json.JSONModel({ results: transformedData });
                        var oChart2 = this.byId("idChart2");
                        oChart2.setModel(oModel);
                        oChart2.getDataset().bindData("/results");
                    }.bind(this),
                    error: function (oError) {
                        console.log("전체 데이터 조회 중 오류 발생: ", oError);
                    }
                });
            },
            _transformData: function (data, measureField) {
                var aggregatedData = {};
                data.forEach(function (item) {
                    var matno = item.Matno;
                    var matName = this._matnoMap[matno] || matno;
                    if (!aggregatedData[matName]) {
                        aggregatedData[matName] = { Matno: matName, Value: 0 };
                    }
                    aggregatedData[matName].Value += parseFloat(item[measureField]);
                }.bind(this));
                return Object.values(aggregatedData);
            },
            _transformTableData: function (data, isDateRange) {
                var aggregatedData = {};
                data.forEach(function (item) {
                    var matno = item.Matno;
                    var matName = this._matnoMap[matno] || matno;
                    if (!aggregatedData[matName]) {
                        aggregatedData[matName] = {
                            Matno: matName,
                            Prquan: 0,
                            Dispquan: 0,
                            Unit: item.Unit,
                            Price: this._currencyFormat.format(item.Price),
                            Currency: item.Currency,
                            Performno: isDateRange ? "-" : item.Performno,
                            Performdat: isDateRange ? "-" : this._dateFormat.format(new Date(item.Performdat)),
                            Disptxt: isDateRange ? "-" : item.Disptxt,
                            Porderno: isDateRange ? "-" : item.Porderno,
                            Empno: isDateRange ? "-" : item.Empno,
                            Plantno: isDateRange ? "-" : item.Plantno
                        };
                    }
                    aggregatedData[matName].Prquan += parseFloat(item.Prquan);
                    aggregatedData[matName].Dispquan += parseFloat(item.Dispquan);
                }.bind(this));
                return Object.values(aggregatedData);
            },
            _transformTableDataForDate: function (data) {
                return data.map(function (item) {
                    return {
                        Matno: this._matnoMap[item.Matno] || item.Matno,
                        Performdat: this._dateFormat.format(new Date(item.Performdat)),
                        Prquan: item.Prquan,
                        Dispquan: item.Dispquan,
                        Unit: item.Unit,
                        Price: this._currencyFormat.format(item.Price),
                        Currency: item.Currency,
                        Performno: item.Performno,
                        Porderno: item.Porderno,
                        Empno: item.Empno,
                        Plantno: item.Plantno,
                        Disptxt: item.Disptxt
                    };
                }.bind(this));
            },
            _generateWeekLabels: function () {
                var weeks = [];
                var currentDate = new Date();
                for (var i = 0; i < 8; i++) {
                    var endOfWeek = new Date(currentDate.setDate(currentDate.getDate() - (currentDate.getDay() || 7)));
                    var startOfWeek = new Date(endOfWeek);
                    startOfWeek.setDate(startOfWeek.getDate() - 6);

                    var weekLabel = `${startOfWeek.getFullYear()}.${(startOfWeek.getMonth() + 1).toString().padStart(2, '0')}.${startOfWeek.getDate().toString().padStart(2, '0')} ~ ${endOfWeek.getFullYear()}.${(endOfWeek.getMonth() + 1).toString().padStart(2, '0')}.${endOfWeek.getDate().toString().padStart(2, '0')}`;
                    weeks.unshift({ weekLabel: weekLabel, startOfWeek: startOfWeek.toISOString().split('T')[0], endOfWeek: endOfWeek.toISOString().split('T')[0] });

                    currentDate.setDate(currentDate.getDate() - 1);
                }
                return weeks;
            },
            _loadStackedColumnChart: function (sSelectedKey) {
                var oDataModel = this.getView().getModel();
                var aWeeks = this._generateWeekLabels();
                var aFilters = [
                    new Filter("Matno", FilterOperator.EQ, sSelectedKey),
                    new Filter("Performdat", FilterOperator.BT, aWeeks[0].startOfWeek, aWeeks[aWeeks.length - 1].endOfWeek)
                ];

                oDataModel.read("/ZBBT_PP070Set", {
                    filters: aFilters,
                    success: function (oReturn) {
                        var transformedData = this._aggregateWeeklyData(oReturn.results, aWeeks);
                        var oModel = new sap.ui.model.json.JSONModel({ results: transformedData });
                        var oChart = this.byId("stackedColumnChart");
                        oChart.setModel(oModel);
                        oChart.getDataset().bindData("/results");
                    }.bind(this),
                    error: function (oError) {
                        console.log("주차별 데이터 조회 중 오류 발생: ", oError);
                    }
                });
            },
            _aggregateWeeklyData: function (data, weeks) {
                var weeklyData = weeks.map(function (week) {
                    var filteredData = data.filter(function (item) {
                        return item.Performdat >= week.startOfWeek && item.Performdat <= week.endOfWeek;
                    });

                    var productionSum = filteredData.reduce(function (sum, item) {
                        return sum + parseFloat(item.Prquan);
                    }, 0);

                    var defectSum = filteredData.reduce(function (sum, item) {
                        return sum + parseFloat(item.Dispquan);
                    }, 0);

                    return {
                        weekLabel: week.weekLabel,
                        Production: productionSum,
                        Defect: defectSum
                    };
                });

                return weeklyData;
            },
            onDateRangeSelect: function (oEvent) {
                var oDateRangeSelection = oEvent.getSource();
                var oDateRange = oDateRangeSelection.getDateValue();
                var oSecondDate = oDateRangeSelection.getSecondDateValue();
                
                if (oDateRange && oSecondDate) {
                    this._selectedDateRange = { start: oDateRange, end: oSecondDate };
                    this._loadChartDataForDateRange(oDateRange, oSecondDate);
                }
            },
            onMatnoRadioButtonSelect: function(oEvent) {
                var oSelectedButton = oEvent.getSource().getSelectedButton();
                var sSelectedKey = oSelectedButton.getCustomData()[0].getValue();
                
                this._loadStackedColumnChart(sSelectedKey);
            }
        });
    });
