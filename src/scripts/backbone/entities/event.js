import Model from "../lib/entities/model";
import Collection from "../lib/entities/collection";

export const Event = Model.extend({});

export const EventCollection = Collection.extend({

  model: Event

});

class EventProvider {

  getUpcomingEvents() {
    const events = new EventCollection();
    events.fetch();
    return events;
  }

}

export default new EventProvider();
