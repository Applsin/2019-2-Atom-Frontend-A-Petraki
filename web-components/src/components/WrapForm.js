const template = document.createElement('template');
template.innerHTML = `
<style>
  .wrapper{
    height: 100vh;
    width: 100vw;
    position: relative;
    overflow: hidden;
  }
  .wrapper *{
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
    z-index: 0;
  }
  message-form{
    z-index: 1;
    right: -100%;
    animation-duration: 0.3s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }
  message-form.appear{
    animation-name: chatAppear;
  }
  message-form.disappear{
    animation-name: chatDisappear;
  }

  @keyframes chatAppear{
    from{
      right: -100%;
    }
    to{
      right: 0;
    }
  }
  
  @keyframes chatDisappear{
    from{
      right: 0;
    }
    to{
      right: -100%;
    }
  }
    
  ::-webkit-scrollbar {
    width: 0px;
  }
</style>
<div class="wrapper">
  <dialogue-form></dialogue-form>
  <message-form></message-form>
</div>
`;

class WrapForm extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$container = this.shadowRoot.querySelector('.container');
    this.$dialogForm = this.shadowRoot.querySelector('dialogue-form');
    this.$messageForm = this.shadowRoot.querySelector('message-form');
    this.shadowRoot.addEventListener('renderDialogues', () => { console.log(123); this.openDialogueEvent(); });
    this.openDialogueEvent();
  }

  openDialogueEvent() {
    if (this.dialogueIds === undefined) {
      this.dialogueIds = [];
    }
    Object.entries(localStorage).forEach((dlg) => {
      const key = dlg[0];
      if ((key.includes('dialogue')) && !(key in this.dialogueIds)) {
        const [currentId, currentName] = [...key.split('#')[1].split('-')];
        const clickableDialogue = this.$dialogForm.$dialoguesList.querySelector(`dialogue-item[dialogueid="${currentId}"]`);
        clickableDialogue.addEventListener('click', () => this.openDialogue(currentId, currentName));
        this.dialogueIds.push(currentId);
      }
    });
  }

  openDialogue(dialogueId, dialogueName) {
    this.$messageForm.classList.remove('disappear');
    this.$messageForm.classList.add('appear');
    this.$messageForm.setAttribute('dialogueid', dialogueId);
    this.$messageForm.setAttribute('dialoguename', dialogueName);
    this.$messageForm.render();
    this.$messageForm.$header.addEventListener('backButtonClick', () => this.closeDialogue());
    this.$messageForm.$input.addEventListener('onSubmit', () => this.refreshDialogue(dialogueId));
  }

  refreshDialogue(dialogueId) {
    const dialogue = this.$dialogForm.$dialoguesList.querySelector(`dialogue-item[dialogueid="${dialogueId}"]`);
    dialogue._renderMessage();
  }

  closeDialogue() {
    this.$messageForm.clrscr();
    this.$messageForm.classList.remove('appear');
    this.$messageForm.classList.add('disappear');
  }
}

customElements.define('wrap-form', WrapForm);
