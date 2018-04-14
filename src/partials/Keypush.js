export default class Keypush {
    constructor() {
        this.keyPressed = {};
        document.addEventListener('keydown', (e) => {
            this.keyPressed[e.key] = true;
         }, false);
         document.addEventListener('keyup', (e) => {
            this.keyPressed[e.key] = false;
         }, false);
    }

    checkIfPushed(key) {
        if(this.keyPressed[key] === true) {
            return true;
        } else {
            return false;
        }
    }
}