const should = require("chai").should();

const underTest = require("./../src/assembleWebComponents")

const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf")


describe("Assemble a single component", ()=>{


    const sourceDirectory = path.resolve(__dirname, 'components');

    const targetDirectory = path.resolve(__dirname, 'testComponents');


    it("assembles all web components in a folder",()=>{
        underTest(sourceDirectory,targetDirectory);

        const targetComponentDirectory = path.resolve(targetDirectory,'exampleComponent')
        fs.existsSync(targetComponentDirectory).should.equal(true);
        fs.existsSync(path.resolve(targetComponentDirectory,'index.js')).should.equal(true);

        const dependencyDirectory = path.resolve(targetDirectory, 'dependencies');

        fs.existsSync(dependencyDirectory).should.equal(true);
        fs.existsSync(path.resolve(dependencyDirectory, 'echo.js')).should.equal(true);
        fs.existsSync(path.resolve(dependencyDirectory, '_.js')).should.equal(true);
        fs.existsSync(path.resolve(dependencyDirectory, 'other.js')).should.equal(true);
        fs.existsSync(path.resolve(dependencyDirectory, 'nested.js')).should.equal(true);
    })

    after(()=>{
        rimraf.sync(targetDirectory);
    })

})