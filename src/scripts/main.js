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

window.onload = function () {
  app.start();
};
