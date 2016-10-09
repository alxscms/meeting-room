import Handlebars from "hbsfy/runtime";

Handlebars.registerHelper("sentenceCase", function (string = "", options = {}) {
  return string.replace(/\w[^.!?]*/g, function (sentence) {
    return sentence.charAt(0).toUpperCase() + sentence.substr(1);
  });
});
