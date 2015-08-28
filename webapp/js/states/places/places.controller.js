class PlacesController {
  constructor(PlacesService, LocationService, $log) {

    this.places = [];
    let location = null;

    LocationService.startWatchPosition()
      .then((position)=> {
        $log.debug('position: ', position);
        location = position;
        return PlacesService.getPlaces();
      }, (error)=> {
        $log.debug('Error occurred during getting location: ', error);
      })
      .then((places)=> {
        for (let index in places) {
          places[index].distance = LocationService.getDistanceFromLocation(location[0], location[1], places[index].latitude, places[index].longitude);
        }
        this.places = places;
      }, (error)=> {
        $log.debug('Error occurred during getting people: ', error);
      });
  }
}

export default PlacesController
