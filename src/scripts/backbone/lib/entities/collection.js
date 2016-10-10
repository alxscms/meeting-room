import Backbone from "backbone";
import CalendarHelper from "../../entities/helpers/calendar";
import {CALENDAR_ID} from "../../../config/google/calendar";
import moment from "moment";

export default Backbone.Collection.extend({

  sync(method, model, options) {
    CalendarHelper.checkAuth(() => {
      var request = gapi.client.calendar.events.list({
        "calendarId": CALENDAR_ID || "primary",
        "timeMin": moment().hours(0).minutes(0).format(),
        "timeMax": moment().hours(23).minutes(59).format(),
        "showDeleted": false,
        "singleEvents": true,
        "orderBy": "startTime"
      });

      request.execute((resp) => {
        options.success(resp);
      });

      model.trigger('request', model, request, options);
      return request;
    });
  },

  parse(response) {
    return response.items;
  }

});