// conesole.log('Hello World!');


// Global Variables 
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const jobRoleSelect = document.getElementById('title');
const otherJobRoleInput = document.getElementById('other-job-role');
const designSelect = document.getElementById('design');
const colorSelect = document.getElementById('color');
const colorOptions = colorSelect.children;
const activitiesFieldset = document.querySelector('.activities');
const activitiesInputs = document.querySelectorAll('.activities input');
const activitiesCost = document.getElementById('activities-cost');

// Payment Info
const paymentSelect = document.getElementById('payment');
const creditCardDiv = document.getElementById('credit-card');
const creditCardInput = document.getElementById('cc-num');
const zipInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');

// Payment Select Options
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');
const form = document.querySelector('form');

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     console.log('Form Submitted');
// });

// Focus on Name Input
nameInput.focus();

// Hide Other Job Role Input
otherJobRoleInput.style.display = 'none';

// Show Other Job Role Input
jobRoleSelect.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobRoleInput.style.display = 'block';
    } else {
        otherJobRoleInput.style.display = 'none';
    }
});

// Disable Color Options
colorSelect.disabled = true;

// Update Color Options
designSelect.addEventListener('change', (e) => {
    colorSelect.disabled = false;
    for (let i = 0; i < colorOptions.length; i++) {
        const design = e.target.value;
        const dataTheme = colorOptions[i].getAttribute('data-theme');
        if (design === dataTheme) {
            colorOptions[i].hidden = false;
            colorOptions[i].selected = true;
        } else {
            colorOptions[i].hidden = true;
            colorOptions[i].selected = false;
        }
    }
});

// Activities Cost
let totalCost = 0;
activitiesFieldset.addEventListener('change', (e) => {
    const dataCost = +e.target.getAttribute('data-cost');
    if (e.target.checked) {
        totalCost += dataCost;
    } else {
        totalCost -= dataCost;
    }
    activitiesCost.innerHTML = `Total: $${totalCost}`;
});

// disable conflicting activities and grey out conflicting activities
activitiesFieldset.addEventListener('change', (e) => {
    const clicked = e.target;
    const clickedType = clicked.getAttribute('data-day-and-time');
    for (let i = 0; i < activitiesInputs.length; i++) {
        const input = activitiesInputs[i];
        const inputType = input.getAttribute('data-day-and-time');
        if (clickedType === inputType && clicked !== input) {
            if (clicked.checked) {
                input.disabled = true;
                input.parentElement.classList.add('disabled');
            } else {
                input.disabled = false;
                input.parentElement.classList.remove('disabled');
            }
        }
    }
});

// Payment Info

// Hide Paypal and Bitcoin Info
paypalDiv.style.display = 'none';
bitcoinDiv.style.display = 'none';


// Show Payment Info
paymentSelect.addEventListener('change', (e) => {
    if (e.target.value === 'paypal') {
        creditCardDiv.style.display = 'none';
        paypalDiv.style.display = 'block';
        bitcoinDiv.style.display = 'none';

    } else if (e.target.value === 'bitcoin') {
        creditCardDiv.style.display = 'none';
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'block';

    } else if (e.target.value === 'credit card') {
        creditCardDiv.style.display = 'block';
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'none';
    }

});

// Form Validation

// Name Validation
function nameValidation() {
    const nameValue = nameInput.value;
    const nameIsValid = /^[a-z]+ ?[a-z]*? ?[a-z]*?$/i.test(nameValue);
    return nameIsValid;
}


// Email Validation
function emailValidation() {
    const emailValue = emailInput.value;
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    return emailIsValid;
}

// Activities Validation
function activitiesValidation() {
    for (let i = 0; i < activitiesInputs.length; i++) {
        if (activitiesInputs[i].checked) {
            return isChecked = true;
        } else {
            return isChecked = false;
        }
    }
    return isChecked;
}

// Credit Card Validation
function creditCardValidation() {
    const creditCardValue = creditCardInput.value;
    const creditCardIsValid = /^\d{13,16}$/.test(creditCardValue);
    return creditCardIsValid;
}

// Zip Code Validation
function zipValidation() {
    const zipValue = zipInput.value;
    const zipIsValid = /^\d{5}$/.test(zipValue);
    return zipIsValid;
}

// CVV Validation
function cvvValidation() {
    const cvvValue = cvvInput.value;
    const cvvIsValid = /^\d{3}$/.test(cvvValue);
    return cvvIsValid;
}

// Form Validation
form.addEventListener('submit', (e) => {
    if (!nameValidation()) {
        e.preventDefault();
        nameInput.style.borderColor = 'red';
        // alert('Please enter a valid name');
    } else {
        nameInput.style.borderColor = 'initial';
    }
    if (!emailValidation()) {
        e.preventDefault();
        emailInput.style.borderColor = 'red';
        // alert('Please enter a valid email');
    } else {
        emailInput.style.borderColor = 'initial';
    }
    if (!activitiesValidation()) {
        e.preventDefault();
        activitiesFieldset.firstElementChild.style.borderColor = 'red';
        // alert('Please select at least one activity');
    } else {
        activitiesFieldset.style.borderColor = 'initial';
    }
    if (paymentSelect.value === 'credit card') {
        if (!creditCardValidation()) {
            e.preventDefault();
            creditCardInput.style.borderColor = 'red';
            // alert('Please enter a valid credit card number');
        } else {
            creditCardInput.style.borderColor = 'initial';
    
        }
        if (!zipValidation()) {
            e.preventDefault();
            zipInput.style.borderColor = 'red';
            // alert('Please enter a valid zip code');
        }
        else {
            zipInput.style.borderColor = 'initial';
        }
        if (!cvvValidation()) {
            e.preventDefault();
            cvvInput.style.borderColor = 'red';
            // alert('Please enter a valid CVV');
        }
        else {
            cvvInput.style.borderColor = 'initial';
        }
    }

});


form.addEventListener('submit', (e) => {
    console.log(`Name: ${nameInput.value}`);
    console.log(`Email: ${emailInput.value}`);
    console.log(`Job Role: ${jobRoleSelect.value}`);
    console.log(`T-Shirt Info: ${designSelect.value} ${colorSelect.value}`);
    console.log(`Register for Activities: ${totalCost}`);
    console.log(`Payment Info: ${paymentSelect.value}`);
}
);
