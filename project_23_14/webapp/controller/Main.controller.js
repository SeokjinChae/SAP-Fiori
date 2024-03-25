sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment","sap/ui/model/Filter"],
  /*
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel,Fragment,Filter) {
    "use strict";

    return Controller.extend("project2414.controller.Main", {
      onInit: function () {
        var oData = {
          Memid: "1",
          Memnm: "2",
          Telno: "3",
          Email: "4",
        };

        this.getView().setModel(new JSONModel(oData), "data");
      },

      onRowSelectionChange: function (oEvent) {
        // Row 선택 해제 되었을 때도, '선택'된 것이기 때문에 이벤트 발생
        // 따라서 rowContext가 없을 땐 함수 종료하도록 함
        if (!oEvent.getParameter("rowContext")) return;
        var sPath = oEvent.getParameter("rowContext").getPath();

        var oModelData = this.getView().getModel().getProperty(sPath);

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

      onRead : function(){
        //var oPopover = sap.ui.getCore().byId("myPopover")
        // fragment.load 사용시,
        // view를 같이 넘겨줬기 때문에 view안에 popover가 붙게됨
        //따라서 this.byId()로 접근가능
        var oPopover = this.byId("myPopover")
        var oPopoverModel = oPopover.getModel("popover")

        console.log(oPopoverModel.getData())
      },

      onEntity: function () {
        var oDataModel = this.getView().getModel();
        var oJSONData = this.getView().getModel("data").getData();

        var sPath = oDataModel.createKey("/Member", {
          Memid: oJSONData.Memid,
        });
        oDataModel.read(sPath, {
          success: function (oReturn) {
            console.log("한 건 조회:", oReturn);
          },
        });
      },

      onEntitySet: function (oEvent) {
        
        var oDataModel = this.getView().getModel();
        var oButton = oEvent.getSource(),
				oView = this.getView();

			// create popover
			if (!this._pPopover) {
				this._pPopover = Fragment.load({
					id: oView.getId(),
					name: "project2314.view.fragment.Popover",
					controller: this
				}).then(function(oPopover) {
          oPopover.setModel(new JSONModel(),'popover')
					oView.addDependent(oPopover);
					return oPopover;
				});
			}
			this._pPopover.then(function(oPopover) {
				oPopover.openBy(oButton);
			});
      var oPopover = this.byId("myPopover")
      var oPopoverModel = oPopover.getModel('popover')
      var oData = oPopoverModel.getData()
      var oFilter = new Filter("Memnm","Contains",oData.Membername)



        oDataModel.read("/Member", {
          urlParameters:{
            "$expand" : "WorkSet",
            "$select": "Memid,WorkSet"
          },
          filters: [oFilter],
          success: function (oReturn) {
            console.log("전체 조회", oReturn);
          },
          Error: function (oError) {
            console.log("전체 조회 중 오류 발생", oError);
          },
        });
      },

      onCreate: function () {
        var oDataModel = this.getView().getModel();
        var oJSONData = this.getView().getModel("data").getData();
        var oBody = {
          Memid: oJSONData.Memid || "",
          Memnm: oJSONData.Memnm || "",
          Telno: oJSONData.Telno || "",
          Email: oJSONData.Email || "",
        };
        oDataModel.create("/Member", oBody, {
          success: function () {
            sap.m.MessageBox.confirm("Do you want to create this Data?", {
              title: "Confirm",
              onClose: function (oAction) {
                if (oAction === sap.m.MessageBox.Action.OK) {
                  sap.m.MessageBox.information("Data creation completed");
                } else {
                  oDataModel.remove("/Member('" + oBody.Memid + "')", {
                    success: function () {
                      sap.m.MessageBox.information("Data creation canceled");
                    },
                    error: function () {
                      sap.m.MessageBox.error("Fail to cancel data creation");
                    },
                  });
                }
              },
            });
          },
          error: function () {
            sap.m.MessageBox.error("Fail to Create");
          },
        });
      },

      onUpdate: function () {
        var oBody = this.getView().getModel("data").getData();
        var oDataModel = this.getView().getModel();
        var sPath = oDataModel.createKey("/Member", {
          Memid: oBody.Memid,
        });

        oDataModel.update(sPath, oBody, {
          success: function () {
            sap.m.MessageToast.show("Update Complete");
          },
        });
      },
      onDelete: function () {
        var oBody = this.getView().getModel("data").getData();
        var oDataModel = this.getView().getModel();
        var sPath = oDataModel.createKey("/Member", {
          Memid: oBody.Memid,
        });

        oDataModel.remove(sPath, {
          success: function () {
            sap.m.MessageToast.show("Delete Complete");
          },
        });
      },
    });
  }
);
