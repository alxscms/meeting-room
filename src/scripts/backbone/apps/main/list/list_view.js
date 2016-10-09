import View from "../../../lib/views/view";
import CollectionView from "../../../lib/views/collection_view";

export const LayoutView = View.extend({

  template: require("./templates/layout.hbs"),

  regions: {
    timeRegion: ".time-region",
    nowRegion: ".now-region",
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

export const NowView = View.extend({

  className: "time",
  template: require("./templates/now.hbs")

});

export const NoEventView = View.extend({

  template: require("./templates/no_event.hbs")

});

export const EventView = View.extend({

  className: "event event-next",
  template: require("./templates/event.hbs")

});

export const EventCollectionView = CollectionView.extend({

  className: "events",
  childView: EventView,
  emptyView: NoEventView

});