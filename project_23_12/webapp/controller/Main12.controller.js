sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project2312.controller.Main12", {
            onInit: function () {
                // 한 단계 위에 있는 컴포넌트에 접근해서 , 라우터를 가져온다.
                this.oRouter = this.getOwnerComponent().getRouter()
                this.oRouter.getRoute('RouteMain12').attachPatternMatched(this._onPatternMatched,this)
            },

            _onPatternMatched : function(oEvent){
                //var oArgu = oEvent.getParameter.argument 아래와 동일
                var oArgu = oEvent.getParameter('arguments')

                oArgu["?query"].test
                console.log("main:",oArgu["?query"].test)
            },

            onGoDetail : function(){
                this.oRouter.navTo("RouteDetail",{
                    key1 : "okok",
                    key2 : 123
                },true)
                //navTo(라우트객체이름,{파라미터정보},히스토리초기화)
            },

            onGoNotFound: function(){
                this.oRouter.getTargets().display("NotFound",{
                    fromTarget:"TargetMain12"
                })
            },

            onGoEmployee : function(){
                this.oRouter.navTo("RouteEmployee",{
                    key1 : "okok",
                    key2 : 123
                },true)
                //navTo(라우트객체이름,{파라미터정보},히스토리초기화)
            },
        });
    });
