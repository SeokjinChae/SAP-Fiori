sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Button","sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Button,JSONModel) {
        "use strict";

            //클로저 변수(전역변수)
            //var TEST ="okok"

        return Controller.extend("sync.project2302.controller.View1", {
            onInit: function () {

                //this.TEST = "okok"
                var oData = {   
                    history :[  
                    // {num1: 1}, {oper: '+'}, {num2: 1}, {result: 2} // 객체 여러개가 아님 아래처럼 하나로
                    {num1: 1, oper: '+', num2: 1, result: 2}
                    ]
                };

                var oModel99 = new JSONModel(oData); // 여기서 바로 생성가능 data.json말고 JSONModel({key:value})

                new Button
                var oModel = new JSONModel();
                oModel.loadData('../model/data.json',{},false)

                console.log(oModel99.getData());
                console.log(oModel.getData());

                // view에 json모델을 세팅
                this.getView().setModel(oModel,"test");
                this.getView().setModel(oModel99,"local");
            },

            fnColorFormat: function(sValue){
                if(sValue>100){
                    return '#1DDB16'
                }
                else {
                    return '#FF5E00'
                }

            },
            onbeforeRendering : function(){},
            onafterRendering : function(){},
            onexit: function(){},

            onClick: function() {
                var oInput1 = this.byId("idInput0");
                var oInput2 = this.byId("idInput1");
                var sValue1 = oInput1.getValue();
                var sValue2 = oInput2.getValue();
                var int1 = Number(sValue1);
                var int2 = Number(sValue2);
                var oSelect = this.byId("idSelect");
                var sKey = oSelect.getSelectedKey();
                var result;


                var oModel= this.getView().getModel("local");  //다른 함수에서 view에 setmodel 을 했기때문에 이 함수에서도 getmodel가능
                var aHistory = oModel.getProperty("/history");

                switch (sKey) {
                    case "plus":
                        result = int1 + int2;
                        break;
                    case "minus":
                        result = int1 - int2;
                        break;
                    case "multiple":
                        result = int1 * int2;
                        break;
                    case "divide":
                        result = int1 / int2;
                        break;
                    default:
                        alert("다시 시도");
                        return;
                }
            
                alert(result);
                sap.m.MessageToast.show(result)

              // int1 int2 skey result 를 히스토리에 넣기
              aHistory.push({
                num1 : int1,
                oper : sKey,
                num2 : int2,
                result : result
              })

              oModel.setProperty("/history",aHistory)
            } // onClick
        });
    });