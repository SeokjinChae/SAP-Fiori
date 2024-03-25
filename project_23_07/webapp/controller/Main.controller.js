sap.ui.define([
    "sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("project2307.controller.Main", {
            onInit: function () {
                // var oData = {   
                //     name: '홍길동',
                //     age: 20,
                //     title: 'gilpage'
                // };
                // var oModel = new JSONModel(oData);
                var oData88 = {   
                    inpValue: 'world'
                };


                var oData99 = {   
                    textValue: 'hello'
                };


                var oModel = new JSONModel() // 이 경우는 json 생성한 경우
                oModel.loadData('../model/data.json',{},false) //json

                var oModel88 = new JSONModel(oData88); // 여기서 바로 생성가능 data.json말고 JSONModel({key:value})
                var oModel99 = new JSONModel(oData99);

                console.log(oModel.getData());
                console.log(oModel88.getData());
                console.log(oModel99.getData());

                // view에 json모델을 세팅
                this.getView().setModel(oModel,"test");
                this.getView().setModel(oModel88);
                this.getView().setModel(oModel99,"now");

                
                // this.getView().setModel(모델객체, "car"); //이름 있는 경우

            },
            onSetData : function(oEvent) {
            var oModel88 = this.getView().getModel();
            var oModel99 = this.getView().getModel("now");// 99 or ("now")?? 99는 지역변수임


            // var sInputData = oModel88.getProperty("/inpValue");
            var sInputData88 = oModel88.getData().inpValue;
            var sInputData99 = oModel99.getData().textValue;
            console.log(sInputData88)
            console.log(sInputData99)

            // oModel99.setData({ textValue:sInputData99+" world" },true);
            oModel99.setProperty("/textValue",sInputData99+" world");
            }
        });
    });
    
    // var oData88 = {   
    //     inpValue: 'world'
    // };


    // var oData99 = {   
    //     textValue: 'hello'
    // };