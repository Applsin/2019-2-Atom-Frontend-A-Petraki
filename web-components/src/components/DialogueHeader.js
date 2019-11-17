const template = document.createElement('template');
template.innerHTML = `
<style>
</style>
<div class='menuButton'></div>
<div class='messenger'>Dialogues</div>
<div class='searchButton'></div>
`;


class DialoguesHeader extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('dialogues-header', DialoguesHeader);
