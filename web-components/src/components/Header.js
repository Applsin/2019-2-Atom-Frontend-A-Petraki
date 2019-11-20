const template = document.createElement('template');
template.innerHTML = `
<style>
</style>
<div class='backButton'></div>
<div class='chatInfo'>
    <div class='avatar'></div>
    <div class='senderInfo'> 
        <div class='name'>Username placeholder.</div>
        <div class='lastTime'>status placeholder</div>
    </div>
</div>
<div class='searchButton'></div>
<div class='settingsButton'>
</div>
`;


class ChatHeader extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$backButton = this.shadowRoot.querySelector('.backButton');

    this.$backButton.addEventListener('click', this.backButtonClick.bind(this));
  }

  backButtonClick() {
    this.dispatchEvent(new Event('backButtonClick'));
  }
}

customElements.define('chat-header', ChatHeader);
