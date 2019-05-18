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
var p1_presence = false;
var p2_presence = false;
var p3_presence = false;
var p4_presence = false;
var guests_present = 0;


// Grab the DOM elements for the Feedback Modal and its 'close' button.
var feedbackModal = document.getElementById("feedbackModal");
// var feedbackModalClose = document.getElementsByClassName("close")[0];

var kitchenRating = document.getElementsByClassName("rating");

function clickRating(elem) {
  for (var i = 0; i < elem.length; i++) {

    elem[i].addEventListener("click", function(e) {
      var current = this;
      console.log("Rating: " + this.innerHTML);

      // if (this.classList.contains('active') === true){
      //   this.classList.remove('active');
      //
      //   if (this.innerHTML === 'Olivier'){
      //     p1_presence = false;
      //   } else if (this.innerHTML === 'Hertog #1'){
      //     p2_presence = false;
      //   } else if (this.innerHTML === 'Hertog #2'){
      //     p3_presence = false;
      //   }  else if (this.innerHTML === 'Hertog #3'){
      //     p4_presence = false;
      //   }
      //
      // } else {
      //   this.classList.add('active');
      //
      //   if (this.innerHTML === 'Olivier'){
      //     p1_presence = true;
      //   } else if (this.innerHTML === 'Hertog #1'){
      //     p2_presence = true;
      //   } else if (this.innerHTML === 'Hertog #2'){
      //     p3_presence = true;
      //   }  else if (this.innerHTML === 'Hertog #3'){
      //     p4_presence = true;
      //   }
      // }

    });
  };

}

// Adds the eventlistener to all persons in the HTML page
clickRating(document.querySelectorAll('.rating'));


kitchenRating.onclick = function(){
  console.log("rating received");
}

// // When the user clicks on <span> (x), close the modal
// feedbackModalClose.onclick = function() {
//   feedbackModal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == feedbackModal) {
    feedbackModal.style.display = "none";
  }
}

// Initialize a global variable for the parameter string that fill be fed to the PHP script, server-side.
var paramsToPHP = "placeholder";

// Selecting the DOM elements for the persons- and guests present.
const guests_present_container = document.getElementById('person_guests');
const guests_currently_present = document.getElementById('number_present');

const add_guest_remove = document.getElementById('btn_remove');
add_guest_remove.addEventListener("click", function(){
    if( guests_present > 0){
      guests_present -= 1;
    } else {
      console.log("Can't remove any more guests.");
    }
    updateGuestValue();
    // sendDataToPHP();       // Uncomment this if you would like to submit data every user interaction.
})

const add_guest_btn = document.getElementById('btn_add');
add_guest_btn.addEventListener("click", function(){

  if( guests_present < 9){
    guests_present += 1;
  } else {
    console.log("Can't add any more guests.");
  }

  updateGuestValue();
  // sendDataToPHP();       // Uncomment this if you would like to submit data every user interaction.
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
}

// Function that updates the persons' presence variable status, and updates the style to reflect that.
function clickPerson(elem) {
  for (var i = 0; i < elem.length; i++) {

    elem[i].addEventListener("click", function(e) {
      var current = this;

      if (this.classList.contains('active') === true){
        this.classList.remove('active');

        if (this.innerHTML === 'Olivier'){
          p1_presence = false;
        } else if (this.innerHTML === 'Hertog #1'){
          p2_presence = false;
        } else if (this.innerHTML === 'Hertog #2'){
          p3_presence = false;
        }  else if (this.innerHTML === 'Hertog #3'){
          p4_presence = false;
        }

      } else {
        this.classList.add('active');

        if (this.innerHTML === 'Olivier'){
          p1_presence = true;
        } else if (this.innerHTML === 'Hertog #1'){
          p2_presence = true;
        } else if (this.innerHTML === 'Hertog #2'){
          p3_presence = true;
        }  else if (this.innerHTML === 'Hertog #3'){
          p4_presence = true;
        }
      }

      // console.log("SUMMON POPUP —— How do you rate your kitchen cleanliness? (1—5).");

      // Makes a modal visible, allowing users to submit their rating.
      feedbackModal.style.display = "block";

      // sendDataToPHP();       // Uncomment this if you would like to submit data every user interaction.
      e.preventDefault();
    });
  };

}

// Adds the eventlistener to all persons in the HTML page
clickPerson(document.querySelectorAll('.person'));

// Function that generates a valid parameter string that is to be fed in the PHP script.
function generateParamsForPHP(){
  paramsToPHP = "p1=" + p1_presence + "&p2=" + p2_presence + "&p3=" + p3_presence + "&p4=" + p4_presence + "&num_guests=" + guests_present;
}

// XMLHttpRequest to the PHP script that stores the passed parameters in the .csv file
function makeXHR(){
  // Select the right destination, plus add the parameters
  const script_url = "csv-add.php?" + paramsToPHP;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", script_url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  // Log whenever the XHR is finished
  xhr.onload = function() {
    console.log(this.responseText);
  };

  // Function that sends the XHR,  call this whenever user input occurs.
  xhr.send(paramsToPHP);
}


/* TO DO: FUNCTION THAT LOGS THE CLIENT'S IP ADDRESS */
// function logIP(){
//   const script_url = "log-ip";
//   var xhr = new XMLHttpRequest();
//   xhr.open("POST", script_url, true);
//   xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//
//   xhr.onload = function() {
//     console.log(this.responseText);
//   };
//
//   xhr.send();
// }


// Function that collects client-side data and sends it to PHP using a XHR.
function sendDataToPHP(){
  generateParamsForPHP();
  makeXHR();
}

// Function that submits a data entry every 30 seconds
setInterval(function(){
  sendDataToPHP();
}, 30000);

// Upon loading the full page, submit a data entry
sendDataToPHP();
