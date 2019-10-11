const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: flex;
            flex-direction: row;
            height: 52px;
            padding-left: 10px;
            padding-right: 10px;
        }
        input {
            border: 0;
            outline: none;
            width: 100%;
            height: 100%;
            background-color: transparent;
        }
        .searchButton{
            height: 53px;
            background: url(static/images/sprait_1.png) no-repeat center center;
            background-size: 100%;
            border: 10px;
            justify-content: flex-end;
            padding-right: 30px;
            background-color: transparent;
          }
    </style>
    <input type="text">
    <div class='searchButton'></div>
`;

class FormInput extends HTMLElement {
    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$input = this.shadowRoot.querySelector('input');
    }

    static get observedAttributes() {
        return ['name', 'value', 'placeholder', 'disabled'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.$input.setAttribute(name, newValue);
    }

    get value() {
        return this.$input.value;
    }
}

window.customElements.define('form-input', FormInput);