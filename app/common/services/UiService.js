'use strict';

/**
 * @ngdoc service
 * @name agentUiApp.alert
 * @description
 * # alert
 * Factory in the agentUiApp.
 */
angular.module('agentUiApp')
  .factory('UiService', function ($timeout, $rootScope) {
    var previousTab;
    var currentTab;
    var currentTitle;
    var service = {
        add: add,
        closeAlert: closeAlert,
        closeAlertIdx: closeAlertIdx,
        clear: clear,
        get: get,
        setCurrentTab: setCurrentTab,
        currentTab: getCurrentTab,
        pageTitle: getPageTitle
      },
      alerts = [];

    return service;


    function setCurrentTab(tab, pageTitle) {
      previousTab = currentTab;
      currentTab = tab;
      currentTitle = pageTitle;
    };
    function getCurrentTab() {
      return currentTab;
    }

    function getPageTitle() {
      return currentTitle;
    }

    function add(type, msg, tout) {
      var that = this;
      tout = tout || 6000; //6 seconds
      type = type || 'success';
      $timeout(function () {
        closeAlert(that);
      }, tout);
      alerts.push({
        type: type,
        msg: msg,
        closeable: true,
        close: function () {
          return closeAlert(that);
        }
      });
      $rootScope.$broadcast("alert:notify", alerts);
    }

    function closeAlert(alert) {
      return closeAlertIdx(alerts.indexOf(alert));
    }

    function closeAlertIdx(index) {
      return alerts.splice(index, 1);
    }

    function clear() {
      alerts = [];
    }

    function get() {
      return alerts;
    }


    return {}
  });
