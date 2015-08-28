import template from './layout.html!text'
import LayoutController from './layout.controller'

export default angular.module('app.layout', [])

  .controller('LayoutController', LayoutController)

  .config(function ($stateProvider) {
    'ngInject'

    $stateProvider.state('layout', {
        url: '/layout',
        template: template
      }
    )
  });
