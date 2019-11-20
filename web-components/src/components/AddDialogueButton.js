const template = document.createElement('template');
template.innerHTML = `
<style>
</style>
<button class='createDialogueButton'></button>
`;

class AddDialogueButton extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$button = this.shadowRoot.querySelector('button');
  }

  static openForm() {
    const person = prompt('Enter user name to chat with');
    return person;
  }
}

customElements.define('create-button', AddDialogueButton);
