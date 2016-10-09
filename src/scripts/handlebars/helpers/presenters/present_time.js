import Handlebars from "hbsfy/runtime";
import moment from "moment";

export default function presentTime(date, options) {
  const parsedDate = moment(date);
  return parsedDate.format("HH:mm");
}

Handlebars.registerHelper("presentTime", presentTime);
