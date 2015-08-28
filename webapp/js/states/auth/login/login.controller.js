class LoginController {
  constructor($scope, $state, AuthenticationService, $log) {
    'ngInject'

    this.AuthenticationService = AuthenticationService;
    this.authCtrl = $scope.$parent.$parent.$parent.authCtrl;

    this.$state = $state;
    this.$log = $log;
    this.model = {
      username: null,
      password: null
    }
  }

  doLogin() {
    this.AuthenticationService.login(this.model).then(
      (result)=> {
        this.close();
        this.$state.go('layout');
      },
      (error)=> {
        this.$log.debug('not logged');
      }
    );
  }

  close() {
    this.authCtrl.closeLogin()
  }
}

export default LoginController
