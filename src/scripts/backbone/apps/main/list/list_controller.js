import Marionette from "backbone.marionette";
import {LayoutView, TimeView, NowView, EventCollectionView} from "./list_view";
import EventProvider from "../../../entities/event";
import app from "../../../app";

export default Marionette.Object.extend({

  initialize() {
    this.layout = new LayoutView();
    app.layout.showChildView("appRegion", this.layout);

    const eventCollection = EventProvider.getUpcomingEvents();

    this.timeRegion();
    this.nowRegion();
    this.eventsRegion(eventCollection);

    // this.startUpdater();
  },

  timeRegion() {
    this.timeView = new TimeView();
    this.layout.showChildView("timeRegion", this.timeView);
  },

  nowRegion() {
    this.nowView = new NowView();
    this.layout.showChildView("nowRegion", this.nowView);
  },

  eventsRegion(collection) {
    this.eventCollectionView = new EventCollectionView({collection});
    this.layout.showChildView("eventsRegion", this.eventCollectionView);
  },

  startUpdater() {
    setInterval(() => {
      this.updateViews()
    }, 1000 * 10);
  },

  updateViews() {
    this.timeView.update();
    this.eventCollectionView.update();
  }

});
