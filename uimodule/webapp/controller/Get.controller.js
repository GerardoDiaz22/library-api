sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, JSONModel) {
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
            },
            onSearch: function (oEvent) {
                // add filter for search
                const aFilters = [];
                const sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                    const filter = new Filter("title", FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }
    
                // update list binding
                var oTable = this.byId("bookshelf");
                var oBinding = oTable.getBinding("items");
                oBinding.filter(aFilters);

                // Get count of items
                const iCount = this.getView().byId("bookshelf").attachUpdateFinished(null, function(oEvent) {
                    return oEvent.getParameter("actual");
                }, this);
                console.log(iCount._iVisibleItemsLength);
                if (iCount._iVisibleItemsLength == 0) {
                    const oModel = new JSONModel();
                    this.getView().setModel(oModel);
                    console.log('tests');
                    $.ajax({
                        url: `http://localhost:8000/books?title=${sQuery}`,
                        type: 'GET',
                        dataType: 'json'
                    })
                    .done((res) => {
                        console.log(res);
                        oModel.setData({1:res});
                    });
                }
            }
        });
    }
);

 //TODO: Make fragment for displaying image in fullscreen
 //TODO: Make fragment for displaying description in fullscreen
 //TODO: onclick row route info to create if on google books mode