import Handlebars from "hbsfy/runtime";

Handlebars.registerHelper("lineBreaks", function (str) {
  if (str) {
    return str.replace(/\n/g, "<br>");
  }
  return "";
});
