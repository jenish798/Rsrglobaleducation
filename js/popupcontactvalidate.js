(function () {
    "use strict";
  
    let forms = document.querySelectorAll('.pop-form');
  
    forms.forEach( function(e) {
      e.addEventListener('submit', function(event) {
        event.preventDefault();
  
        let thisForm = this;
  
        let action = thisForm.getAttribute('action');
        let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
        
        if( ! action ) {
          displayError(thisForm, 'The form action property is not set!');
          return;
        }
        thisForm.querySelector('.loading').classList.add('d-block');
        thisForm.querySelector('.error-message').classList.remove('d-block');
        thisForm.querySelector('.sent-message').classList.remove('d-block');
  
        // let formData = new FormData( thisForm );
  
        var formData = {
          name1: document.getElementById('name1').value,
          email1: document.getElementById('email1').value,
          contact_number1: document.getElementById('contact_number1').value,
          qualification1: document.getElementById('qualification1').value,
          program1: document.getElementById('program1').value,
          destination1: document.getElementById('destination1').value,
          message1: document.getElementById('message1').value,
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