import Handlebars from "hbsfy/runtime";
import moment from "moment";

export default function presentFullDate(date, options) {
  const parsedDate = moment(date);
  return parsedDate.format("Do MMM YYYY à HH:mm");
}

Handlebars.registerHelper("presentFullDate", presentFullDate);
