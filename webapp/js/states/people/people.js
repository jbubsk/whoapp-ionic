import PeopleController from './people.controller'
import PeopleService from './people.service'
import template from './people.html!text'

export default angular.module('app.people', [])

  .controller('PeopleController', PeopleController)
  .service('PeopleService', PeopleService)

  //.config(function ($stateProvider) {
  //
  //  $stateProvider.state('layout.people', {
  //    cache: false,
  //    url: '/people',
  //    template: template
  //  });
  //})

  .run(function ($templateCache) {
    $templateCache.put('template:people', template);
  });
