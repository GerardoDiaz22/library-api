sap.ui.define([
    "./BaseController",
    "sap/m/MessageToast"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";
        
        return Controller.extend("lib.app.libAPI.controller.Create", {
            onInit: function () {
                
            },
            onCreatePress: function () {
                const title = this.getView().byId("bookTitle").getValue();
                const subtitle = this.getView().byId("bookSubtitle").getValue();
                const authors = this.getView().byId("bookAuthors").getValue();
                const editors = this.getView().byId("bookEditors").getValue();
                const category = this.getView().byId("bookCategory").getValue();
                const imagePath = this.getView().byId("bookImage").getValue();
                const description = this.getView().byId("bookDescription").getValue();
                
                let publishDate = this.getView().byId("bookPublishDate").getValue();
                publishDate = (publishDate == '') ? '1000-10-10' : publishDate;
                
                $.ajax({
                    url: "http://localhost:8000/books",
                    method: 'POST',
                    data: {
                        "title": title,
                        "source": "internal DB",
                        "subtitle": subtitle,
                        "authors": authors,
                        "editors": editors,
                        "category": category,
                        "publish_date": publishDate,
                        "image_path": imagePath,
                        "description": description
                    }
                })
                .done((res) => {
                    MessageToast.show(res);
                });
            }
        });
    }
);
