import config from '../../core/settings/config';

class PlacesService {
  constructor($resource, $q) {
    this.$q = $q;
    this.service = $resource(config.serviceUrl + '/api/places', null);
  }

  getPlaces() {
    return this.service.get().$promise.then((data)=> {
      return data.result;
    });
  }
}

export default PlacesService
