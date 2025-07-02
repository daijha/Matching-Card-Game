let card = document.querySelectorAll(".card"); // selects the cards we see in ui
console.log(card); //returns a node list of all the cards

let icons = document.querySelectorAll(".icon img");// accesses only the images in the progress bar 
console.log(icons);

let message = document.querySelector("p");

let locked = false; // will determine if you can select or not
let selectedCards = []; // empty array to store cards chosen
card.forEach((card) => {
    let img = card.src; // card is treated as a object. gives the address of the image

    function flipCard() {
        card.classList.add("flipped"); // flipped is the new class created for the flip animation in css
    }

    card.addEventListener("click", function () {
        if (locked === false) {
            // when you can still select
            card.style.border = "2px solid white";
            flipCard(card);

            selectedCards.push(card);
            console.log(selectedCards);
        }
        if (selectedCards.length >= 2) {
            locked = true;
            message.textContent = `2 cards selected`;
            setTimeout(message2, 1000);
            console.log("message reached!");
        }
    });

    function message2() {
        if (selectedCards[0].dataset.pic === selectedCards[1].dataset.pic) {
            message.textContent = "its a match!";
            selectedCards[0].style.visibility = "hidden"; // this hides the card
            selectedCards[1].style.visibility = "hidden";
            icons.forEach((icon) => {
                if (selectedCards[0].dataset.pic === icon.dataset.pic) {
                    icon.style.visibility = "hidden";
                    console.log(icon.dataset.pic)
                }
            });
        } else {
            message.textContent = "Not a match! try again."
        selectedCards[0].classList.remove("flipped")// removes the class to flip the card back over 
        selectedCards[1].classList.remove("flipped")
        }
           locked = false
        selectedCards = [];

    }
})
//icon needs to be removed for the matched cards
//needs to flip the cards back over






// add a you win message at the top when all cards are hidden.

let button = document.getElementById("button"); //allows access to the button in the dom
//need condition for if there are still icons, the button should not appear,
// if there are no more icons, the button appears
button.addEventListener("click", function () {
    //when the button is clicked,
    location.reload(); // reload the page.
})