const AssembleComponent = require("./assembleComponent");
const assembleSingleComponent = require("./assembleSingleWebComponent");

const fs = require("fs");
const path = require("path");

const assembleWebComponents = (sourceDirectory,targetDirectory)=>{

    const components = fs.readdirSync(sourceDirectory)
        .map(file=>{
            return path.resolve(sourceDirectory, file);
        })
        .filter(dir=>{
            return fs.lstatSync(dir).isDirectory()
        })
        .filter(dir=>{
            try{
                const assembly = new AssembleComponent(dir);
                return true;
            }catch(err){
                return false;
            }
        })
        .forEach(dir=>{
            assembleSingleComponent(dir,targetDirectory);
        })
}

module.exports=assembleWebComponents;