import View from "../../../lib/views/view";
import CollectionView from "../../../lib/views/collection_view";
import moment from "moment";

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
    const time = moment();
    return {time};
  },

  update() {
    this.render();
  },

  onRender() {
    console.log("TimeView:render");
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

  className: "event",
  template: require("./templates/event.hbs"),

  ui: {
    progressContainer: ".event-progress",
    progress: ".event-progress div"
  },

  onRender() {
    this.updateClass();
  },

  onDomRefresh() {
    this.updateProgress();
  },

  update() {
    console.log("EventView:update");
    this.updateClass();
    this.updateProgress();
  },

  updateClass() {
    // event-next / event-past
    if(this.model.isPast()) {
      this.$el.removeClass("event-next");
      this.$el.addClass("event-past");
    } else if (this.model.isHappeningNow()) {
      this.$el.removeClass("event-next");
      this.$el.removeClass("event-past");
    } else {
      this.$el.removeClass("event-past");
      this.$el.addClass("event-next");
    }
    // event-free
    if (this.model.get("free")) {
      this.$el.addClass("event-free");
    } else {
      this.$el.removeClass("event-free");
    }
  },

  updateProgress() {
    const maxHeight = this.getUI("progressContainer").height();
    const minHeight = this.getUI("progressContainer").width();
    const progress = this.model.getProgress();
    const height = minHeight + (maxHeight - minHeight) * progress;
    this.getUI("progress").css({
      height: height
    });
  }

});

export const EventCollectionView = CollectionView.extend({

  className: "events",
  childView: EventView,
  emptyView: NoEventView,

  update() {
    this.updateChildren()
    setTimeout(() => {
      this.collection.fetch({reset: true});
    }, 1000 * 2);
  },

  updateChildren() {
    for(let i = 0; i < this.children.length; i++) {
      this.children.findByIndex(i).update();
    }
  },

  onRender() {
    console.log("EventCollectionView:render");
  }

});