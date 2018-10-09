#! /usr/bin/env node
const fs = require("fs");
const path = require("path");

const assembleWebComponents = require("./../assembleWebComponents")

if (require.main === module) {

    const sourceDirectory = process.argv[2];
    const targetDirectory = process.argv[3];


    const errorMessage=()=>{
        console.log('please provide a valid source and targetdirectory');
        console.log('call assembleAll [sourceDirectory] [targetDirectory]')
    }

    try{
        if(!sourceDirectory || !sourceDirectory || !fs.lstatSync(sourceDirectory).isDirectory()){
            errorMessage();
        }else{
            assembleWebComponents(sourceDirectory, targetDirectory);
        }
    }catch(err){
        errorMessage();
    }

}