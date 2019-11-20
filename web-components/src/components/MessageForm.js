const template = document.createElement('template');
template.innerHTML = `
    <style>
    </style>
    
    <div class='header'>
        <chat-header>
        </chat-header>
    </div>
    <div class='chat'>
        <div class='messagesList'>
        </div>
    </div>
    <div class='inputForm'>
        <form>
            <div class="result"></div>
            <form-input name="message-text" placeholder="Message..."></form-input>
        </form>
    </div>
`;

class MessageForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$form = this._shadowRoot.querySelector('form');

    this.$input = this._shadowRoot.querySelector('form-input');
    this.$messagesList = this._shadowRoot.querySelector('.messagesList');
    this.$header = this._shadowRoot.querySelector('chat-header');

    this.$form.addEventListener('submit', this._onSubmit.bind(this));
    this.$form.addEventListener('keypress', this._onKeyPress.bind(this));
    this.avatar = 'https://sun9-67.userapi.com/c854228/v854228593/11a0f9/ZxcsGQfVitg.jpg';
  }

  _onSubmit(event) {
    event.preventDefault();
    if (this.$input.value.length > 0) {
      const $message = this.generateMessage();
      this.$input.$input.value = '';
      this.$messagesList.appendChild($message);
      const msgobj = $message.toObject();
      this.messages.push(msgobj);
      localStorage.setItem(`dialogue#${this.dialogueID}-${this.dialogueName}`, JSON.stringify(this.messages));
      this.$input.dispatchEvent(new Event('onSubmit'));
    }
  }

  generateMessage(senderName = 'Vladimir Carpa', message = this.$input.value, timestamp = null) {
    const messageItem = document.createElement('message-item');
    if (timestamp) {
      messageItem.setAttribute('timestamp', timestamp);
    }
    messageItem.setAttribute('message', message);
    messageItem.setAttribute('name', senderName);

    return messageItem;
  }

  clrscr() {
    this.$messagesList.innerHTML = '';
  }

  render() {
    if (`dialogue#${this.dialogueID}-${this.dialogueName}` in localStorage) {
      this.messages = JSON.parse(localStorage.getItem(`dialogue#${this.dialogueID}-${this.dialogueName}`));
    } else {
      this.messages = [];
    }
    this.messages.forEach((msg) => {
      const $message = this.generateMessage(msg.name, msg.message, msg.timestamp);
      this.$messagesList.appendChild($message);
    });
  }


  _onKeyPress(event) {
    if (event.keyCode === 13) {
      this.$form.dispatchEvent(new Event('submit'));
    }
  }

  static get observedAttributes() {
    return ['dialoguename', 'dialogueid'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'dialoguename':
        this.dialogueName = newValue;
        break;
      case 'dialogueid':
        this.dialogueID = newValue;
        break;
    }
  }
}

customElements.define('message-form', MessageForm);
