sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("com.sap.zcovid19dashboard.controller.Graph", {
            onInit() {
                this.fnGetCountryWise()
                var oVizFrame = this.getView().byId("idVizFrame");
                oVizFrame.setVizProperties({
                    plotArea: {
                        dataLabel: {
                            visible: true
                        }
                    },
                    valueAxis: {
                        title: {
                            visible: false
                        }
                    },
                    title: {
                        visible: true,
                        text: 'Covid-19 Total Cases vs Recovered'
                    }
                })
            },
            async fnGetCountryWise() {
                var response = await fetch("https://coronavirus-19-api.herokuapp.com/countries")
                var result = await response.json()
                var oCountryWiseModel = new JSONModel(result);
                this.getView().setModel(oCountryWiseModel, "oCountryWiseModel");
            }
        })
    })