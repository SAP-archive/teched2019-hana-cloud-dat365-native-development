sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/m/HBox",
	"sap/ui/core/mvc/View", 
	"sap/ui/core/mvc/ViewType",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/odata/v4/ODataModel",
	"sap/ui/test/TestUtils",
	"teched/dat365/ui/model/models"
], function (UIComponent, Device, HBox, View, ViewType, JSONModel, ODataModel, TestUtils, models) {
	"use strict";

	return UIComponent.extend("teched.dat365.ui.Component", {
        metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		},
		
		createContent: function () {
			var bHasOwnProxy = false, //= this.proxy !== false,
				oLayout = new HBox({
					renderType: "Bare"
				}),
				oMetaModel,
				oModel = this.getModel(),
				fnProxy = bHasOwnProxy ? this.proxy : TestUtils.proxy,
				bRealOData = TestUtils.isRealOData(),
				sServiceUrl = fnProxy(oModel.sServiceUrl);

			if (oModel.sServiceUrl !== sServiceUrl) {
				//replace model from manifest in case of proxy
				oMetaModel = oModel.getMetaModel();
				oModel.destroy();
				oModel = new ODataModel({
					annotationURI: oMetaModel.aAnnotationUris,
					serviceUrl: sServiceUrl,
					synchronizationMode: "None"
				});
				this.setModel(oModel);
			}
			oMetaModel = oModel.getMetaModel();
			oMetaModel.setDefaultBindingMode("OneWay");

			View.create({
				async: true,
				bindingContexts: {
					undefined: oModel.createBindingContext("/Foods")
				},
				models: {
					// Note: XML Templating creates bindings to default model only!
					undefined: oModel,
					metaModel: oMetaModel,
					ui: new JSONModel({
						bRealOData: bRealOData,
						icon: bRealOData ? "sap-icon://building" : "sap-icon://record",
						iconTooltip: bRealOData ? "real OData service" : "mock OData service"
					})
				},
				preprocessors: {
					xml: {
						bindingContexts: {
							data: oModel.createBindingContext("/Foods")
						},
						models: {
							data: oModel,
							meta: oMetaModel
						}
					}
				},
				type: ViewType.XML,
				viewName: "teched.dat365.ui.view.View1"
			}).then(function (oView) {
				oLayout.addItem(oView);
			});

			return oLayout;
		}
	});
});