sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, JSONModel, MessageToast) {
        "use strict";
        
        return Controller.extend("lib.app.libAPI.controller.Get", {
            onInit: function () {

                const oModelSelect = new JSONModel();
                this.getView().byId('selectMenu').setModel(oModelSelect);

                const oData = {
                    "SelectedAttribute": "title",
                    "Attributes": [
                        {
                            "AttrId": "title",
                            "Name": "Title"
                        },
                        {
                            "AttrId": "subtitle",
                            "Name": "Subtitle"
                        },
                        {
                            "AttrId": "authors",
                            "Name": "Author"
                        },
                        {
                            "AttrId": "editors",
                            "Name": "Editor"
                        },
                        {
                            "AttrId": "category",
                            "Name": "Category"
                        },
                        {
                            "AttrId": "description",
                            "Name": "Description"
                        },
                        {
                            "AttrId": "source",
                            "Name": "Source"
                        }
                    ],
                    "Editable": true,
                    "Enabled": true
                };
                
                oModelSelect.setData(oData);
                
                const oModel = new JSONModel();
                this.getView().setModel(oModel);
                
                $.ajax({
                    url: "http://localhost:8000/books",
                    type: 'GET',
                    dataType: 'json'
                })
                .done((res) => {
                    if (Object.keys(res).length === 0){
                        MessageToast.show("Not found");
                    }
                    oModel.setData(res);
                });
            },
            onRefreshPress: function () {
                const oModel = new JSONModel();
                this.getView().setModel(oModel);
                $.ajax({
                    url: "http://localhost:8000/books",
                    type: 'GET',
                    dataType: 'json'
                })
                .done((res) => {
                    if (Object.keys(res).length === 0){
                        MessageToast.show("Not found");
                    }
                    oModel.setData(res);
                });
            },
            onSearch: function (oEvent) {
                const sQuery = oEvent.getSource().getValue();
                const sQueryType = this.getView().byId("selectMenu").getSelectedKey();
                const oModel = new JSONModel();
                this.getView().setModel(oModel);
                $.ajax({
                    url: `http://localhost:8000/books?${sQueryType}=${sQuery}`,
                    type: 'GET',
                    dataType: 'json'
                })
                .done((res) => {
                    if (Object.keys(res).length === 0){
                        MessageToast.show("Not found");
                    }
                    oModel.setData(res);
                });

            }
        });
    }
);

 //TODO: Make fragment for displaying image in fullscreen
 //TODO: Make fragment for displaying description in fullscreen
 //TODO: onclick row route info to create if on google books mode