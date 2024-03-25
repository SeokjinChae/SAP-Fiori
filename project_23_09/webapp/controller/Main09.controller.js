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

        return Controller.extend("odata.project2309.controller.Main09", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter()
                this.oRouter.getRoute('RouteMain09').attachPatternMatched(this._onPatternMatched,this)
                // this.getView().setModel()
                var oData ={
                    OrderID:'',
                    CustomerID:'',
                    OrderDate_start :null,
                    OrderDate_end : null

                }
                this.getView().setModel(new JSONModel(oData),'search')
            },

            _onPatternMatched : function(oEvent){
                //var oArgu = oEvent.getParameter.argument 아래와 동일
                var oArgu = oEvent.getParameter('arguments')

                oArgu["?query"].test
                console.log("main:",oArgu["?query"].test)
            },

            fnDateToString: function(sValue){
                if(sValue){
                    var oFormat = sap.ui.core.format.DateFormat.getDateInstance({
                        pattern:'yyyy-MM-dd'
                    });

                    return oFormat.format(sValue);
                }
            },
            onValueHelpRequest: function(){
                // sap.m.MessageToast.show('팝업 오픈!')
                this.byId("idCustomerID1").open()
            },

            onSearch : function(){
                var sOrderID = this.byId("idOrderID").getValue();
                var sCustomerID = this.byId("idCustomerID").getValue();
                var sOrderDate = this.byId("idOrderDate")
                var s = sOrderDate.getDateValue()
                var e = sOrderDate.getSecondDateValue()
                // var oSearch=this.getView().getModel('search').getData();

                if(s&&e){
                    
                    var oFilter = new Filter({
                        path : 'OrderDate',  //대상 필드명
                        operator : FilterOperator.BT, // 연산자(조건)
                        value1 : sOrderDate.getDateValue(), // 값 BT경우 from
                        value2 : sOrderDate.getSecondDateValue() // BT경우 to
                    })
                }

                if(sOrderID){
                    
                    var oFilter = new Filter({
                        path : 'OrderID',  //대상 필드명
                        operator : FilterOperator.EQ, // 연산자(조건)
                        value1 : sOrderID, // 값 BT경우 from
                        value2 : '' // BT경우 to
                    })
                }

                if(sCustomerID){
                    
                    var oFilter = new Filter({
                        path : 'CustomerID',  //대상 필드명
                        operator : FilterOperator.Contains, // 연산자(조건)
                        value1 : sCustomerID, // 값 BT경우 from
                        value2 : '' // BT경우 to
                    })
                }

                this.byId("idTable").getBinding("items").filter(oFilter);





                // filters 사용
                // var sOrderID = this.byId("idOrderID").getValue();
                // var sCustomerID = this.byId("idCustomerID").getValue();
                // var aFilter = [];

                // if(sOrderID) aFilter.push(new Filter('OrderID','EQ',sOrderID))
                // if(sCustomerID) aFilter.push(new Filter('CustomerID','Contains','sCustomerID'))
                // var oFilter = new Filter({
                //     filters:[
                //         new Filter('OrderID','EQ',sOrderID),
                //         new Filter('CustomerID','Contains','sCustomerID')
                //     ],
                //     and : false
                // })

                // this.byId("idTable").getBinding("items").filter(oFilter);
            },

            onSelectionChange : function(oEvent){
                var sPath = oEvent.getParameters().listItem.getBindingContextPath();
                var oSelectData = this.getView().getModel().getProperty(sPath);

                // alert(oSelectData.OrderID) //선택한 데이터 출력 oSelectData에 다른 데이터 있음
                this.oRouter.navTo("RouteDetail",{
                    OrderID : oSelectData.OrderID
                },true)
            },

            onOpenDialog: function(){
                this.byId("idCustomerID").open()
            },
    
            
            onClose: function(){
                this.byId("idCustomerID1").close()
                sap.ui.getCore().byId("idCustomerID1").close();
            },
            onGoDetail : function(){
                this.oRouter.navTo("RouteDetail",{
                    key1 : "okok",
                    key2 : 123
                },true)
                //navTo(라우트객체이름,{파라미터정보},히스토리초기화)
            }
        });
    });