const template = document.createElement('template');
template.innerHTML = `
    <style>
        
        :host {
            width: 100%;
            height: 100%;
            font-family: sans-serif;
            background-color: #white;
            display: flex;
            flex-direction: column;
           
        }
        .header{
            border-radius: 5px;
            background-color: #8E24AA;
            width: 100%;
            z-index: 1;
          }

        .chat {
            width: 100%;
            display: flex;
            flex: auto;
            flex-direction: column-reverse;
            align-content: flex-end;
            z-index: 0;
            overflow-y: auto;
        }
        .messagesList{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-end;
            flex-direction: column;

           
        }
        .message-item{
            box-sizing: border-box;
            width: 100%;
            padding: 0 10px 20px 10px;
        }

        .inputForm{
            width: 100%;
            border-radius: 5px;
            background-color: #white;
            box-shadow: 0 0 2px 0 #151716;
            z-index: 1;
        }
        
        ::-webkit-scrollbar{
            width: 0px;
        }
        input[type=submit] {
            visibility: visible;
        }
    </style>
    
    <div class='header'>
        <chat-header>
        </chat-header>
    </div>

    <div class='chat'>
        <div class='messagesList'>
        </div>
    </div>

    <div class = 'inputForm'>
        <form>
            <div class="result"></div>
            <form-input class="msg_input" name="message-text" placeholder="Сообщение"></form-input>
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

    this.$form.addEventListener('submit', this._onSubmit.bind(this));
    this.$form.addEventListener('keypress', this._onKeyPress.bind(this));
    this.avatar = 'https://sun9-67.userapi.com/c854228/v854228593/11a0f9/ZxcsGQfVitg.jpg';
    this.msgId = 0;
  }

  _onSubmit(event) {
    event.preventDefault();

    if (this.$input.value.length > 0) {
      const $message = this.generateMessage();


      this.$input.$input.value = '';
      // $message.innerText = this.$input.value;
      this.$messagesList.appendChild($message);
      const [msgobj, idf] = $message.toObject();
      console.log((msgobj));
      console.log((idf));


      localStorage.setItem(idf, JSON.stringify(msgobj));
    }
  }

  generateMessage(senderName = 'Vladimir Carpa', text = this.$input.value, timestamp = null) {
    const message = document.createElement('message-item');
    if (timestamp) {
      message.setAttribute('time', timestamp);
    }
    message.setAttribute('text', text);
    message.setAttribute('name', senderName);

    return message;
  }

  connectedCallback() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!isNaN(key)) {
        keys.push(key);
      }
    }
    keys.sort();
    console.log(keys);
    for (const key of keys) {
      const msgObj = JSON.parse(localStorage.getItem(key));

      const $message = this.generateMessage(msgObj.name, msgObj.text, msgObj.timestamp);
      // this.storage.push(this.generateMessage())
      // this.$messagesList.appendChild()
      this.$messagesList.appendChild($message);
    }
  }


  _onKeyPress(event) {
    if (event.keyCode === 13) {
      this.$form.dispatchEvent(new Event('submit'));
    }
  }

  renderList() {

  }
}

customElements.define('message-form', MessageForm);