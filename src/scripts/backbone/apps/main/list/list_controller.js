import Marionette from "backbone.marionette";
import {LayoutView, TimeView} from "./list_view";
import app from "../../../app";

export default Marionette.Object.extend({

  initialize() {
    this.layout = new LayoutView();
    app.layout.showChildView("appRegion", this.layout);

    this.timeRegion();
    this.eventsRegion();
  },

  timeRegion() {
    this.timeView = new TimeView();
    this.layout.showChildView("timeRegion", this.timeView);
  },

  eventsRegion() {
    // this.layout.showChildView("eventsRegion", this.toolbarView);
  }

});
