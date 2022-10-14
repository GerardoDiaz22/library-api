sap.ui.define(
    ["./BaseController"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        
        return Controller.extend("lib.app.libAPI.controller.MainView", {
            onInit: function () {
                const oTable = this.getView().byId("bookshelf");
                const oModel = new sap.ui.model.json.JSONModel();

                //const books = database.getBooks;
                
                oTable.setModel(oModel);
                //oModel.setData(books);
            },
        });
    }
);
