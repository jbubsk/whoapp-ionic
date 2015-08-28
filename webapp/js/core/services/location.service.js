class LocationService {

  constructor($resource, $q) {

    this.location = $q.defer();
    this.$q = $q;
    this.service = $resource('/location', null, {
      post: {method: 'post'}
    });
    this.posOptions = {maximumAge: 10000, timeout: 5000, enableHighAccuracy: true};
  }

  startWatchPosition() {
    navigator.geolocation.watchPosition(
      (position)=> {
        this.location.resolve([position.coords.latitude, position.coords.longitude]);
      },
      (err)=> {
        this.location.reject(err);
      },
      this.posOptions
    );
    return this.location.promise;
  }

  getDistanceFromLocation(lat1, lon1, lat2, lon2) {
    function deg2rad(deg) {
      return deg * (Math.PI / 180)
    }

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    if (d > 1) {
      d = d.toFixed(2) + ' km';
    } else {
      // Distance in m
      d = (d * 1000).toFixed(0) + ' m';
    }
    return d;
  }

  shareGeolocation(data) {
    this.service.post(data).$promise.then(
      (data)=> {

      },
      (error)=> {

      });
  }

  clearWatch(watch) {
    navigator.geolocation.clearWatch(watch);
  }
}

export default LocationService

/*
 * Range of allowed values can be evaluated as rectangle:
 *  for latitude 0.01 ~ 1.11km
 *  for longitude 0.01 ~ 689m
 *
 * */
