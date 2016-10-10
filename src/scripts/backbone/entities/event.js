import Model from "../lib/entities/model";
import Collection from "../lib/entities/collection";
import moment from "moment";

export const Event = Model.extend({

  isPast() {
    const end = this.get("end").dateTime;
    return moment().isAfter(end);
  },

  isHappeningNow() {
    const start = this.get("start").dateTime;
    const end = this.get("end").dateTime;
    return moment().isBetween(start, end);
  },

  getProgress() {
    if(this.isHappeningNow()) {
      const start = moment(this.get("start").dateTime).unix();
      const end = moment(this.get("end").dateTime).unix();
      const now = moment().unix();
      return (now - start) / (end - start);
    } else if(this.isPast()) {
      return 1;
    } else {
      return 0;
    }
  }

});

export const EventCollection = Collection.extend({

  model: Event,

  parse(response) {
    response = Collection.prototype.parse.call(this, response);
    const events = [];

    for(const i in response) {
      const event = response[i];
      if(i == 0) {
        if(moment().isBefore(event.start.dateTime)) {
          events.push(this.createFreeEvent(moment().format(), event.start.dateTime));
        }
      } else {
        const previousEvent = response[i - 1];
        if(moment(previousEvent.end.dateTime).isBefore(event.start.dateTime)) {
          events.push(this.createFreeEvent(previousEvent.end.dateTime, event.start.dateTime));
        }
      }
      events.push(event);
    }

    return events;
  },

  createFreeEvent(start, end) {
    return {
      summary: "Salle libre",
      start: {
        dateTime: start
      },
      end: {
        dateTime: end
      },
      free: true
    };
  }

});

class EventProvider {

  static getUpcomingEvents() {
    const events = new EventCollection();
    events.fetch();
    return events;
  }

}

export default EventProvider;
