const template = document.createElement('template');
template.innerHTML = `
    <style>
    </style>
    <div class='clip'></div>
    <input type="text">
    <div class='send'></div>
`;

class FormInput extends HTMLElement {
  constructor() {
    super();
    // eslint-disable-next-line no-underscore-dangle
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
