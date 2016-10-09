import Marionette from "backbone.marionette";
import app from "../../app";
import ListController from "./list/list_controller";

const MainRouter = Marionette.AppRouter.extend({

  appRoutes: {
    "": "list"
  }

});

const API = {

  list() {
    new ListController();
  }

};

app.on("before:start", function () {

  new MainRouter({
    controller: API
  });

});