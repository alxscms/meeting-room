import View from "../../../lib/views/view";

export const LayoutView = View.extend({

  template: require("./templates/layout.hbs"),

  regions: {
    timeRegion: ".time-region",
    eventsRegion: ".events-region"
  }

});

export const TimeView = View.extend({

  className: "time",
  template: require("./templates/time.hbs"),

  serializeData() {
    const time = "16:54";
    return {time};
  }

});

export const EventView = View.extend({

  className: "event",
  template: require("./templates/event.hbs")

});