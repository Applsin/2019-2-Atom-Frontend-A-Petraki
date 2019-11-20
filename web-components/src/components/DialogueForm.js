const template = document.createElement('template');
template.innerHTML = `
    <style>
    </style>
    
    <div class='header'>
        <dialogues-header>
        </dialouges-header>
    </div>
    <div class='dialogues'>
        <div class='dialoguesList'></div>
    </div>
        
    <div class='createDialogueButton'>
        <create-button>
        </create-button>
    </div>
`;

class DialogueForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$button = this._shadowRoot.querySelector('create-button');
    this.$dialoguesList = this._shadowRoot.querySelector('.dialoguesList');
    this.dialoguesCounter = 0;
    this.$button.addEventListener('click', this._onClick.bind(this));
  }

  _onClick(event) {
    event.preventDefault();
    const person = prompt('Enter nickname of a person you would like to conversate with');
    if (person.length > 0) {
      this.$button.dispatchEvent(new CustomEvent('newDialogue'));
    }
    const text = prompt('Enter message');
    const dialogue = document.createElement('dialogue-item');
    this.dialoguesCounter += 1;
    dialogue.setAttribute('dialogueid', this.dialoguesCounter);
    dialogue.setAttribute('personname', person);
    dialogue._renderMessage();
    dialogue.$message.innerHTML = text;
    this.$dialoguesList.append(dialogue);
    const dialogueObj = dialogue.toObject();
    localStorage.setItem('counter', this.dialoguesCounter);
    localStorage.setItem(`dialogue#${this.dialoguesCounter}-${person}`, JSON.stringify([dialogueObj]));

    this.dispatchEvent(new CustomEvent('renderDialogues', {
      bubbles: true,
      composed: true,
      detail: 'composed',
    }));
  }

  renderDialogues() {
    this.dialoguesCounter = +localStorage.getItem('counter');
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.includes('dialogue#')) {
        const dialogueID = key.split('#')[1].split('-')[0];
        const personName = key.split('#')[1].split('-')[1];
        const $dialogue = document.createElement('dialogue-item');
        $dialogue.setAttribute('personname', personName);
        $dialogue.setAttribute('dialogueid', dialogueID);
        $dialogue._renderMessage();
        this.$dialoguesList.appendChild($dialogue);
      }
    }
  }


  connectedCallback() {
    this.renderDialogues();
  }
}

customElements.define('dialogue-form', DialogueForm);
