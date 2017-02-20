"use strict";

(function () { // IIFE to avoid not to mess up the global namespace

	//------------------------------------------------------
	//-------INITIAL VALUES & NECCESSARY ASSIGNMENTS--------
	//------------------------------------------------------
	
	var $brochureRequestFirstName = document.getElementById("first-name");
	var $brochureRequestLastName = document.getElementById("last-name");
	var $brochureRequestDOBDay = document.getElementById("dob-day");
	var $brochureRequestDOBMonth = document.getElementById("dob-month");
	var $brochureRequestYear = document.getElementById("dob-year");
	var $brochureRequestEmail = document.getElementById("email");
	var $brochureRequestEmailConfirm = document.getElementById("confirm-email");

	var $brochureRequestForm = document.getElementById("brochure-request-form");
	var $brochureRequestFormMessage = document.getElementById("form-message");
	var $brochureRequestSubmit = document.getElementById("btn-submit");

	var inputs = {
  		firstName: $brochureRequestFirstName,
  		lastName: $brochureRequestLastName,
  		dobDay: $brochureRequestDOBDay,
  		dobMonth: $brochureRequestDOBMonth,
  		dobYear: $brochureRequestYear,
  		email: $brochureRequestEmail,
  		emailConfirm: $brochureRequestEmailConfirm
	};

	var validationRegExp = {
		name: /^[a-zA-Z ]*$/,
		email: /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm
	};

	var formMessages = {
		error: "Failed to submit request. Please try again later.",
		success: "Success! You should receive an email shortly."
	};

	//------------------------------------------------------
	//-------------FUNCTIONS TO VALIDATE INPUTS-------------
	//------------------------------------------------------

	function validateRequired (input) {
  		if (input.required && input.value === "") {
    		return false;
  		}
  		else {
    		return true;
  		}
	}

	function validateInput (regexp, input) {
  		if (validateRequired(input)) {
    		return regexp.test(input.value);
  		}
	}

	function validateName (input) {
		return validateInput(validationRegExp.name, input);
	}

	function validateEmail (input) {
		return validateInput(validationRegExp.email, input);
	}

	function validateEmailConfirm (inputs) {
		return inputs.email.value === inputs.emailConfirm.value;
	}

  	function validateDOB (inputs) {
  		if (
    		validateRequired(inputs.dobYear) &&
    		validateRequired(inputs.dobMonth) &&
    		validateRequired(inputs.dobDay)
		)	{
			return moment(
				inputs.dobYear.value + "-" + inputs.dobMonth.value + "-" + inputs.dobDay.value, "YYYY-MM-DD"
			).isValid();
		}
	}

	function displayErrors(inputs, validated) {
		var errors = false;
		Object.keys(validated).forEach(function (key) {
			if (!validated[key]) {
				errors = true;
				inputs[key].className += " form-error";
			}
		});
		return errors;
	}

	function getValues (inputs) {
		var values = {};
		Object.keys(inputs).forEach(function (key) {
			values[key] = inputs[key].value;
			});
			return values;
	}

	function send ($message, messages, inputs) {
		$message.className += " success";
		$message.innerHTML = messages.success;
	}

	Object.keys(inputs).forEach(function (key) {
		inputs[key].addEventListener("keydown", function (event) {
			inputs[key].className = this.className.replace(" form-error", "");
		});
		inputs[key].addEventListener("click", function (event) {
			inputs[key].className = this.className.replace(" form-error", "");
		});
	});

	window.onload = function () {
		$brochureRequestForm.setAttribute("novalidate", true);

		$brochureRequestForm.addEventListener("submit", function (event) {
			event.preventDefault();

			$brochureRequestSubmit.setAttribute("disabled", true);

			// empty the error message element's html
			$brochureRequestFormMessage.innerHTML = "";
			$brochureRequestFormMessage.className = $brochureRequestFormMessage
				.className.replace(" success", "");

			var isDOBValid = validateDOB(inputs); 

			var isValid = {
				firstName: validateName(inputs.firstName),
				lastName: validateName(inputs.lastName),
				dobDay: isDOBValid,
				dobMonth: isDOBValid,
				dobYear: isDOBValid,
				email: validateEmail(inputs.email),
				emailConfirm: validateEmailConfirm(inputs)
			};

			var errors = displayErrors(/* inputContainers, */ inputs, /* inputErrors, */ isValid);

			if (!errors) {
				send($brochureRequestFormMessage, formMessages, getValues(inputs));
			}

			$brochureRequestSubmit.setAttribute("disabled", false);
		});
	};















})();