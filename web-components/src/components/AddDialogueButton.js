const template = document.createElement('template');
template.innerHTML = `
<style>
    
    .createDialogueButton {
        display: block;
        border: none;
        cursor: pointer;
        position: fixed;
        bottom: 0;
        right: 0;
        height: 40px;
        width: 40px;
        background: url(https://image.flaticon.com/icons/svg/1034/1034138.svg);
        margin: 0px 10px 10px 0px;
    }
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
