var p1_presence = false;
var p2_presence = false;
var p3_presence = false;
var p4_presence = false;
var guests_present = 0;

var paramsToPHP = "placeholder";


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
    sendDataToPHP();
})

const add_guest_btn = document.getElementById('btn_add');
add_guest_btn.addEventListener("click", function(){

  if( guests_present < 9){
    guests_present += 1;
  } else {
    console.log("Can't add any more guests.");
  }

  updateGuestValue();
  sendDataToPHP();
})

function updateGuestValue(){
  if (guests_present == 0){
    guests_present_container.classList.remove('active');
  } else {
    // add the active class
    guests_present_container.classList.add('active');
  }
  guests_currently_present.innerHTML = guests_present;
}

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

      sendDataToPHP();

      e.preventDefault();
    });
  };

}

clickPerson(document.querySelectorAll('.person'));

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


// Function that collects client-side data and sends it to PHP using a XHR.
function sendDataToPHP(){
  generateParamsForPHP();
  makeXHR();
}

sendDataToPHP();
