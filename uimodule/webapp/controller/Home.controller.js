sap.ui.define(
    ["./BaseController"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        
        return Controller.extend("lib.app.libAPI.controller.Home", {
            onInit: function () {
                
            },
            onNavToCreate: function () {
                this.getRouter().navTo("create");
            },
            onNavToGet: function () {
                this.getRouter().navTo("get");
            },
            onNavToPut: function () {
                this.getRouter().navTo("put");
            },
            onNavToDelete: function () {
                this.getRouter().navTo("delete");
            }
        });
    }
);
