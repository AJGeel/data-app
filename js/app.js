/* 'Air Quality in Shared Environments', a web application developed by Arthur Geel.
   In collaboration with Sark Xing and Yizhou Liu, for 'DBM160 — Data-Enabled Design', a course at
   the Eindhoven University of Technology, faculty Industrial Design.

   This web app serves as a data-gathering prototype: collecting data on the kitchen located in
   'Huize Hertog'. All 'Huize Hertog' residents are asked to report whenever they enter or leave the shared kitchen.

   In future releases, this application will support self-evaluations of the kitchen, and send insights to the residents.
*/


// Initializing global variables for the things we want to measure: 'Huize Hertogs' presence over time.
// In this case, we have four main research participants (listed from p1 through p4), and we also account
// for a total of 9 guests.
var p1_presence = false,
    p2_presence = false,
    p3_presence = false,
    p4_presence = false,
    guests_present = 0;

var kitchenRating = "placeholder";

var button_p1 = document.getElementById("person_1"),
    button_p2 = document.getElementById("person_2"),
    button_p3 = document.getElementById("person_3"),
    button_p4 = document.getElementById("person_4");


// Selecting the DOM elements for the persons- and guests present.
const guests_present_container = document.getElementById('person_guests');
const guests_currently_present = document.getElementById('number_present');

const add_guest_remove = document.getElementById('btn_remove');
const add_guest_btn = document.getElementById('btn_add');

// Grab the DOM element for the Feedback Modal.
var feedbackModal = document.getElementById("feedbackModal");
var snackbar = document.getElementById("snackbar");

// UNCOMMENT TO DELETE ALL LOCALSTORAGE VALUES
// localStorage.clear();

function checkIfLocalStorageExists(){
  if (localStorage.getItem("p1_presence") === null) {localStorage.setItem("p1_presence", "false");}
  if (localStorage.getItem("p2_presence") === null) {localStorage.setItem("p2_presence", "false");}
  if (localStorage.getItem("p3_presence") === null) {localStorage.setItem("p3_presence", "false");}
  if (localStorage.getItem("p4_presence") === null) {localStorage.setItem("p4_presence", "false");}
  if (localStorage.getItem("guests_present") === null) {localStorage.setItem("guests_present", "0");}
}

function updateVariablesFromLocalStorage(){
  p1_presence = JSON.parse(localStorage.getItem("p1_presence"));
  p2_presence = JSON.parse(localStorage.getItem("p2_presence"));
  p3_presence = JSON.parse(localStorage.getItem("p3_presence"));
  p4_presence = JSON.parse(localStorage.getItem("p4_presence"));
  guests_present = JSON.parse(localStorage.getItem("guests_present"));
}

function updateLocalStorage(){
  localStorage.setItem("p1_presence", JSON.stringify(p1_presence));
  localStorage.setItem("p2_presence", JSON.stringify(p2_presence));
  localStorage.setItem("p3_presence", JSON.stringify(p3_presence));
  localStorage.setItem("p4_presence", JSON.stringify(p4_presence));
  localStorage.setItem("guests_present", JSON.stringify(guests_present));
}

checkIfLocalStorageExists();
updateVariablesFromLocalStorage();

function updateButtonStatesToLS(){
  if (p1_presence){
    if (button_p1.classList.contains('active') === false){
      button_p1.classList.add('active');
    }
  }

  if (p2_presence){
    if (button_p2.classList.contains('active') === false){
      button_p2.classList.add('active');
    }
  }

  if (p3_presence){
    if (button_p3.classList.contains('active') === false){
      button_p3.classList.add('active');
    }
  }

  if (p4_presence){
    if (button_p4.classList.contains('active') === false){
      button_p4.classList.add('active');
    }
  }

  updateGuestValue();
}

updateButtonStatesToLS();

// foo = localStorage.getItem("foo");

// Initialize a global variable for the parameter string that fill be fed to the PHP script, server-side.
var paramsForPresence = "placeholder";
var paramsForRatings = "placeholder";



// Function that displays a snackbar at the top of the screen for 3 seconds
function showSnackbar(){
  snackbar.className = "show";
  setTimeout(function(){
    snackbar.className = snackbar.className.replace("show", "");
  }, 3000);
}

var kitchenRatingDOM = document.getElementsByClassName("rating");

function clickRating(elem) {
  for (var i = 0; i < elem.length; i++) {

    elem[i].addEventListener("click", function(e) {

      kitchenRating = this.innerHTML;

      if (this.innerHTML === "Ik geef hier liever geen antwoord op."){
        snackbar.innerHTML = "Oh jee... Is de keuken zo'n ramp? 😱";
      } else {
        snackbar.innerHTML = "Je beoordeling is ontvangen &mdash;&mdash; bedankt!"
      }

      sendRatingToPHP();

      setTimeout(function(){
        feedbackModal.style.display = "none";
        showSnackbar();
      }, 500);

    });
  };

}

