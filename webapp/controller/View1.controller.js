sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("com.sap.zcovid19dashboard.controller.View1", {
            onInit: function () {
                this.fnCovidReport();
                this.fnGetCountryWise();

                var oVizFrame = this.getView().byId("idVizFrame");
                oVizFrame.setVizProperties({
                    plotArea:{
                        dataLabel:{
                            visible:true
                        }
                    },
                    valueAxis:{
                        title:{
                            visible: false
                        }
                    },
                    title: {
                        visible:true,
                        text:'Covid-19 Total Cases vs Recovered'
                    }
                })
            },

            fnCovidReport: function() {
                var oThat = this;
                $.ajax({
                    type: "GET",
                    url: "https://coronavirus-19-api.herokuapp.com/all",
                    datatype: "json",
                    success: function(result){
                        var obj = {
                            "cases": result.cases,
                            "deaths": result.deaths,
                            "recovered": result.recovered,
                            "cases1": Math.abs(Number(result.cases)) / 1.0e+6,
                            "deaths1": Math.abs(Number(result.deaths)) / 1.0e+6,
                            "recovered1": Math.abs(Number(result.recovered)) / 1.0e+6,
                        }
                        var oCovidReportModel = new JSONModel(obj);
                        oThat.getView().setModel(oCovidReportModel, "oCovidReportModel");
                                            
                    }
                })
            },

            fnGetCountryWise: function() {
                var oThat = this;
                $.ajax({
                    type: "GET",
                    url: "https://coronavirus-19-api.herokuapp.com/countries",
                    datatype: "json",
                    success: function(result){                        
                        var oCountryWiseModel = new JSONModel(result);
                        oThat.getView().setModel(oCountryWiseModel, "oCountryWiseModel");                                            
                    }
                })
            }
        });
    });
