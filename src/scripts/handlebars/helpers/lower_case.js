import Handlebars from "hbsfy/runtime";

Handlebars.registerHelper("lowerCase", function (string = "", options = {}) {
  return string.toLowerCase();
});
