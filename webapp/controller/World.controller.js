sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], 
/**
* @param {typeof sap.ui.core.mvc.Controller} Controller
*/
function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("com.sap.zcovid19dashboard.controller.World", {
        onInit: function () {
            this.fnCovidReport()
        },
        fnCovidReport: function () {
            var oThat = this;
            fetch("https://coronavirus-19-api.herokuapp.com/all")
                .then(response => response.json())
                .then(result => {
                    var obj = {
                        ... result,                            
                        "cases1": Math.abs(Number(result.cases)) / 1.0e+6,
                        "deaths1": Math.abs(Number(result.deaths)) / 1.0e+6,
                        "recovered1": Math.abs(Number(result.recovered)) / 1.0e+6,
                    }
                    var oCovidReportModel = new JSONModel(obj);
                    oThat.getView().setModel(oCovidReportModel, "oCovidReportModel");
                })
            }
    })
});