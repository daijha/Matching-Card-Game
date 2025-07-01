let card = document.querySelectorAll(".cardImg"); // selects the cards we see in ui
console.log(card); //returns a node list of all the cards

let message = document.querySelector("p");

let locked = false; // will determine if you can select or not
let selectedCards = []; // empty array to store cards chosen
card.forEach((card) => {
  let img = card.src; // card is treated as a object. gives the address of the image 

  card.addEventListener("click", function () {
    if (locked === false) { // when you can still select 
      card.style.border = "2px solid white";
    //   console.log(`card ${img} clicked`);
      selectedCards.push(img);
      console.log(selectedCards)
      
    }
      if (selectedCards.length >= 2) {
        message.textContent = `2 cards selected`;
        locked = true;
        setTimeout( message2,1000)
        console.log("message reached!")
      
    }

    function message2(){
          if (selectedCards[0] === selectedCards[1]) {
      message.textContent = "its a match!";
      //icon needs to be removed for the matched cards
    } //needs to flip the cards back over
    else message.textContent = "Not a match! try again.";
    locked = false;
    }
   
  });

  let button = document.getElementById("button"); //allows access to the button in the dom
  //need condition for if there are still icons, the button should not appear,
  // if there are no more icons, the button appears
  button.addEventListener("click", function () {
    //when the button is clicked,
    location.reload(); // reload the page.
  });
});
