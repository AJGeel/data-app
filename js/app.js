var p1_presence = false;
var p2_presence = false;
var p3_presence = false;
var guests_present = 0;

var amountOfDataLinesSent = 0;

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
})

const add_guest_btn = document.getElementById('btn_add');
add_guest_btn.addEventListener("click", function(){
  if( guests_present < 9){
    guests_present += 1;
  } else {
    console.log("Can't add any more guests.");
  }

  updateGuestValue();
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

function logAllPresent(){
  console.log(`Is Sark home? ${(p1_presence.toString()).toUpperCase()}`);

  setTimeout(function(){
    console.log(`Is Arthur home? ${(p2_presence.toString()).toUpperCase()}`);
  }, 200);

  setTimeout(function(){
    console.log(`Is Yizhou home? ${(p3_presence.toString()).toUpperCase()}`);
  }, 400);

  setTimeout(function(){
    console.log(`There are currently ${guests_present} guests present.`);
  }, 600);
}

function clickPerson(elem) {

  for (var i = 0; i < elem.length; i++) {

    elem[i].addEventListener("click", function(e) {
      var current = this;

      // console.log("CLICKED");

      if (this.classList.contains('active') === true){
        this.classList.remove('active');

        if (this.innerHTML === 'Sark'){
          p1_presence = false;
        } else if (this.innerHTML === 'Arthur'){
          p2_presence = false;
        } else if (this.innerHTML === 'Yizhou'){
          p3_presence = false;
        }

      } else {
        this.classList.add('active');

        if (this.innerHTML === 'Sark'){
          p1_presence = true;
        } else if (this.innerHTML === 'Arthur'){
          p2_presence = true;
        } else if (this.innerHTML === 'Yizhou'){
          p3_presence = true;
        }
      }

      e.preventDefault();
    });
  };
}

function sendPresenceData(){
  console.log(' ');
  logAllPresent();
  let now = new Date();

  setTimeout(function(){
    console.log(`%c Data has been sent. Entry number ${amountOfDataLinesSent} at ${now}`, 'color: #3FA7A7');
  }, 2000);
}

var interval = setInterval(function() {
  sendPresenceData();
  amountOfDataLinesSent+=1;
}, 10000)

clickPerson(document.querySelectorAll('.person'));
