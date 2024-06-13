sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("ssarumsd090.controller.Main", {
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute('RouteMain').attachPatternMatched(this._onPatternMatched, this);

            var oDate = new Date();
            var oFirstDay = new Date(oDate.getFullYear(), oDate.getMonth(), 1);

            var oData = {
                OrderID: '',
                CustomerID: '',
                OrderDate_start: oFirstDay,
                OrderDate_end: oDate,
                Orderty: ''
            };
            this.getView().setModel(new JSONModel(oData), 'search');

            var oOrderTypes = {
                OrderTypes: [
                    { key: "0", text: "일반주문" },
                    { key: "1", text: "구독주문" }
                ]
            };
            this.getView().setModel(new JSONModel(oOrderTypes), 'orderTypes');

            var oModel = this.getOwnerComponent().getModel();
            if (oModel) {
                oModel.read("/ZBBC_SD_MYSALESet", {
                    success: function(oData) {
                        var orderNoSet = new Set();
                        var custNoSet = new Set();

                        oData.results.forEach(function(item) {
                            orderNoSet.add(item.Orderno);
                            if (item.Custno) {
                                custNoSet.add(item.Custno);
                            }
                        });

                        var oOrderIDs = {
                            OrderIDs: Array.from(orderNoSet).map(function(orderno) {
                                return { Orderno: orderno };
                            })
                        };
                        this.getView().setModel(new JSONModel(oOrderIDs), 'orderIDs');

                        var oCustomerIDs = {
                            CustomerIDs: Array.from(custNoSet).map(function(custno) {
                                return { Custno: custno };
                            })
                        };
                        console.log("Customer IDs:", oCustomerIDs);
                        this.getView().setModel(new JSONModel(oCustomerIDs), 'customerIDs');
                    }.bind(this),
                    error: function(oError) {
                        console.error("Failed to fetch OrderID and CustomerID data", oError);
                    }
                });
            } else {
                console.error("OData model is not available.");
            }

            // DateRangeSelection의 날짜 값 설정
            this.getView().byId("idOrderDate").setDateValue(oFirstDay);
            this.getView().byId("idOrderDate").setSecondDateValue(oDate);
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

        fnOrderTypeFormatter: function (sValue) {
            if (sValue === "0") {
                return "일반주문";
            } else if (sValue === "1") {
                return "구독주문";
            }
            return sValue;
        },

        fnOrderStatusFormatter: function (sValue) {
            switch (sValue) {
                case "0":
                    return "주문요청후 주문승인대기";
                case "1":
                    return "주문승인후 출고승인대기";
                case "2":
                    return "출고승인후 출고대기";
                case "3":
                    return "제품 출고후 배송중";
                case "4":
                    return "배송완료 후 대금청구대기";
                case "5":
                    return "대금청구완료";
                default:
                    return sValue;
            }
        },

        fnSubOrderStatusFormatter: function (sValue) {
            switch (sValue) {
                case "0":
                    return "주문요청후 주문승인대기";
                case "1":
                    return "판매계획에 반영 후 출고승인대기";
                case "2":
                    return "출고승인후 출고대기";
                case "3":
                    return "제품 출고후 배송중";
                case "4":
                    return "배송완료 후 대금청구대기";
                case "5":
                    return "대금청구완료";
                case "6":
                    return "구독 만료";
                default:
                    return sValue;
            }
        },

        _onPatternMatched: function (oEvent) {
            var oArgu = oEvent.getParameter('arguments');
            if (oArgu["?query"] && oArgu["?query"].test) {
                console.log("main:", oArgu["?query"].test);
            }
        },

        onSearch: function () {
            var oView = this.getView();
            var oSearchModel = oView.getModel('search');
            var aFilters = [];

            var sOrderID = oView.byId("idOrderID").getSelectedKey();
            var sCustomerID = oView.byId("idCustomerID").getSelectedKey();
            var sOrderty = oView.byId("idOrderty").getSelectedKey();
            var sOrderDateStart = oSearchModel.getProperty("/OrderDate_start");
            var sOrderDateEnd = oSearchModel.getProperty("/OrderDate_end");

            if (sOrderID) {
                aFilters.push(new Filter("Orderno", FilterOperator.EQ, sOrderID));
            }

            if (sCustomerID) {
                aFilters.push(new Filter("Custno", FilterOperator.Contains, sCustomerID));
            }

            if (sOrderty) {
                aFilters.push(new Filter("Orderty", FilterOperator.EQ, sOrderty));
            }

            if (sOrderDateStart && sOrderDateEnd) {
                aFilters.push(new Filter("Orderdate", FilterOperator.BT, sOrderDateStart, sOrderDateEnd));
            }

            var oBinding = oView.byId("sd060Table").getBinding("items");
            oBinding.filter(aFilters);
        },

        onSelectionChange: function (oEvent) {
            var sPath = oEvent.getParameters().listItem.getBindingContextPath();
            var oSelectData = this.getView().getModel().getProperty(sPath);
            var sOrderty = oSelectData.Orderty;
            var sOrderno = oSelectData.Orderno;

            if (sOrderty === "0") {
                this.oRouter.navTo("RouteDetail", {
                    Orderno: sOrderno,
                    Orderty: sOrderty
                }, true);
            } else if (sOrderty === "1") {
                this.oRouter.navTo("RouteDetail2", {
                    Orderno: sOrderno,
                    Orderty: sOrderty
                }, true);
            }
        }
    });
});
