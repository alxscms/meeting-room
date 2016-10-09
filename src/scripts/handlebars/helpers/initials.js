import Handlebars from "hbsfy/runtime";

Handlebars.registerHelper("initials", function (str) {
  if (str) {
    return str.split(/[\s-]/).map(function (s) {
      return s.charAt(0);
    }).join("").toUpperCase();
  }
  return "N/A";
});
