const should = require("chai").should();

const path = require("path")
const UnderTest = require("./../src/assembleComponent");

describe("Test AssembleComponent", ()=>{


    it("can be loaded with a webcomponent directory",()=>{

        const componentDirectory = path.resolve(__dirname,'components/exampleComponent')
        const exampleComponent = new UnderTest(componentDirectory);
        exampleComponent.tagName.should.equal('example-component');
        exampleComponent.className.should.equal('ExampleComponent')
        const scriptLines = exampleComponent.html().split('\n');
        scriptLines[1].trim().should.equal("import {default as echo} from './../dependencies/echo.js'")
    })

})