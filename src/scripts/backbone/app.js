import Backbone from "backbone";
import Marionette from "backbone.marionette";
import Layout from "./lib/components/layout/layout";

const App = Marionette.Application.extend({

  initialize(options) {
    this.environment = options.environment;
  },

  onBeforeStart() {
    this.layout = new Layout();
  },

  onStart() {
    Backbone.history.start();
  }

});

export default new App({
  environment: "dev"
});
