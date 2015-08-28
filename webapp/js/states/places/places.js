import PlacesController from './places.controller'
import PlacesService from './places.service'
import template from './places.html!text'

export default angular.module('app.places', [])

  .controller('PlacesController', PlacesController)
  .service('PlacesService', PlacesService)

  .config(function ($stateProvider) {

    $stateProvider.state('layout.places', {
      cache: false,
      url: '/places',
      template: template
    })
  })

  .run(function ($templateCache) {
    'ngInject'

    $templateCache.put('template:places', template);
  });
