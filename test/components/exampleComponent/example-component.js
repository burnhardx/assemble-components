/**
 * Example Component to illustrate the component deployment.
 */
const echo = require("./../anyDependency");

class ExampleComponent extends HTMLElement {
    connectedCallback() {
        const h1 = document.createElement('h1');
        h1.innerHTML=echo('Herbert Feuerstein');
        this.appendChild(h1);
    }
}

module.exports = ExampleComponent;