sap.ui.define(
    ["sap/ui/core/mvc/Controller", 
     "sap/ui/model/json/JSONModel",
     "sap/ui/model/Filter",
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel,Filter) {
      "use strict";
  
      return Controller.extend("odata.project2313.controller.Main", {
        onInit: function () {
          var oData = {
            // 'Products' EntitySet Property이름 그대로 가져와야 함.
            Productno: "8786",
            Productname: "asdf",
            Fname: "1234",
            Lname: "1234",
            Memo: "1234",
          };
  
          this.getView().setModel(new JSONModel(oData), "data");
        },
  
        onRowSelectionChange: function (oEvent) {
          // Row 선택 해제 되었을 때도, '선택'된 것이기 때문에 이벤트 발생
          // 따라서 rowContext가 없을 땐 함수 종료하도록 함
          if (!oEvent.getParameter("rowContext")) return;
          var sPath = oEvent.getParameter("rowContext").getPath();
          // "/Products('1000')"
  
          // 모델 데이터를 가져와서 각각의 Input에 세팅하기
          // 이 때, 세팅하는 방법은 id 말고, JSON Model로 해보기
          // JSON Model의 이름은 'data'
  
          // oData모델 가져오기
          var oModelData = this.getView().getModel().getProperty(sPath);
  
          // var oNewModelData = {
          //   Productno: oModelData.Productno,
          //   Productname: oModelData.Productname,
          //   Fname: oModelData.Fname,
          //   Lname: oModelData.Lname,
          //   Memo: oModelData.Memo,
          // };
  
          // local모델 가져오기(data)
          var oModel = this.getView().getModel("data");
  
          oModel.setData(oModelData);
        },
  
        onReset: function () {
          // Reset 버튼 클릭 시 Input 데이터 초기화
  
          var oModel = this.getView().getModel("data");
          var oModelData = {};
          oModel.setData(oModelData);
  
          // Table 선택 상태 해제
          this.byId("idTable").clearSelection();
          this.getView().getModel().refresh(true);
        },
  
        onEntitySet: function () {
          // 전체 조회 구현
          // GET 요청 : '/Products'
          // this.byId("idDialog").open()
          var oDataModel = this.getView().getModel();
          var oFilter = new Filter("Productname","EQ","안녕")
          
          oDataModel.read("/Products", {
            filters: [oFilter],
            success: function (oReturn) {
              console.log("전체 조회 :", oReturn);

              this.byId("idDialog").setModel(new JSONModel(oReturn),"popup")
              this.byId("idDialog").open()
            }.bind(this),
            error: function (oError) {
              console.log("전체 조회 중 오류 발생 ", oError);
            },
          });
        },
  
        onCreate: function () {
          // 데이터 생성 구현
          // POST 요청 : '/Products' + Body
  
          var oDataModel = this.getView().getModel();
          var oJSONData = this.getView().getModel("data").getData();
  
          // A || '' 뜻
          // => A 값이 없으면(false), 빈 문자열 처리
          var oBody = {
            Productno: oJSONData.Productno, // key 값이라 빈 값일 수 없음
            Productname: oJSONData.Productname || "",
            Fname: oJSONData.Fname || "",
            Lname: oJSONData.Lname || "",
            Memo: oJSONData.Memo || "",
          };
          oDataModel.create("/Products", oBody, {
            success: function () {
              sap.m.MessageToast.show("데이터 생성 완료");
            },
          });
        },
  
        onDelete: function () {
          var oDataModel = this.getView().getModel();
        },
        onEntity: function(){
            //데이터 한 건 조회
            //get 요청 :"/Products(productNo='1')"
            var oDataModel = this.getView().getModel()
            var sPath = oDataModel.createKey("/Products",{
                Productno:'1000'
            })

            oDataModel.read(sPath,{
                success: function(oReturn){
                    console.log("한건조회:",oReturn)
                }
            })
        },

        onUpdate:function(){
            var oBody = this.getView().getModel("data").getData()
            var oDataModel = this.getView().getModel();
            var sPath = oDataModel.createKey("/Products",{
                Productno : oBody.Productno
            })

            oDataModel.update(sPath,oBody,{
                success:function(){
                    sap.m.MessageToast.show("데이터 변경완료")
                }
            })
        },

        onDelete:function(){
            var oBody = this.getView().getModel("data").getData()
            var oDataModel = this.getView().getModel();
            var sPath = oDataModel.createKey("/Products",{
                Productno : oBody.Productno
            })

            oDataModel.remove(sPath, {
                success:function(){
                    sap.m.MessageToast.show("삭제")
                }
            })

        },
        
        _showMessage: function(msg) {
          sap.m
        },

        onClose: function(){
          this.byId("idDialog").close()
          sap.ui.getCore().byId("idDialog").close();
      },
      onOpenDialog: function(){
        this.byId("idDialog").open()
    },

      });
    }
  );
