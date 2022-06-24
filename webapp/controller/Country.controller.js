sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("com.sap.zcovid19dashboard.controller.Country", {
            onInit: function () { 
                this.fnGetCountryWise()
            },
            fnGetCountryWise: function () {
                var oThat = this;

                fetch("https://coronavirus-19-api.herokuapp.com/countries")
                    .then(response => response.json())
                    .then(result => {
                        var oCountryWiseModel = new JSONModel(result);
                        oThat.getView().setModel(oCountryWiseModel, "oCountryWiseModel");
                    })
            }
        })
})