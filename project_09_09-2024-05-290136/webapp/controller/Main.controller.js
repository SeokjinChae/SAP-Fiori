sap.ui.define([
    "sap/ui/core/mvc/Controller","sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, JSONModel) {
        "use strict";

        return Controller.extend("odata.project0909.controller.Main", {
            onInit: function () {
                var oData = {
                    OrderID : '',
                    CustomerID : '',
                    OrderDate_start : null,
                    OrderDate_end : null
                };
                this.getView().setModel(new JSONModel(oData), 'search');


                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteMain").attachPatternMatched(this._onPatternMatched, this);
            },

            _onPatternMatched: function (oEvent) { // argument를 받아오는 함수???
                var oArgu = oEvent.getParameter('arguments');
                var oArgu = oEvent.getParameters.arguments; // 위와 동일
                // console.log("Main : ", oArgu);
                // console.log("Main : ", oArgu["?query"].test); // 메인뷰로 갈 때 10 출력
            },

            fnDateString : function (sValue) { // sValue에 OrderDate가 들어옴
                if (sValue) { // 이상한거 들어올수도 잇으니, 값 한번 확인!

                    var oFormat = sap.ui.core.format.DateFormat.getDateInstance({ // api 사이트에 여기 객체 들간다 햇으니까 객체 {}
                        pattern : 'yyyy-MM-dd'
                    }); // 데이트 관련 포맷 객체 만듬. 여기에 값 넣을 수 있음.

                    var result = oFormat.format(sValue); // "2024-01-09"
                    return result; // "2024-01-09"
                } 

            },
            onValueHelpRequest : function () {
                sap.m.MessageToast.show("팝업 오픈!");
                this.byId("idCustomerDialog").open();
            },

            onClose: function(oEvent) {
                oEvent.getSource().getParent().close(); 
            },

            onSearch : function () {
                // var sOrderID = this.byId("idOrderID").getValue(); // input 안의 value값 가져오기
                // var sCustomerID = this.byId("idCustomerID").getValue(); // input 안의 value값 가져오기
                // var sStartDateID = this.byId("idOrderDate").getDateValue();
                // var sEndDateID = this.byId("idOrderDate").getSecondDateValue();
                // 위처럼 가져와도 되는데, JSON모델 활용해도 됨!
                // 2-way 바인딩하는 모델.
                // 각 인풋의 value 속성에, 모델 위치 바인딩해두기
                // 뷰에 <Input id="{모델이름>/ ~~}}" valueHelpRequest = "onValueHelpRequest"></Input>

                var oSearchData = this.getView().getModel('search').getData(); // 사용자가 입력한 데이터들이 들어가는 모델
                // {OrderID : ''. CustomerID : '', OrderDate_start : '', OrderDate_End}

                var aFilter = [];
                debugger;

                // if (sOrderID) {
                if (oSearchData.OrderID) {
                    var oFilter = new Filter({
                        path : 'OrderID', // 필터 적용할 대상 필드명
                        operator : FilterOperator.EQ, // 연산자 (조건) FilterOperator.EQ 이렇게 하는게 더 안전. 'EQ'도 가능.
                        // value1 : sOrderID, // 값 (BT의 경우 From)
                        value1 : oSearchData.OrderID,
                        value2 : '' // 값 ((BT의 경우 To))
                    }); // 필터 안쪽에 옵션정보 넣어서 필터객체 oFilter 만들기 -> 뷰에 세팅해야됨

                    aFilter.push(oFilter);
                }
                
                // CustomerID에 입력된 값을 기준으로 필터링하는 객체
                // if (sOrderID) {
                if (oSearchData.CustomerID) {
                    var oFilter = new Filter({
                        path : 'CustomerID', // 필터 적용할 대상 필드명
                        operator : FilterOperator.Contains, // 연산자 (조건) FilterOperator.EQ 이렇게 하는게 더 안전. 'EQ'도 가능.
                        // value1 : sCustomerID, // 값 (BT의 경우 From)
                        value1 : oSearchData.CustomerID,
                        value2 : '' // 값 ((BT의 경우 To))
                        
                    }); // 필터 안쪽에 옵션정보 넣어서 필터객체 oFilter 만들기 -> 뷰에 세팅해야됨

                    aFilter.push(oFilter);
                }

                // 위의 코드를 간단히 한 것
                // if (sCustomerID) {
                //     aFilter.push(new Filter('CustomerID', 'Contains', sCustomerID));
                // }

                // DataRange에 입력된 값을 기준으로 필터링하는 객체
                // if (sStartDateID && sEndDateID) {
                if (oSearchData.OrderDate_start && oSearchData.OrderDate_end) {
                    var oFilter = new Filter({
                        path : 'OrderDate', 
                        operator : FilterOperator.BT, 
                        // value1 : sStartDateID, // 값 (BT의 경우 From)
                        // value2 : sEndDateID // 값 ((BT의 경우 To))
                        value1 : oSearchData.OrderDate_start,
                        value2 : oSearchData.OrderDate_end
                    }); 

                    aFilter.push(oFilter);
                }

                // filters 를 쓸 때 주의! aFilter 배열에 필터 객체가 최소 1개 이상인 경우만 적용하고, 필터 객체가 없는 빈 배열이면 적용하지 않기
                if (aFilter.length >= 1) {
                    // this.byId("idTable").getBinding("items").filter(aFilter);
                    this.byId("idTable").getBinding("items").filter(new Filter({
                        filters : aFilter, // filters [] 에는 여러 필터 객체들이 배열로 들어감
                        and : false
                    }));
                } else {
                    this.byId("idTable").getBinding("items").filter(); // 아무 필터도 적용하지 않는다.
                }
            }, 
            onSelectionChange : function (oEvent) { // 파라미터 변수로 이벤트 객체가 들어옴
                // 상대경로로 지정되어 있는 데이터셋에서, 내가 선택한 ROW의 모델 경로를 얻음
                var sPath = oEvent.getParameters().listItem.getBindingContextPath();
                // 콘솔에서 listItem 찍어서 뭔지 보기
                // 모델 경로를 통해서 해당 경로의 전체 데이터를 얻음
                var oSelectData = this.getView().getModel().getProperty(sPath);
                // alert(oSelectData.OrderID); // 내가 선택한 행의 orderID가 얼럿된다.

                // Detail뷰로 이동
                this.oRouter.navTo('RouteDetail', {
                    OrderID : oSelectData.OrderID
                }, true);


            }
        });
    });

