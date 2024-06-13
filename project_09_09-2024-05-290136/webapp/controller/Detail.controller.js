sap.ui.define([
    "sap/ui/core/mvc/Controller","sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, JSONModel) {
        "use strict";

        return Controller.extend("odata.project0909.controller.Detail", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this);

            },
            _onPatternMatched: function (oEvent) { // 이벤트객체 받기
                // RouteDetail 라우트 객체의 Pattern 이 일치할 때마다 해당 이벤트가 실행됨
                var oArgu = oEvent.getParameters().arguments; // 메인컨에서 보낸 애(argument)를 받아오기
                console.log("Detail : ", oArgu); // 메인컨에서 보낸 애를 잘 받아오는지!
                // this.byId("idText").setText(oArgu.OrderID); // oArgu는 객체이므로, 객체의 키값을 지정해서 거기에 있는 OrderID 값을 지정해줘야!!!
                
                this.byId("idForm").bindElement(`/Orders(${oArgu.OrderID})`)
                // 빈 모델의 Orders 엔티티셋의 한 값(클릭한 애) 바인딩 "/Orders(10248)"
                // orderid 가지고 컨텍스트 바인딩 하는 방식 "EntitySetName(key='1', key2='2')"
                // key가 1개면 다 생략 가능 "EntitySetName('1')" 이라고 써도됨
                // 메타 보면, Order이라는 엔티티의 키값이 OrderId이고, 그 밑에 ShipName, ShipCity 등의 애들이 있는 거니까
                // Orders(10123)이라고 하면 그 그 오더아이디를 키값으로 갖는 행 하나 라는 곳 까지 길잡이가 데려가 있게 바인딩.
                // Orders에 대한 한건의 데이터가 바인딩되어있음. 
                // 뷰에서, idForm 이라는 아이디를 가진 애 안에 해당 데이터를 넣을수 있다.
                // <Text text="{OrderID}" id="name1"/> 그 오더아이디를 키값으로 갖는 행 하나에서, OrderID의 값이 텍스트가 되는거.
                // 모델명이 있으면 당연히 {모델명>OrderID}겠지. 이미 그 바로 위에까지 길잡이가 데려다 줬으니까. 
                
            },
            onNavBack: function () {
                // URL parameter로 넘기는 데이터가 많으면 JSON Model과 같은 모델을 사용하는 게 좋음. 
                // URL에 길이 제한이 있기 때문에. 많은 데이터 넣으면 잘림.
                this.oRouter.navTo('RouteMain', {
                    "query" : {
                        tab : 'project09',
                        test : 0
                    }// 값 두개이상이면 tab=okok&test=10 이런식으로 뜸
                    
                });
                
            }
        });
    });