// Adds the eventlistener to all persons in the HTML page
clickRating(document.querySelectorAll('.rating'));


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == feedbackModal) {
    feedbackModal.style.display = "none";

    kitchenRating = "clicked-outside-of-modal";
    sendRatingToPHP();
  }
}


add_guest_remove.addEventListener("click", function(){
    if( guests_present > 0){
      guests_present -= 1;
    } else {
      // console.log("Can't remove any more guests.");
    }
    updateGuestValue();
    // sendPresenceToPHP();       // Uncomment this if you would like to submit data every user interaction.
})


add_guest_btn.addEventListener("click", function(){

  if( guests_present < 9){
    guests_present += 1;
  } else {
    // console.log("Can't add any more guests.");
  }

  updateGuestValue();
  // sendPresenceToPHP();       // Uncomment this if you would like to submit data every user interaction.
})

function updateGuestValue(){
  if (guests_present == 0){
    // If there are no guests present, remove the 'active' class from the DOM element.
    guests_present_container.classList.remove('active');
  } else {
    // If there are >= 1 guests present, add the 'active' class to the DOM element.
    guests_present_container.classList.add('active');
  }
  // Update the innerHTML value of the amount of guests present.
  guests_currently_present.innerHTML = guests_present;

  updateLocalStorage();
}

// Function that updates the persons' presence variable status, and updates the style to reflect that.
function clickPerson(elem) {
  for (var i = 0; i < elem.length; i++) {

    elem[i].addEventListener("click", function(e) {
      var current = this;

      if (this.classList.contains('active') === true){
        this.classList.remove('active');

        if (this.id == "person_1"){
          p1_presence = false;
        } else if (this.id == "person_2"){
          p2_presence = false;
        } else if (this.id == "person_3"){
          p3_presence = false;
        }  else if (this.id == "person_4"){
          p4_presence = false;
        }

      } else {
        this.classList.add('active');

        if (this.id == "person_1"){
          p1_presence = true;
        } else if (this.id == "person_2"){
          p2_presence = true;
        } else if (this.id === "person_3"){
          p3_presence = true;
        }  else if (this.id === "person_4"){
          p4_presence = true;
        }
      }

      // console.log("SUMMON POPUP —— How do you rate your kitchen cleanliness? (1—5).");

      // Makes a modal visible, allowing users to submit their rating.
      feedbackModal.style.display = "block";

      updateLocalStorage();

      // sendPresenceToPHP();       // Uncomment this if you would like to submit data every user interaction.
      e.preventDefault();
    });
  };

}

// Adds the eventlistener to all persons in the HTML page
clickPerson(document.querySelectorAll('.person'));

// Function that generates a valid parameter string that is to be fed in the PHP script.
function generateParamsForPresence(){
  paramsForPresence = "p1=" + p1_presence + "&p2=" + p2_presence + "&p3=" + p3_presence + "&p4=" + p4_presence + "&num_guests=" + guests_present;
}

// Function that generates a valid parameter string that is to be fed in the PHP script.
function generateParamsForRatings(){
  paramsForRatings = "kitchenRating=" + kitchenRating;
}

// XMLHttpRequest to the PHP script that stores the passed parameters in the .csv file
function makeXHRForPresence(){
  // Select the right destination, plus add the parameters
  const script_url = "csv-add.php?" + paramsForPresence;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", script_url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  // Log whenever the XHR is finished
  xhr.onload = function() {
    // console.log(this.responseText);
    // DEBUG
  };

  // Function that sends the XHR,  call this whenever user input occurs.
  xhr.send(paramsForPresence);
}

// XMLHttpRequest to the PHP script that stores the passed parameters in the .csv file
function makeXHRForRatings(){
  const script_url = "csv-ratings.php?" + paramsForRatings;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", script_url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  // Log whenever the XHR is finished
  xhr.onload = function() {
    // console.log(this.responseText);
    // DEBUG
  };

  // Function that sends the XHR,  call this whenever user input occurs.
  xhr.send(paramsForRatings);
}

// Function that collects client-side data and sends it to PHP using a XHR.
function sendPresenceToPHP(){
  generateParamsForPresence();
  makeXHRForPresence();
}

function sendRatingToPHP(){
  generateParamsForRatings();
  makeXHRForRatings();
}

// Function that submits a data entry every 30 seconds
setInterval(function(){
  sendPresenceToPHP();
}, 30000);

// Upon loading the full page, submit a data entry
sendPresenceToPHP();

setInterval(function(){
  // Force the page to refresh, one hour after it was first loaded.
  location.refresh();
}, 1000 * 60 * 60);
