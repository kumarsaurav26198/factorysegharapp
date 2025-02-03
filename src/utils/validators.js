export const validatePhoneNumber = (selectedCountryCode, numbers) => {
  if (!selectedCountryCode) {
    return { isValid: false, errorMessage: 'Please select a country.' };
  }

  const countryRules = {
    '91': { min: 10, max: 10, message: 'Enter a valid 10-digit phone number for India.' },
    '1': { min: 10, max: 10, message: 'Enter a valid 10-digit phone number for the USA.' },
    '44': { min: 10, max: 11, message: 'Enter a valid UK phone number (10-11 digits).' },
    '61': { min: 9, max: 9, message: 'Enter a valid 9-digit phone number for Australia.' },
    '81': { min: 10, max: 11, message: 'Enter a valid Japanese phone number (10-11 digits).' },
  };

  if (!countryRules[selectedCountryCode]) {
    return { isValid: false, errorMessage: 'Unsupported country code.' };
  }

  const { min, max, message } = countryRules[selectedCountryCode];
  const numberLength = numbers ? numbers.length : 0;

  if (numberLength < min || numberLength > max) {
    return { isValid: false, errorMessage: message };
  }

  return { isValid: true, errorMessage: '' };
};


export const addressValidiadtion=(formData)=>{
  let isValid = true;
  let errorMessage = '';

  if (!formData.name || formData.name.trim().length < 3) {
    isValid = false;
    errorMessage = 'Name is required.';
  } else if (!formData.addressLine1 || formData.addressLine1.trim().length === 0) {
    isValid = false;
    errorMessage = 'Address  is required.';
  } else if (!formData.addressLine2 || formData.addressLine1.trim().length === 0) {
    isValid = false;
    errorMessage = 'Land mark  is required.';
  } else if (!formData.city || formData.city.trim().length === 0) {
    isValid = false;
    errorMessage = 'City is required.';
  } else if (!formData.state || formData.state.trim().length === 0) {
    isValid = false;
    errorMessage = 'State is required.';
  } else if (!formData.zipCode || !/^\d{5,6}$/.test(formData.zipCode)) {
    isValid = false;
    errorMessage = 'Enter a valid 5-6 digit ZIP code.';
  } else if (!formData.country || formData.country.trim().length === 0) {
    isValid = false;
    errorMessage = 'Country is required.';
  }

  // Phone number validation
  const phoneValidation = validatePhoneNumber(
    formData.selectedCountryCode,
    formData.numbers
  );
  if (!phoneValidation.isValid) {
    isValid = false;
    errorMessage = phoneValidation.errorMessage;
  }

  return { isValid, errorMessage };


}

export const validateLogin = (email, password) => {
  let isValid = true;
  let errorMessage = '';

  // Check if email is provided
  if (!email || email.trim().length === 0) {
    isValid = false;
    errorMessage = 'Email is required.';
  } 
  // Validate email format
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    isValid = false;
    errorMessage = 'Enter a valid email address.';
  } 
  // Check if password is provided
  else if (!password || password.trim().length === 0) {
    isValid = false;
    errorMessage = 'Password is required.';
  } 
  // Ensure password meets minimum length
  else if (password.length < 6) {
    isValid = false;
    errorMessage = 'Password must be at least 6 characters long.';
  }

  return { isValid, errorMessage };
};


export const validateOtp = (inputOtp) => {
  let isValid = true;
  let errorMessage = '';

  if (!inputOtp || inputOtp.length !== 4) {
    isValid = false;
    errorMessage = 'Enter a valid 4-digit OTP.';
  }

  return { isValid, errorMessage };
};

export const validateNameAndCity = (name, selectedCity) => {
  let isValid = true;
  let errorMessage = '';

  // Validate Name
  if (!name || name.trim().length === 0) {
    isValid = false;
    errorMessage = 'Name is required.';
  } else if (name.length < 3) {
    isValid = false;
    errorMessage = 'Name should be at least 3 characters long.';
  }

  // Validate City
  // if (isValid) {  // Continue validation only if name is valid
  //   if (!selectedCity || selectedCity.trim().length === 0) {
  //     isValid = false;
  //     errorMessage = 'City is required.';
  //   }
  // }

  return { isValid, errorMessage };
};

export const validateRegistration = (name, email, mobile, refCode = '') => {
  let isValid = true;
  let errorMessage = '';

  if (!name || name.trim().length === 0) {
    isValid = false;
    errorMessage = 'Name is required.';
  } else if (name.length < 3) {
    isValid = false;
    errorMessage = 'Name should be at least 3 characters long.';
  }

  if (isValid) { // Continue validation only if name is valid
    if (!email || email.trim().length === 0) {
      isValid = false;
      errorMessage = 'Email is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        isValid = false;
        errorMessage = 'Invalid email address.';
      }
    }
  }

  if (isValid) {
    if (mobile.length < 6) {
      isValid = false;
      errorMessage = 'Invalid mobile number.';
    }
  }

  if (isValid && refCode) { 
    if (refCode.length < 6) {
      isValid = false;
      errorMessage = 'Referral code should be at least 6 characters long.';
    }
  }

  return { isValid, errorMessage };
};



export const validateEmail = (email) => {
  let isValid = true;
  let errorMessage = '';

  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || email.length === 0) {
    isValid = false;
    errorMessage = 'Email is required.';
  } else if (!emailRegex.test(email)) {
    isValid = false;
    errorMessage = 'Enter a valid email address.';
  }

  return { isValid, errorMessage };
};

export const capitalizeFirstLetter = (name) => {
  if (!name) return ''; // Return empty string if name is not provided
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

export const formatDateTime = (isoString) => {
  if (!isoString) return '';

  const date = new Date(isoString);

  // Extract date components
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  // Extract time components
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  return `${day}-${month}-${year}, ${hours}:${minutes} ${ampm}`;
};
