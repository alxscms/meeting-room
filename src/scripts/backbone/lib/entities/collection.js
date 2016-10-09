import Backbone from "backbone";
import CalendarHelper from "../../entities/helpers/calendar";
import {CALENDAR_ID} from "../../../config/google/calendar";

export default Backbone.Collection.extend({

  sync(method, model, options) {
    CalendarHelper.checkAuth(() => {
      var request = gapi.client.calendar.events.list({
        "calendarId": CALENDAR_ID || "primary",
        "timeMin": (new Date()).toISOString(),
        "showDeleted": false,
        "singleEvents": true,
        "maxResults": 10,
        "orderBy": "startTime"
      });

      request.execute((resp) => {
        options.success(resp);
      });

      model.trigger('request', model, request, options);
      return request;
    });
  },

  parse(resp, options) {
    return resp.items;
  }

});