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
    .menuButton{
        height: 30px;
        width: 30px;
        margin: 5px 15px;
        background: url(https://image.flaticon.com/icons/svg/149/149176.svg) no-repeat center center;
        background-size: contain
    }
    .searchButton{
        height: 30px;
        width: 30px;
        margin: 5px 15px;
        padding-right: 40px;
        background: url(https://image.flaticon.com/icons/svg/932/932384.svg) no-repeat center center;
        background-size: contain
    }  
    .messenger{
        flex: auto;
        height: 100%;
        padding-left: 20px;
    }

</style>
<div class='menuButton'></div>
<div class='messenger'>Dialogues</div>
<div class='searchButton'></div>
`;


class DialoguesHeader extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('dialogues-header', DialoguesHeader);
