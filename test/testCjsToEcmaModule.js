const should = require("chai").should();
const fs = require("fs");
const path = require("path");


const underTest = require("./../src/cjsToEcmaModule");

describe("cjsToEcmaModule",()=>{

    it("converts common js modules to ecma modules",()=>{

        const nodeModule = fs.readFileSync(path.resolve(__dirname,'components/anyDependency.js')).toString();

        const ecmaModuleLines = underTest(nodeModule).split('\n');

        ecmaModuleLines[0].should.equal("import {default as other} from './other.js'")
        ecmaModuleLines[1].should.equal("import {default as nested} from './nested.js'")
        ecmaModuleLines[3].should.equal("export default  input=>{")

    })

})