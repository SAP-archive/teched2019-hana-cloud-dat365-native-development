sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter"
], function (MessageToast, Controller, JSONModel, Filter) {
	"use strict";

	return Controller.extend("teched.dat365.ui.controller.View1", {
		onInit: function () {
			var oView = this.getView();
			this.oSF = oView.byId("searchField");

			try {
				var aUrl = "./catalog/User";
				var userData = jQuery.ajax({
					url: aUrl,
					method: "GET",
					dataType: "json",
					async: false
				}).responseJSON;
				var initials = userData.value[0].givenName[0] + userData.value[0].familyName[0];
				var config = this.getOwnerComponent().getModel("config"); //this.getModel("config");
				config.setProperty("/UserName", initials);
				config.setProperty("/id", userData.value[0].id);
				config.setProperty("/givenName", userData.value[0].givenName);
				config.setProperty("/familyName", userData.value[0].familyName);
				config.setProperty("/email", userData.value[0].email);	
				config.setProperty("/locale", userData.value[0].locale);				
				config.setProperty("/fullName", userData.value[0].givenName + userData.value[0].familyName);				
			} catch (exp) {
				/* Do nothing, wrapping with try/catch so that if for some reason copilot resources doesn't load
				   this will atleast let the user use the rest of the application gracefully. */
			}
		},
		handlerSearchFieldSearch: function (oEvent) {},
		handlerSearchFieldLiveEvent: function (oEvent) {},
		handlerSearchSuggestEvent: function (oEvent) {
			this.oSF.getBinding("suggestionItems");
			this.oSF.suggest();
		},

		_initializeChatbotSupport: function () {
			$.sap.registerModulePath("sap.cp.ui", "/copilot/ui");
			try {
				$.sap.require("sap.cp.ui.copilot-bootstrap");
				jQuery.sap.require("sap.cp.ui.services.DigitalAssistant");
				sap.cp.ui.services.DigitalAssistant.askCoPilot("Test");
			} catch (exp) {
				/* Do nothing, wrapping with try/catch so that if for some reason copilot resources doesn't load
				   this will atleast let the user use the rest of the application gracefully. */
			}
		},

		onAvatar: function (oEvent) {
			this.createPopover();
			this._oQuickView.setModel(this.getOwnerComponent().getModel("config"));
			// delay because addDependent will do a async rerendering and the actionSheet will immediately close without it.
			var oButton = oEvent.getSource();
			jQuery.sap.delayedCall(0, this, function () {
				this._oQuickView.openBy(oButton);
			});
		},

		createPopover: function () {
			if (this._oQuickView) {
				this._oQuickView.destroy();
			}

			this._oQuickView = sap.ui.xmlfragment("teched.dat365.ui.view.QuickView", this);
			this.getView().addDependent(this._oQuickView);
		},

		onExit: function () {
			if (this._oQuickView) {
				this._oQuickView.destroy();
			}
		}
	});
});