const other = require("./otherDependency");
const nested = require("./nestedDependency/reallyNested/dependencyX");

module.exports = input=>{
    return 'echo:'+input;
}