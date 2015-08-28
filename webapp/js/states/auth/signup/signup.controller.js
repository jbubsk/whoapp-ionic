class SignupController {
  constructor($scope, AuthenticationService, $log) {
    'ngInject'

    this.AuthenticationService = AuthenticationService;
    this.authCtrl = $scope.$parent.$parent.$parent.authCtrl;

    this.$log = $log;
    this.model = {
      username: null,
      password: null
    }
  }

  doSignup() {
    this.AuthenticationService.signup(this.model).then(
      (result)=> {
        this.$log.debug('signed up successfully');
      },
      (error)=> {
        this.$log.debug('not signed up');
      }
    );
  }

  close() {
    this.authCtrl.closeSignup()
  }
}

export default SignupController
