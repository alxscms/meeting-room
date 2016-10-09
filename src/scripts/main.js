import "babel-polyfill";
import app from "./backbone/app";
import Backbone from "backbone";
import Marionette from "backbone.marionette";

//region Initialize Backbone & Marionette Inspectors

if (window.__backboneAgent) {
  window.__backboneAgent.handleBackbone(Backbone);
}

if (window.__agent) {
  window.__agent.start(Backbone, Marionette);
}
//endregion

require("./backbone/apps/main/main_app.js");

app.start();

/*

 window.next = function () {
 const $currentEvent = $(".event:not(.event-next,.event-past)");
 const $nextEvent = $(".event-next").first();
 $currentEvent.addClass("event-past");
 $nextEvent.removeClass("event-next");
 };

 // Your Client ID can be retrieved from your project in the Google
 // Developer Console, https://console.developers.google.com
 var CLIENT_ID = '318041293364-b2mdbi7onss1srf7t4tqgnqjkqp8vfjb.apps.googleusercontent.com';

 var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

 /!**
 * Check if current user has authorized this application.
 *!/
 function checkAuth() {
 gapi.auth.authorize({
 'client_id': CLIENT_ID,
 'scope': SCOPES.join(' '),
 'immediate': true
 }, handleAuthResult);
 }

 /!**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 *!/
 function handleAuthResult(authResult) {
 var authorizeDiv = document.getElementById('authorize-div');
 if (authResult && !authResult.error) {
 // Hide auth UI, then load client library.
 authorizeDiv.style.display = 'none';
 loadCalendarApi();
 } else {
 // Show auth UI, allowing the user to initiate authorization by
 // clicking authorize button.
 authorizeDiv.style.display = 'inline';
 }
 }

 /!**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 *!/
 function handleAuthClick(event) {
 gapi.auth.authorize(
 {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
 handleAuthResult);
 return false;
 }

 /!**
 * Load Google Calendar client library. List upcoming events
 * once client library is loaded.
 *!/
 function loadCalendarApi() {
 gapi.client.load('calendar', 'v3', listUpcomingEvents);
 }

 /!**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 *!/
 function listUpcomingEvents() {
 var request = gapi.client.calendar.events.list({
 'calendarId': 'primary',
 'timeMin': (new Date()).toISOString(),
 'showDeleted': false,
 'singleEvents': true,
 'maxResults': 10,
 'orderBy': 'startTime'
 });

 request.execute(function (resp) {
 var events = resp.items;
 appendPre('Upcoming events:');

 if (events.length > 0) {
 for (i = 0; i < events.length; i++) {
 var event = events[i];
 var when = event.start.dateTime;
 if (!when) {
 when = event.start.date;
 }
 appendPre(event.summary + ' (' + when + ')')
 }
 } else {
 appendPre('No upcoming events found.');
 }

 });
 }

 /!**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 *!/
 function appendPre(message) {
 var pre = document.getElementById('output');
 var textContent = document.createTextNode(message + '\n');
 pre.appendChild(textContent);
 }*/
