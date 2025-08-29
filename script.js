let card = document.querySelectorAll(".card"); // selects the divs in html with the card class(thats why the dot is used . its syntax)
// console.log(card); //returns a node list of all the cards

const cardArr = Array.from(card); // Array.from is a method that coverts array like data structures into actual arrays
console.log(cardArr);

// to see the ids created:
// card.forEach((crd)=>{
//   console.log(crd.dataset.id)
// })

let cardBox = document.getElementById("cardBox"); // grabs the card container

// shuffle the cards
function shuffle(cardArr) {
  for (let i = cardArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = cardArr[i];
    cardArr[i] = cardArr[j];
    cardArr[j] = temp;
  }
  return cardArr;
}

shuffle(cardArr).forEach((one) => {
  cardBox.appendChild(one);
});

let icons = [...document.querySelectorAll(".icon img")]; // accesses only the images in the progress bar [] with the ... makes it an array format and not a node list
console.log(icons);

let message = document.querySelector("p");
let button = document.getElementById("button"); //allows access to the button in the dom
button.style.visibility = "hidden"; // hides the button at the start of the game.

let locked = false; // will determine if you can select or not
let selectedCards = []; // empty array to store cards chosen

card.forEach((card) => {
  let id = card.dataset.id; // selects the card img without using the document keyword because this function already knows card.

  function flipCard() {
    card.classList.add("flipped"); // flipped is the new class created for the flip animation in css
  }

  card.addEventListener("click", function () {
    if (selectedCards.includes(card)) {
      message.textContent =
        "You selected this card already! Choose another one.";
      return;
    }

    if (locked === false) {
      // when you can still select
      flipCard();
      console.log(id); //displays id of selected card

      selectedCards.push(card);
      console.log(selectedCards);
    }

    if (selectedCards.length === 2) {
      locked = true;
      message.textContent = `2 cards selected`;
      setTimeout(message2, 1000); //milliseconds
      console.log("message reached!");
    }
  });

  // uses js dataset properties to grab the attributes placed in html using data-
  //ADD ID MATCH LOGIC HERE
  function message2() {
    if (
      selectedCards[0].dataset.pic === selectedCards[1].dataset.pic && // pics should match
      selectedCards[0].dataset.id !== selectedCards[1].dataset.id // the ids should not match so 2 diff cards can be selected.
    ) {
      //.dataset.pic and .id grabs the picture and the id from html attribute ...
      message.textContent = "its a match!";
      selectedCards[0].style.visibility = "hidden"; // this hides the card
      selectedCards[1].style.visibility = "hidden";
      // uses the dataset pic attribute to see if they match  then hides the icon if so
      icons.forEach((icon) => {
        if (selectedCards[0].dataset.pic === icon.dataset.pic) {
          icon.style.visibility = "hidden";
          console.log(icon.dataset.pic);
        }
      });
    } else {
      message.textContent = "Not a match! try again.";
      selectedCards[0].classList.remove("flipped"); // removes the class to flip the card back over
      selectedCards[1].classList.remove("flipped");
    }
    locked = false; // reopens the selection
    selectedCards = []; // empties the card selection array

    //checks if the game is still playable and ends it :
    endGame();
  }
});

// add a you win message at the top when all cards are hidden.
function endGame() {
  //need condition for if there are still icons, the button should not appear,
  // if there are no more icons, the button appears
  if (icons.every((icon) => icon.style.visibility === "hidden")) {
    message.textContent = "You Won!";
    button.style.visibility = "visible";
    button.addEventListener("click", function () {
      //when the button is clicked,
      location.reload();

      // !!!UNFINISHED RESHUFFLE LOGIC
      //     shuffle(cardArr).forEach(one =>{
      // cardBox.appendChild(one)

      // cardArr.style.visibility === "visible"
      // // reload the page. WE WILL NOT BE RELOADING THE PAGE WE WILL BE RESHUFFLING EVERYTHING AND RESETTING THE GAME.
    });
  } else {
    button.style.visibility = "hidden";
  }
}
