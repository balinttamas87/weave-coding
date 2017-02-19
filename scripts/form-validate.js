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

	var $brochureRequestForm = document.getElementById("brochure-requets-form");

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

	window.onload = function () {
  		$brochureRequestForm.setAttribute("novalidate", true);
  	};

















})();