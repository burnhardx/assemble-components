const requiredRegex = /(const|var)\s(.*)=\s?(require\(.)(.*)(.\))/;

const convertCommonJSToEcmaModule = cjsFile => {
    return cjsFile.split('\n')
        .map(line => {
            const matchesRequired = requiredRegex.exec(line);
            if(matchesRequired!=null){
                const name = matchesRequired[2].trim();
                line = "import {default as "+name+"} from './"+name+".js'";
            }
            if(line.indexOf('module.exports')==0){
                line = line.replace('module.exports =','export default ')
                line = line.replace('module.exports=','export default ')
            }
            return line
        }).join('\n');
}

module.exports = convertCommonJSToEcmaModule;