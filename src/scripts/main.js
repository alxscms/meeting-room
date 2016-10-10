import "babel-polyfill";
import app from "./backbone/app";
import Backbone from "backbone";
import Marionette from "backbone.marionette";

import $ from "jquery";

//region Initialize Backbone & Marionette Inspectors

if (window.__backboneAgent) {
  window.__backboneAgent.handleBackbone(Backbone);
}

if (window.__agent) {
  window.__agent.start(Backbone, Marionette);
}
//endregion

// handlebar helpers
require("./handlebars/helpers/sentence_case");
require("./handlebars/helpers/presenters/present_time");

// apps
require("./backbone/apps/main/main_app");

window.onload = function () {
  app.start();
};

window.next = function () {
    const $currentEvent = $(".event:not(.event-next,.event-past)");
    const $nextEvent = $(".event-next").first();
    $currentEvent.addClass("event-past");
    $nextEvent.removeClass("event-next");
};