class PeopleController {
  constructor(PeopleService, LocationService, $log) {

    this.people = [];

    let location = null;
    LocationService.startWatchPosition()
      .then((position)=> {
        $log.debug('position: ', position);
        location = position;
        return PeopleService.getPeople();
      }, (error)=> {
        $log.debug('Error occurred during getting location: ', error);
      })
      .then((people)=> {
        for (let index in people) {
          people[index].distance = LocationService.getDistanceFromLocation(location[0], location[1], people[index].latitude, people[index].longitude);
        }
        this.people = people;
      }, (error)=> {
        $log.debug('Error occurred during getting people: ', error);
      });
  }
}

export default PeopleController
