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
        animation-name: pencil;
        animation-duration: 2.5s;
        animation-delay: 0.3s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
    @keyframes pencil{
      from{
        transform: rotate(0deg);
      }
      7.5%{
        
        transform: rotate(15deg);
      }
      15%{
       
        transform: rotate(-15deg);
        
      }
      22.5%{
       
        transform: rotate(7.5deg);
        
      }
      30%{
        
        transform: rotate(-7.5deg);
      }
      37.5%{
        
        transform: rotate(3.25deg);
      }
      45%{
        
        transform: rotate(-3.25deg);
      }
      50%{
        
        transform: rotate(0deg);
      }
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
