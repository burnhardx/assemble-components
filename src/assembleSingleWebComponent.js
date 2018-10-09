const AssembleComponent = require("./assembleComponent");
const fs = require("fs");
const path = require("path");
const cjsToEcmaModule = require("./cjsToEcmaModule");

const createDirIfNotExists = dir=>{
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

const assembleASingleComponent = (sourceDirectory,targetDirectory)=>{

    createDirIfNotExists(targetDirectory);

    const component = new AssembleComponent(sourceDirectory);
    const componentDir = path.resolve(targetDirectory, component.name);
    const dependencyDir = path.resolve(targetDirectory,'dependencies')

    createDirIfNotExists(componentDir)
    createDirIfNotExists(dependencyDir);

    fs.writeFileSync(path.resolve(componentDir,'index.js'),component.html());
    Object.keys(component.dependencies).forEach(dependencyName=>{
        const dependency = component.dependencies[dependencyName];
        const target = path.resolve(dependencyDir, dependencyName+'.js');
        if(!fs.existsSync(target)){
            fs.writeFileSync(target, dependency.isPrivate ?
            cjsToEcmaModule(dependency.script) : dependency.script)
        }
    })

}


module.exports = assembleASingleComponent;