const template = document.createElement('template');
template.innerHTML = `
<style>
    *{
        box-sizing: border-box;
    }
    :host {
        background-color: #F498D8;
        display: flex;
        flex-direction: row;
        font-family: sans-serif;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    .backButton{
        height: 30px;
        width: 30px;
        margin: 5px 15px;
        cursor: pointer;
        background: url(https://image.flaticon.com/icons/svg/156/156887.svg)
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
        background: url(https://image.flaticon.com/icons/svg/149/149452.svg);
    }
    .senderInfo {
        display: flex;
        flex-flow: column wrap;
        height: 100%;
        justify-content: center;
        align-conten: center;
        align-items: center;
        
    }
    .searchButton{
        height: 20px;
        width: 20px;
        margin: 5px 15px;
        background: url(https://image.flaticon.com/icons/svg/932/932384.svg) no-repeat center center;
        background-size: contain
    }
    
    .settingsButton{
        height: 20px;
        width: 20px;
        margin: 5px 15px;
        background: url(https://image.flaticon.com/icons/svg/149/149176.svg) no-repeat center center;
        background-size: contain
    }
    
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
