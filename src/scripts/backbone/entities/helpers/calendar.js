import {CLIENT_ID, SCOPES} from "../../../config/google/calendar";

class CalendarHelper {

  checkAuth(callback) {
    gapi.auth.authorize({
      "client_id": CLIENT_ID,
      "scope": SCOPES.join(" "),
      "immediate": true
    }, (authResult) => { this._handleAuthResult(authResult, callback); });
  }

  _handleAuthResult(authResult, callback) {
    if (authResult && !authResult.error) {
      // if we are authorized we call our callback
      this._loadCalendarApi(callback);
    } else {
      // we ask authorization
      gapi.auth.authorize({
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: false
      }, (authResult) => { this._handleAuthResult(authResult, callback); });
    }
  }

  _loadCalendarApi(callback) {
    gapi.client.load("calendar", "v3", () => { callback(); });
  }
}

export default new CalendarHelper();