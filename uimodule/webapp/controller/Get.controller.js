sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";
        
        return Controller.extend("lib.app.libAPI.controller.Get", {
            onInit: function () {
                const oModel = new JSONModel();
                this.getView().setModel(oModel);
                
                $.ajax({
                    url: "http://localhost:8000/books",
                    type: 'GET',
                    dataType: 'json'
                })
                .done((res) => {
                    oModel.setData(res);
                });
            },
            onRefreshPress: function () {
                //TODO: refresh table alone
                location.reload();
            }
        });
    }
);

 //TODO: Make fragment for displaying image in fullscreen
 //TODO: Make fragment for displaying description in fullscreen
 //TODO: onclick row route info to create if on google books mode