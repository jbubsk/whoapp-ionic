import config from '../settings/config';

class AuthenticationService {
  constructor($resource, $log, $q, $window) {
    this.resource = $resource;
    this.logger = $log;
    this.$q = $q;
    this.sessionStorage = $window.sessionStorage;
  }

  login(model) {
    var self = this;
    return self.resource(config.serviceUrl + '/auth/login', null, {
      login: {method: 'POST'}
    }).login(model).$promise.then(
      (data) => {
        self.sessionStorage.token = data.token;
        return data;
      },
      (error) => {
        delete self.sessionStorage.token;
        return self.$q.reject({errorCode: error.status});
      });
  }

  logout() {

    return this.resource(config.serviceUrl + '/auth/logout', null, {
      get: {method: 'GET'}
    }).get().$promise.then(
      (data) => {
        delete this.sessionStorage.token;
        this.logger.debug({
          info: 'Session is destroyed.',
          result: data.result
        });
      },
      () => {
        delete this.sessionStorage.token;
      }
    );
  }

  isAuthenticated() {
    return !!this.sessionStorage.token;
  }

  register() {

  }
}

export default AuthenticationService;
