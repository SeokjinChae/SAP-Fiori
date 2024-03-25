sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project2308.controller.Main08", {
            onInit: function () {
                var oData = {
                    list : []
                };
                var oModel= new sap.ui.model.json.JSONModel(oData);
                this.getView().setModel(oModel);
            },
            onAdd : function(){
                var oModel = this.getView().getModel();
                var aList = oModel.getProperty("/list");

                aList.push({
                    name : 'hihi',
                    age : 20
                });

                oModel.setProperty("/list",aList);
            },

            onRowDelete : function(oEvent){
                var index = oEvent.getParameters().row.getIndex();
                var aList = this.getView().getModel().getProperty("/list");


                // 해당 index의 모델 데이터 삭제
                aList.splice(index,1); // 2이면 2개씩 삭제

                this.getView().getModel().setProperty("/list",aList);
            },
            onDelete: function() {
                var oTable = this.byId("idTable")
                var aList = this.getView().getModel().getProperty("/list")
                var aIndices = oTable.getSelectedIndices();
            

                //[1,3,5]이면, 배열.length할때 3이 리턴
                // 반복문 돌릴때 index는 0부터 시작이라 -1
                var len = aIndices.length-1
                for (var i = len; i >= 0; i--) {
                    aList.splice(aIndices[i], 1);
                }
            

                this.getView().getModel().setProperty("/list", aList);
            }

        });
    });
