sap.ui.define(
    ["./BaseController"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        
        return Controller.extend("lib.app.libAPI.controller.Get", {
            onInit: function () {
                const oTable = this.getView().byId("bookshelf");
                const oModel = new sap.ui.model.json.JSONModel();
                oTable.setModel(oModel);

                $.ajax({
                    url: "http://localhost:8000/books",
                    type: 'GET',
                    dataType: 'json'
                })
                .done((res) => {
                    console.log(res);
                    oModel.setData(res);
                });
                
            },
        });
    }
);
