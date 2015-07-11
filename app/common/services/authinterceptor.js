'use strict';

/**
 * @ngdoc service
 * @name agentUiApp.AuthInterceptor
 * @description
 * # AuthInterceptor
 * Factory in the agentUiApp.
 */
angular.module('agentUiApp')
  .factory('AuthInterceptor', function ($rootScope, $q, AuthToken) {
    return {
      request: function (config) {
        var token = AuthToken.getToken();
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      },
      response: function (response) {
        if (response.status === 401) {
          //TODO : log meta info of 401 url , headers , params
        }
        return response || $q.when(response);
      }
    };
  });
