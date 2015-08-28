import 'ionic'
import 'jquery'
import 'angular-resource'

import layoutModule from './states/layout/layout';
import authModule from './states/auth/auth';
import peopleModule from './states/people/people';
import placesModule from './states/places/places';
import coreModule from './core/core';
import interceptors from './core/interceptors';

var application = angular.module('application', [
  'ionic',
  'ngResource',
  'ui.router',
  layoutModule.name,
  coreModule.name,
  authModule.name,
  peopleModule.name,
  placesModule.name
])

  .run(function ($ionicPlatform, $state, $rootScope, AuthenticationService) {

    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });

    $rootScope.defaultState = 'layout';
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      $rootScope.toState = toState;
      if (AuthenticationService.isAuthenticated()) {
        if (toState.name.indexOf('auth') > -1) {
          $state.go($rootScope.defaultState);
          event.preventDefault();
        }
      }
      else if (toState.name.indexOf('auth') < 0) {
        $state.go('auth');
        event.preventDefault();
      }
    });
  })

  .config(function ($urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/layout');
    $httpProvider.interceptors.push(interceptors);
  });

angular.element(document.body).ready(function () {
  angular.bootstrap(document.body, [application.name]);
});
