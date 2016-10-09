import Handlebars from "hbsfy/runtime";
import moment from "moment";

Handlebars.registerHelper("presentDate", function (date, format, options) {
  const parsedDate = moment(date);
  return parsedDate.format(format);
});
