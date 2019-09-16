(function () {

  //Create a custom renderer
  this.copilotLocalRenderer = {

    addHeaderEndItem: function (controlType, oControlProperties, bIsVisible, bCurrentState, aStates) {
      var oButton = new sap.m.Button(oControlProperties);
      oButton.placeAt("copilotToolbar");
    },

    setFloatingContainerContent: function (control) {
      jQuery("#copilotContainer").draggable();
      control.placeAt("copilotContainer");
    },

    setFloatingContainerVisibility: function (boolean) {
      if (boolean) {
        jQuery("#copilotContainer").show();
      } else {
        jQuery("#copilotContainer").hide();
      }
    },

    getFloatingContainerVisibility: function () {
      return jQuery("#copilotContainer").filter(":visible").length > 0;
    },

    getFloatingContainerState: function () {
      //Not supported
      return "none";
    },

    setFloatingContainerDragSelector: function (sClass) {
      //not needed as the container is made draggable in setFloatingContainerContent()
    }

  };

  //Create Platform services
  this.copilotPlatformServices = {

    addCopilotButton: function (tooltip, text, icon, id, pressHandler) {
      return window.copilotLocalRenderer.addHeaderEndItem(
        "sap.ushell.ui.shell.ShellHeadItem", {
          tooltip: tooltip,
          text: text,
          icon: icon,
          id: id,
          press: pressHandler
        },
        true,
        false);
    },

    setCopilotContainerContent: function (control) {
      window.copilotLocalRenderer.setFloatingContainerContent(control);
    },

    setCopilotContainerClass: function (sClass) {
      if (jQuery("#copilotContainer")) {
        jQuery("#copilotContainer").addClass(sClass);
      }
    },

    setCopilotContainerVisibility: function (bVisible) {
      window.copilotLocalRenderer.setFloatingContainerVisibility(bVisible);
    },

    getCopilotContainerVisibility: function () {
      return window.copilotLocalRenderer.getFloatingContainerVisibility();
    },

    getCopilotContainerDockingState: function () {
      return window.copilotLocalRenderer.getFloatingContainerState();
    },

    setCopilotContainerDragSelector: function (sClass) {
      window.copilotLocalRenderer.setFloatingContainerDragSelector(".copilotDragableHandle");
    },

    getCurrentUserInfo: function () {
      var user = {
        getId: function () {
          return "INTEGRATION_USER";
        },
        getFirstName: function () {
          return "Integration";
        },
        getLastName: function () {
          return "Meta-User";
        },
        getEmail: function () {
          return "integration_user@platformx.com";
        },
        getLanguage: function () {
          return "EN";
        }
      };
      return user;
    },

    getSourceSystemID: function () {
      return "__DEFAULT_SYSTEM__";
    },

    /*
    getAppLifeCycleService: function () {
      //not supported
      return null;
    },
    */

    getCurrentApplicationMetadata: function () {
      var appDescriptor = {};
      appDescriptor.title = jQuery("title") ? jQuery("title").text() : "";
      return appDescriptor;
    },

    navigateTo : function (oContext){

    },

    /*
    getShellNavigationService: function () {
      return null;
    },
    */

    /*
    getURLParsingService: function () {
      return null;
    },
    */

    /*
    getCrossApplicationNavigation: function () {
      return {
        getLinks: function (vArgs) {
          // Not supported
          var defer = jQuery.Deferred();
          defer.resolve([]);
          return defer;
        },
        getSemanticObjectLinks: function(sSemanticObject, mParameters, bIgnoreFormFactor, oComponent, sAppStateKey, bCompactIntents) {
          // Not supported
          return null;
        },
        hrefForExternal: function(oArgs, oComponent, bAsync) {
          if (!oArgs) {
            return  window.location.hash;
          }
          return null;
        },
        toExternal: function(oArgs, oComponent) {
          if (oArgs && oArgs.target && oArgs.target.shellHash) {
            window.location.hash = oArgs.target.shellHash;
          } else if (oArgs && oArgs.target && oArgs.target.semanticObject) {
            var sHashTag = "#" + oArgs.target.semanticObject;
            if (oArgs.target.action) {
              sHashTag = sHashTag + "-" + oArgs.target.action;
            }
            window.location.hash = sHashTag;
          }
        },
        createComponentInstance: function() {
          // Not supported
          var defer = jQuery.Deferred();
          defer.reject("No code to create the component instance");
          return defer;
        },
        isIntentSupported: function(aIntents, oComponent) {
          // Not supported
          var defer = jQuery.Deferred();
          var oAnswers = {};
          if (oIntents && jQuery.isArray(oIntents)) {
            // Default to false since no code to create the Component.
            jQuery.each(oIntents, function(i, oIntentItem) {
              oAnswers[oIntentItem] = { "supported": false };
            });
            defer.resolve(oAnswers);
          } else {
            defer.reject("Invalid Intent");
          }
          return defer;
        },
        isNavigationSupported: function(oIntents, oComponent) {
          var defer = jQuery.Deferred();
          var oAnswers = [];
          // Default to true for now, no way to determine if the url is valid
          if (oIntents && jQuery.isArray(oIntents)) {
            jQuery.each(oIntents, function(i, oIntentItem) {
              oAnswers.push({ "supported": true });
            });
          } else if (oIntents) {
            oAnswers.push({ "supported": true });
          }
          defer.resolve(oAnswers);
          return defer;
        }
      };
    },
    */

    getUserDefinedDefaultValue: function (sParameterName, fSuccessCallBack) {
      // Not supported
      fSuccessCallBack(null);
    },

    /*
    getSearchModel: function () {
      // Not supported
      throw "Search Model Not supported";
    },
    getSearchModelClass: function () {
      // Not supported
      throw "Search Model Not supported";
    },
    */

    createSupportContext: function (fncSuccessCallBack) {
      //not supported
      fncSuccessCallBack(null);
    }
  };

}());