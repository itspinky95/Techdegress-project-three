// conesole.log('Hello World!');


// Global Variables 
const nameInput = document.getElementById('name');
const nameHint = document.getElementById('name-hint');
const emailInput = document.getElementById('email');
const emailHint = document.getElementById('email-hint');
const jobRoleSelect = document.getElementById('title');
const otherJobRoleInput = document.getElementById('other-job-role');
const designSelect = document.getElementById('design');
const colorSelect = document.getElementById('color');
const colorOptions = colorSelect.children;
const activitiesFieldset = document.querySelector('.activities');
const activitiesInputs = document.querySelectorAll('.activities input');
const activitiesCost = document.getElementById('activities-cost');
const activitiesHint = document.getElementById('activities-hint');

// Payment Info
const paymentSelect = document.getElementById('payment');
const creditCardDiv = document.getElementById('credit-card');
const creditCardInput = document.getElementById('cc-num');
const creditCardHint = document.getElementById('cc-hint');
const expMonthSelect = document.getElementById('exp-month');
const expYearSelect = document.getElementById('exp-year');
const zipInput = document.getElementById('zip');
const zipHint = document.getElementById('zip-hint');
const cvvInput = document.getElementById('cvv');
const cvvHint = document.getElementById('cvv-hint');


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

// Hide Payment Info till selected
creditCardDiv.style.display = 'none';
paypalDiv.style.display = 'none';
bitcoinDiv.style.display = 'none';


// Show Payment Info
paymentSelect.addEventListener('change', (e) => {
    if (e.target.value === 'credit-card') {
        creditCardDiv.style.display = 'block';
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'none';
    } else if (e.target.value === 'paypal') {
        creditCardDiv.style.display = 'none';
        paypalDiv.style.display = 'block';
        bitcoinDiv.style.display = 'none';
    } else if (e.target.value === 'bitcoin') {
        creditCardDiv.style.display = 'none';
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'block';
    }
});


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
            return true;
        }
    }
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

//form validation
form.addEventListener('submit', (e) => {
    if (!nameValidation()) {
        e.preventDefault();
        nameInput.parentElement.classList.add('not-valid');
        nameInput.parentElement.classList.remove('valid');
        nameHint.style.display = 'block';
    } else {
        nameInput.parentElement.classList.add('valid');
        nameInput.parentElement.classList.remove('not-valid');
        nameHint.style.display = 'none';

    }
    if (!emailValidation()) {
        e.preventDefault();
        emailInput.parentElement.classList.add('not-valid');
        emailInput.parentElement.classList.remove('valid');
        emailHint.style.display = 'block';

    } else {
        emailInput.parentElement.classList.add('valid');
        emailInput.parentElement.classList.remove('not-valid');
        emailHint.style.display = 'none';
    }
    if (!activitiesValidation()) {
        e.preventDefault();
        activitiesFieldset.classList.add('not-valid');
        activitiesFieldset.classList.remove('valid');
        activitiesHint.style.display = 'block';

    } else {
        activitiesFieldset.classList.add('valid');
        activitiesFieldset.classList.remove('not-valid');
        activitiesHint.style.display = 'none';
    }

    if (paymentSelect.value === 'credit-card') {
        if (!creditCardValidation()) {
            e.preventDefault();
            creditCardInput.parentElement.classList.add('not-valid');
            creditCardInput.parentElement.classList.remove('valid');
            creditCardHint.style.display = 'block';

        } else {
            creditCardInput.parentElement.classList.add('valid');
            creditCardInput.parentElement.classList.remove('not-valid');
            creditCardHint.style.display = 'none';
        }
        if (expMonthSelect.value === 'Select Date') {
            e.preventDefault();
            expMonthSelect.classList.add('not-valid');
        } 

        if (expYearSelect.value === 'Select Year') {
            e.preventDefault();
            expYearSelect.classList.add('not-valid');
        }

        if (!zipValidation()) {
            e.preventDefault();
            zipInput.parentElement.classList.add('not-valid');
            zipInput.parentElement.classList.remove('valid');
            zipHint.style.display = 'block';
        } else {
            zipInput.parentElement.classList.add('valid');
            zipInput.parentElement.classList.remove('not-valid');
            zipHint.style.display = 'none';
        }
        if (!cvvValidation()) {
            e.preventDefault();
            cvvInput.parentElement.classList.add('not-valid');
            cvvInput.parentElement.classList.remove('valid');
            cvvHint.style.display = 'block';
        } else {
            cvvInput.parentElement.classList.add('valid');
            cvvInput.parentElement.classList.remove('not-valid');
            cvvHint.style.display = 'none';
        }
    }
});


   
