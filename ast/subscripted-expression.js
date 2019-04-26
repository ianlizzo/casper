const check = require("../semantics/check");
const ListType = require("../ast/list-type");
// const DictType = require('../ast/dict-type');

module.exports = class SubscriptedExpression {
  constructor(variable, subscript) {
    Object.assign(this, { variable, subscript });
  }

  // TODO: Check for dictionaries. Check to see if it compiles
  analyze(context) {
    this.subscript.analyze(context);
    this.variable.analyze(context);
    // console.log("VARIABLE", this.variable);
    const variableType = check.isListOrDict(this.variable);
    // console.log("VARIABLETYPE:" + variableType);
    // console.log(variableType.con)
    if (variableType === ListType) {
      check.isNumber(this.subscript);
      this.type = this.variable.type.memberType;
    }
    // console.log("TYPE", this.type);
  }
};
