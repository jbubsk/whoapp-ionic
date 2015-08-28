import template from './auth.html!text'
import AuthController from './auth.controller'
import LoginController from './login/login.controller'
import SignupController from './signup/signup.controller'

export default angular.module('app.auth', [])

  .controller('AuthController', AuthController)
  .controller('LoginController', LoginController)
  .controller('SignupController', SignupController)

  .config(function ($stateProvider) {
    'ngInject'

    $stateProvider.state('auth', {
      url: '/auth',
      template: template
    });

  }
)
