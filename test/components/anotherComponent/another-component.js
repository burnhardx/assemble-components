const _ = require("lodash");

class Maracana extends HTMLElement {
    connectedCallback(){
        const tpl = _.template('Hello <%=name%>');
        this.innerHTML =tpl({name:'User'})
    }
}