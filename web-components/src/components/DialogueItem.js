const template = document.createElement('template');
template.innerHTML = `
<style>
</style>
<div class="dialogue">
    <div class='avatar'></div>
    <div class='wrapper'>
      <div class='text'>
          <div class='name'></div>
          <div class='timestamp'></div>
      </div>
      <div class='info'>
          <div class='message'></div>
          <div class='status'>status placeholder</div>
      </div>
    </div>
</div>
`;

class DialogueItem extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$dialogue = this._shadowRoot.querySelector('.dialogue');

    this.$name = this._shadowRoot.querySelector('.name');
    this.$message = this._shadowRoot.querySelector('.message');
    this.$timestamp = this._shadowRoot.querySelector('.timestamp');
  }

  static get observedAttributes() {
    return ['personname', 'dialogueid'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'dialogueid':
        this.dialogueID = newValue;
        break;
      case 'personname':
        this.personName = newValue;
        this.$name.innerHTML = this.personName;
        break;
    }
  }

  toObject() {
    this.dialogueObject = {
      name: this.$name.innerHTML,
      message: this.$message.innerHTML,
      timestamp: this.$timestamp.innerHTML,
    };
    return this.dialogueObject;
  }

  _renderMessage() {
    const msgs = JSON.parse(localStorage.getItem(`dialogue#${this.dialogueID}-${this.personName}`));
    if (msgs === null) {
      this.$timestamp.innerHTML = new Date().toLocaleString('ru', {
        hour: 'numeric',
        minute: 'numeric',
      });
    } else {
      this.dialogue = msgs[msgs.length - 1];
      this.$timestamp.innerHTML = this.dialogue.timestamp;
      this.$message.innerHTML = this.dialogue.message;
    }
  }
}

customElements.define('dialogue-item', DialogueItem);
