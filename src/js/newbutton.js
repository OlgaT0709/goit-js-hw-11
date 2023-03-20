 export default class NewBtn {
     constructor({ selector, hidden = false, text }) {
        this.button = document.querySelector(selector);
        this.textContent(text);
        hidden && this.hide();
    }

    enable() {
        this.button.disabled = false;
    }

    disabled() {
        this.button.disabled = true;
    }

    show() {
        this.button.classList.remove('is-hidden');
    }

    hide() {
        this.button.classList.add('is-hidden');
     }
     
    textContent(text) {
        this.button.textContent = `${text}`
    }
    
}

