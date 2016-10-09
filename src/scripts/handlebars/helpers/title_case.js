import Handlebars from "hbsfy/runtime";

Handlebars.registerHelper("titleCase", function (string = "", options = {}) {
  return string.replace(/\w[^\r\n\t\f -]*/g, function (word) {
    return word.charAt(0).toUpperCase() + word.substr(1);
  });
});
