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
            onNavToGet: function () {
                this.getRouter().navTo("get");
            }
        });
    }
);
