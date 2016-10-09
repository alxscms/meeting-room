import Marionette from "backbone.marionette";
import {LayoutView, TimeView, NowView} from "./list_view";
import {CLIENT_ID, SCOPES, CALENDAR_ID} from "../../../../config/google/config";
import app from "../../../app";

export default Marionette.Object.extend({

  initialize() {
    this.layout = new LayoutView();
    app.layout.showChildView("appRegion", this.layout);

    this.checkAuth();

    this.timeRegion();
    // this.nowRegion();
    // this.eventsRegion();
  },

  timeRegion() {
    this.timeView = new TimeView();
    this.layout.showChildView("timeRegion", this.timeView);
  },

  nowRegion() {
    this.nowView = new NowView();
    this.layout.showChildView("nowRegion", this.nowView);
  },

  eventsRegion() {
    // this.layout.showChildView("eventsRegion", this.toolbarView);
  },

  checkAuth() {
    gapi.auth.authorize({
      "client_id": CLIENT_ID,
      "scope": SCOPES.join(" "),
      "immediate": true
    }, (authResult) => { this.handleAuthResult(authResult); });
  },

  handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
      // if we are authorized
      this.loadCalendarApi();
    } else {
      // we ask authorization
      gapi.auth.authorize({
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: false
      }, (authResult) => { this.handleAuthResult(authResult); });
    }
  },

  loadCalendarApi() {
    gapi.client.load("calendar", "v3", () => { this.listUpcomingEvents(); });
  },

  listUpcomingEvents() {
    var request = gapi.client.calendar.events.list({
      "calendarId": CALENDAR_ID || "primary",
      "timeMin": (new Date()).toISOString(),
      "showDeleted": false,
      "singleEvents": true,
      "maxResults": 10,
      "orderBy": "startTime"
    });

    request.execute(function (resp) {
      console.log("Response :", resp);
    });
  }

});
