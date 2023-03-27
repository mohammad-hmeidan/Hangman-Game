//letters
const letters = "abcdefghijklmnopqrstuvwxyz";
//Get Array from letters
let lettersArray = Array.from(letters);
//select letters container
let lettersContainer = document.querySelector(".letters"); 
// Generate letters
lettersArray.forEach(letter => {
    //create span
    let span = document.createElement("span");
    //create letter text Node
    let theletter = document.createTextNode(letter);
    //Append the letter to Span
    span.appendChild(theletter);
    //Add class on span
    span.className = "letter-box";
    // append span to the letter container
    lettersContainer.appendChild(span);
});
// object of words
const words={
    programming : ["php","javascript","go","scala","fortran","mysql","python"],
    movies:["Prestige","Inception","Parasite","Interestellar","whiplash","Memento","Coco","Up"],
    people:["Albert Einstein","Hitchcock","Alexander","Cleopatra","Mahatma Ghandi"],
    countries:["Syria","Palestine","Yamen","Egypt","Bahrain","Qatar"]
};
// Get random property
let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randompropvalue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randompropvalue.length);
let randomValueValue = randompropvalue[randomValueNumber];
//set category info
document.querySelector(".game-info .category span").innerHTML = randomPropName;
//select letter guess element 
let lettersGuessContainer = document.querySelector(".letters-guess");
//convert choosen word to array
let lettersAndSpace = Array.from(randomValueValue);
//create spans depend on word 
lettersAndSpace.forEach(letter =>{
    let emptyspan = document.createElement("span");
    if (letter === " ") {
        //Add class to span
        emptyspan.className = "with-space";
    }
    //Append span to the letterguesscontainer
    lettersGuessContainer.appendChild(emptyspan);
});
console.log(randomValueValue)
//select guess spans
let guessspans = document.querySelectorAll(".letters-guess span");
//set wrong attemps
let wrongAttemps =0;
// select draw element
let theDraw =document.querySelector(".hangman-draw")
//Handle clicking on letters
document.addEventListener("click",e=>{
    //set the choose status
    let thestatus = false;
    if (e.target.className==="letter-box") {
        e.target.classList.add("clicked");
        // get clicked letter
        let theclickedletter = e.target.innerHTML.toLowerCase();
        //the choosen words
        let thechoosenspan = Array.from(randomValueValue.toLowerCase())
        thechoosenspan.forEach((wordletter,wordIndex) =>{
            if (wordletter === theclickedletter) {
                // set status to correct
                thestatus = true;
                // loop on all guess spans
                guessspans.forEach((span,spanIndex)=>{
                    if (wordIndex===spanIndex) {
                        span.innerHTML = theclickedletter;
                    }
                });
            }
        });
        if (thestatus !== true) {
            //Increase the wrong attemps
            wrongAttemps++;
            //Add class wrong on the DrawElement
            theDraw.classList.add(`wrong-${wrongAttemps}`);
            // play fail sound 
            document.getElementById("fail").play();
            if (wrongAttemps === 8) {
                EndGame();
                lettersContainer.classList.add("finished")
            }
        }else{
            // play succes sound 
            document.getElementById("success").play();
        }
    }
});

//End game function 
function EndGame(){
    //Create popub div
    let div = document.createElement("div");
    //create text
    let divText = document.createTextNode(`Game over ,the world is ${randomValueValue}`);
    //create button
    let divbutton = document.createElement("button");
    // create text in button
    let textbutton = document.createTextNode("Return the Game");
    //Append text to button
    divbutton.appendChild(textbutton);
    //Append text to div
    div.appendChild(divText);
    div.appendChild(divbutton);
    //Add class on div
    div.className = "popup";
    //Append to the body
    document.body.appendChild(div);
    let returnGame = document.querySelector(".popup button");
    returnGame.addEventListener("click",()=>{
        window.location.reload()
    })
}