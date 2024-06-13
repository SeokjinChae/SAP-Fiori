sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project2312.controller.NotFound", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter()

                var oTarget = this.oRouter.getTarget("NotFound")
                oTarget.attachDisplay(this._onAttachDisplay, this)
            },

            _onAttachDisplay :function(oEvent){
                //해당 타겟으로 넘겨질 때 받았던 파라미터 값이 "data"에 들어있음
                //"data"에 들어있는 값을 controller내부에서 사용할 수 있도록
                // this.oData에 담아놓는다.
                this._oData = oEvent.getParameter("data")
            },

            onNavBack : function(){
                if(this._oData && this._oData.fromTarget){
                    this.oRouter.getTargets().display(this._oData.fromTarget)
                    delete this._oData.fromTarget
                    return
                }
                //브라우저에 쌓인 히스토리에서, 한번 뒤로 가기
                window.history.go(-1)
            }
            // onNavBack: function(){
            //     //url 파라미터로 넘기는 데이터가 많으면
            //     // json모델과 같은 모델을 사용하는게 좋음
            //     // url에 길이제한 있기 때문
            //     this.oRouter.navTo("RouteMain12",{
            //         "query":{
            //             tab : "okok",
            //             test: 10
            //         }
            //     })
            // }
        });
    });
