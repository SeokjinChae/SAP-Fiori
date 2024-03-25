sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sap.btp.ux400solving.controller.Main", {
            onInit: function () {

                var oData = {
                    history: [
                        
                    ]
                };
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel, "list");

            },
            onRandomPress: function () {

                var randomValue = Math.floor(Math.random() * 100) + 1;
                this.byId("idInput").setValue(randomValue);


                // this.getView().setModel(oModel,"list");
                var oModel = this.getView().getModel("list");  //다른 함수에서 view에 setmodel 을 했기때문에 이 함수에서도 getmodel가능
                var aHistory = oModel.getProperty("/history");

                aHistory.push({
                    a: randomValue
                })

                oModel.setProperty("/history", aHistory)

            },
            onOpenDialog: function(){
                this.byId("idDialog").open()
            },
    
            
            onClose: function(){
                this.byId("idDialog").close()
                sap.ui.getCore().byId("idDialog").close();
            },

            transformDiscontinued: function(sValue) {
                return sValue ? "Yes" : "No";
            },

            onValueChange: function(oEvent) {
                // oEvent.getSource() : 이벤트를 일으킨 객체 => input
                // oEvent.getParameters() : 이벤트랑 관련된 정보 => 모든 이벤트마다 다름
                //                          ex. Row클릭시, Row관련 정보들
                //                          ex. Input Change 이벤트에선, 변경된 값이 나옴

                var oModel = this.getView().getModel("list");  
                var aHistory = oModel.getProperty("/history");
                var oInput = oEvent.getSource();

                if(oEvent.mParameters.value>=1 && oEvent.mParameters.value<=100){
    
                    aHistory.push({
                        a: oEvent.mParameters.value
                    })
    
                    oModel.setProperty("/history", aHistory)
                }

                else{
                    oInput.setValueState(sap.ui.core.ValueState.Error);
                    oInput.setValueStateText("Please enter a number between 1 and 100.");
                }
            }
                
            
        });
    });
