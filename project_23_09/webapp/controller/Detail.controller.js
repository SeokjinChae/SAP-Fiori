sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("odata.project2309.controller.Detail", {
            // 초기화 함수 on init는 한번만 실행
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter()
                this.oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched,this)
            },

            //url일치 할때마다 실행
            _onPatternMatched: function(oEvent){
                // Routedetail 라우트 객체의 pattern이 일치할 때마다 이벤트실행
                var oArgu = oEvent.getParameters().arguments
                
                console.log("detail",oArgu)
                console.log("detail22",oArgu.OrderID)
                this.byId("idForm").bindElement(`/Orders(${oArgu.OrderID})`)
            },

            onNavBack: function(){
                //url 파라미터로 넘기는 데이터가 많으면
                // json모델과 같은 모델을 사용하는게 좋음
                // url에 길이제한 있기 때문
                this.oRouter.navTo("RouteMain09",{
                    "query":{
                        tab : "okok",
                        test: 10
                    }
                })
            }
        });
    });