const template = document.createElement('template');
template.innerHTML = `
<style>
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    :host {
        height: 60px;
        display: flex;
        flex-direction: row;
        font-family: sans-serif;
        align-items: center;
        justify-content: center;
    }
    .chatInfo{
        flex: auto;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
    }
    
    .chatInfo .avatar{
        height: 30px;
        width: 30px;
        margin: 5px 15px;   
        border-radius: 50%;      
        background: url(https://assets.dryicons.com/uploads/icon/svg/5608/9446101f-27b4-4f8f-9761-0397d7ea932e.svg);
    }
    .userInfo {
        display: flex;
        flex-flow: column wrap;
        height: 100%;
        color: #ffffff;
        justify-content: center;
        align-conten: center;
        align-items: center;
        
    }

    .userInfo .user {
        font-size: 1.0em;
    }

    .userInfo .status {
        font-size: 0.9em;
    }
    .searchButton{
        height: 20px;
        width: 20px;
        margin: 5px 15px;
        background: url(https://image.flaticon.com/icons/svg/149/149309.svg)
    }
    .settingsButton{
        height: 20px;
        width: 20px;
        margin: 5px 15px;
        background: url(https://image.flaticon.com/icons/svg/149/149404.svg)
    }
    .backButton{
        height: 30px;
        width: 30px;
        margin: 0px 15px;
        background: url(https://image.flaticon.com/icons/svg/159/159769.svg)
    }
    
</style>
<div class='backButton'></div>
<div class='chatInfo'>
    <div class='avatar'></div>
    <div class='userInfo'>
        <div class='user'>Alexander Petraki</div>
        <div class='status'>status placeholder</div>
    </div>
</div>
<div class='searchButton'></div>
<div class='settingsButton'>
</div>
`;

class DialogInformation extends HTMLElement {
  constructor() {
    super();

    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /* static get observedAttributes() {
      return ['name', 'value', 'placeholder', 'disabled'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
      if(name == "value") this.$input.value = newValue;
      this.$input.setAttribute(name, newValue);
  } */
}

customElements.define('chat-header', DialogInformation);