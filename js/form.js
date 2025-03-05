(function () {

document.addEventListener("DOMContentLoaded", function () {
    const openButtons = document.querySelectorAll(".open-form");

    function createAndShowForm() {
        // Remove existing form if any
        let existingPopup = document.getElementById("popup");
        // if (existingPopup) {
        //     existingPopup.remove();
        // }
        if (existingPopup) {
          existingPopup.style.display = "flex";
          return;
      }

        // Create the form HTML dynamically
        const popupOverlay = document.createElement("div");
        popupOverlay.id = "popup";
        popupOverlay.className = "popup-overlay";
        popupOverlay.style.position = "fixed";
        popupOverlay.style.top = "0";
        popupOverlay.style.left = "0";
        popupOverlay.style.width = "100%";
        popupOverlay.style.height = "100%";
        popupOverlay.style.background = "rgba(0, 0, 0, 0.5)";
        popupOverlay.style.display = "flex";
        popupOverlay.style.justifyContent = "center";
        popupOverlay.style.alignItems = "center";

        popupOverlay.innerHTML = `
        <div class="popup-form" style="background:#ffffff; padding:20px; border-radius:10px; width:90%; max-width:450px; color:#2e3192; position:relative;">
            <span class="close-btn" style="position:absolute; top:10px; right:15px; font-size:20px; cursor:pointer; color:black;">&times;</span>
            <h4 class="text-center bold-text" style="color:#2e3192">Get Connected with an Expert</h4>
            <form method="POST" role="form" class= "pop-form" style='background:#2e3192; padding:20px;'>
                <div class="row mb-4">
                    <div class="col-6">
                        <input type="text" class="form-control" placeholder="Name">
                    </div>
                    <div class="col-6">
                        <input type="email" class="form-control" placeholder="Email-Id">
                    </div>
                </div>
                <div class="row mb-4">
                    <div class="col-6">
                        <input type="text" class="form-control" placeholder="Contact Number">
                    </div>
                    <div class="col-6">
                        <input type="text" class="form-control" placeholder="Qualification">
                    </div>
                </div>
                <div class="row mb-4">
                    <div class="col-6">
                        <select class="form-control">
                           <option value="" disabled selected>Select Program</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Master's Degree">Master's Degree</option>
                      <option value="PhD">PhD</option>
                      <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="col-6">
                        <select class="form-control">
                             <option value="" disabled selected>Select Study Destination</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Poland">Poland</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Australia">Australia</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Ukraine">Ukraine</option>
                      <option value="New Zealand">New Zealand</option>
                        </select>
                    </div>
                </div>
                <div class="mb-4">
                    <textarea class="form-control" rows="4" placeholder="Feel free to ask or share your thoughts"></textarea>
                </div>
                <div class="form-group text-center">
                <button type="submit" class="btn btn-light py-3 px-5" style="border-radius: 20px;">Avail FREE Counselling</button>
                </div>
            </form>
        </div>
    `;

        document.body.appendChild(popupOverlay);

        // Close popup on clicking 'X' button
        document.querySelector(".close-btn").addEventListener("click", function () {
            popupOverlay.style.display = "none";
        });

        // Close popup when clicking outside the form
        popupOverlay.addEventListener("click", function (event) {
            if (event.target === popupOverlay) {
                popupOverlay.style.display = "none";
            }
        });
    }

    // Attach event listeners to all "open-form" buttons
    openButtons.forEach(button => {
        button.addEventListener("click", function () {
            createAndShowForm();
        });
    });
});

let forms = document.querySelectorAll('.pop-form');
console.log(forms)
forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      console.log('entering')
      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      // let formData = new FormData( thisForm );

      var formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        contact_number: document.getElementById('contact_number').value,
        qualification: document.getElementById('qualification').value,
        city: document.getElementById('city').value,
        program: document.getElementById('program').value,
        destination: document.getElementById('destination').value,
        message: document.getElementById('message').value,
      };

      // var countryCode = country.phone;

      // var concatenatedPhoneNumber = countryCode + phone;
      
      console.log(formData);

      if ( recaptcha ) {
        if(typeof grecaptcha !== "undefined" ) {
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
              .then(token => {
                formData.set('recaptcha-response', token);
                php_email_form_submit(thisForm, action, formData);
              })
            } catch(error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        php_email_form_submit(thisForm, action, formData);
      }
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    console.log(formData);
      var form_data = new FormData();
  
    for ( var key in formData ) {
        form_data.append(key, formData[key]);
    }
    console.log(form_data);
    console.log(action)
    fetch(action, {
      method: 'POST',
      body: form_data,
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    .then(response => {
      console.log(response);
      if( response.ok ) {
        return response.text();
      } else {
        console.log('error');
        throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
      }
    })
    .then(data => {
      thisForm.querySelector('.loading').classList.add('d-block');
      console.log(data);
      if (data == 'ok') {
        console.log('click');
        setTimeout(() => {
          thisForm.querySelector('.loading').classList.remove('d-block');
          window.location.href = 'thank-you.html';  // Redirect after a delay
        }, 1000);
    
        // Optionally, reset the form after the delay
        setTimeout(() => {
          thisForm.reset();
        }, 3000);
      }
    })
    .catch((error) => {
      thisForm.querySelector('.loading').classList.remove('d-block');
      displayError(thisForm, error);
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();

