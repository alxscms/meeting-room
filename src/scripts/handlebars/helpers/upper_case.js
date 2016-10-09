import Handlebars from "hbsfy/runtime";

Handlebars.registerHelper("upperCase", function (string = "", options = {}) {
  return string.toUpperCase();
});
