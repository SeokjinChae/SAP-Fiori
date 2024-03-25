sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,FlattenedDataset,FeedItem) {
        "use strict";

        return Controller.extend("project2310.controller.Main10", {
            onInit: function () {
                var oData ={
                    list : [
                        {name: 'aaa', rate:'35', cost : '10'},
                        {name: 'bbb', rate:'45', cost : '20'},
                        {name: 'ccc', rate:'55', cost : '30'},
                        {name: 'ddd', rate:'65', cost : '40'},
                        {name: 'eee', rate:'75', cost : '50'},
                        {name: 'fff', rate:'85', cost : '60'}
                    ]
                }
                this.getView().setModel(new JSONModel(oData),"view");

                this._setChartIncontroller();
            },

            _setChartIncontroller: function(){
                var oData = {
                    sales :[
                        {product :"Jackets", amount: "65"},
                        {product :"Shirts", amount: "75"},
                        {product :"Pants", amount: "85"},
                        {product :"Coats", amount: "95"},
                        {product :"Purse", amount: "75"}
                    ]
                }
                this.getView().setModel(new JSONModel(oData),"cont");

                //chart
                var oColFrame = this.byId("idColChart");

                //dataset
                var oColDataset = new FlattenedDataset({
                    dimensions: [
                        {
                            name: 'Product', //카테고리명
                            value: '{cont>product}' //데이터 정보
                        }
                    ],
                    measures: [
                        {
                            name:'Amount',
                            value: '{cont>amount}'
                        }
                    ],
                    data : {
                        path : 'cont>/sales'
                    }
                })

                oColFrame.setDataset(oColDataset);

                var feedColValueAxis = new FeedItem({
                    uid:'valueAxis',
                    type:'Measure',
                    values: ['Amount']
                })

                var feedColCategoryAxis = new FeedItem({
                    uid:'categoryAxis',
                    type:'Dimension',
                    values: ['Product']
                })

                oColFrame.addFeed(feedColValueAxis)
                oColFrame.addFeed(feedColCategoryAxis)

                oColFrame.setVizProperties({
                    title : {text : '두번째 차트'}
                });

            }
        });
    });
