sap.ui.define([
    "./BaseController",
    "sap/m/MessageToast"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";
        
        return Controller.extend("lib.app.libAPI.controller.Delete", {
            onInit: function () {
                
            },
            onDeletePress: function () {
                const bookID = this.getView().byId("bookID").getValue();

                $.ajax({
                    url: `http://localhost:8000/books/${bookID}`,
                    method: 'DELETE'
                })
                .done((res) => {
                    MessageToast.show(res);
                });
            }
        });
    }
);
