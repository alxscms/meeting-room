import Handlebars from "hbsfy/runtime";

Handlebars.registerHelper("compare", function (lvalue, operator, rvalue, options) {

  var operators, result;

  if (arguments.length < 3) {
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
  }

  if (options === undefined) {
    options = rvalue;
    rvalue = operator;
    operator = "===";
  }

  operators = {
    "==": (l, r) => l == r,
    "===": (l, r) => l === r,
    "!=": (l, r) => l != r,
    "!==": (l, r) => l !== r,
    "<": (l, r) => l < r,
    ">": (l, r) => l > r,
    "<=": (l, r) => l <= r,
    ">=": (l, r) => l >= r,
    "typeof": (l, r) => typeof l == r
  };

  if (!operators[operator]) {
    throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
  }

  result = operators[operator](lvalue, rvalue);

  if (result) {
    return options.fn(this);
  }
  return options.inverse(this);
});
