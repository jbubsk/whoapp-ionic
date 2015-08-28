import config from '../../core/settings/config'

class PeopleService {
  constructor($resource) {
    this.service = $resource(config.serviceUrl + '/api/users', null)
  }

  getPeople() {
    return this.service.get().$promise.then((data)=> {
        return data.result;
      }
    );
  }
}
export default PeopleService
