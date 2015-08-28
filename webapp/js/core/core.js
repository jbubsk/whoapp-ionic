import AuthenticationService from './services/authentication.service'
import LocationService from './services/location.service'

export default angular.module('app.core', [])
  .service('AuthenticationService', AuthenticationService)
  .service('LocationService', LocationService);
