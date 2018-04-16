export default class DoYouKnowTheWay {
    constructor(){
    }
    render (){
        let img = document.createElement('img');
        img.src = "public/images/Screen Shot 2018-04-14 at 3.49.34 PM.png";
        let src = document.getElementById("game");
        src.appendChild(img)

    }
}