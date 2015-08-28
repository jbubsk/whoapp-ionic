import loginTemplate from './login/login.html!text'
import signupTemplate from './signup/signup.html!text'

class AuthController {
  constructor($ionicModal, $scope, $log) {
    'ngInject'

    this.$log = $log;

    this.modalLogin = $ionicModal.fromTemplate(loginTemplate, {
      scope: $scope
    });
    this.modalSignup = $ionicModal.fromTemplate(signupTemplate, {
      scope: $scope
    });
  }

  login() {
    this.modalLogin.show();
  }

  signup() {
    this.modalSignup.show();
  }

  closeLogin() {
    this.modalLogin.hide();
  }

  closeSignup() {
    this.modalSignup.hide();
  }
}

export default AuthController
