const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const flatDeps = require("flat-node-dependencies");

const template = _.template(fs.readFileSync(path.resolve(__dirname, 'component.html')).toString());

class AssembleComponent {
    constructor(dir) {
        this.dir = dir;
        this.name = path.basename(dir);
        const files = fs.readdirSync(dir);

        const readFile = file => fs.readFileSync(path.resolve(dir, file)).toString()

        this.markups = files
            .filter(file => file.indexOf('.html') != -1)
            .map(file => {
                return {
                    id: file.replace('.html', ''),
                    html: readFile(file)
                }
            });

        this.dependencies = [];

        const targetScripts = files
            .filter(file => file.endsWith('.js'))
            .filter(file => file.split('-').length == 2);

        const className = /(class)(.*)(extends.*)/g;

        this.script = '';
        if (targetScripts.length == 1) {
            this.tagName = targetScripts[0].replace('.js', '')
            readFile(targetScripts[0])
                .split('\n')
                .filter(line => line.indexOf('module.exports') == -1)
                .filter(line => line.indexOf('require') == -1)
                .forEach(line => {
                    this.script += line;
                    const classNameMatch = className.exec(line);
                    if (classNameMatch != null) {
                        this.className = classNameMatch[2].trim();
                    }
                })
            this.dependencies = flatDeps(path.resolve(dir, targetScripts[0]));
        }else{
            throw Error('no tag found')
        }
    }

    html() {
        return template(this);
    }

}

module.exports = AssembleComponent;