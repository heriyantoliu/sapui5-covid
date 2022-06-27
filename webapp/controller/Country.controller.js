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
            onInit() {
                this.fnGetCountryWise()
            },
            async fnGetCountryWise() {
                const response = await fetch("https://coronavirus-19-api.herokuapp.com/countries")
                const result = await response.json()
                var oCountryWiseModel = new JSONModel(result);
                this.getView().setModel(oCountryWiseModel, "oCountryWiseModel");
            }
        })
    })