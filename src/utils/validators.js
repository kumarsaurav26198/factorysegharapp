export const validatePhoneNumber = (selectedCountryCode, numbers) => {
  let isValid = true;
  let errorMessage = '';

  if (selectedCountryCode !== '91') {
    isValid = false;
    errorMessage = 'Select Indian Number only';
  } else if (!numbers || numbers.length !== 10) {
    isValid = false;
    errorMessage = 'Enter a valid 10-digit phone number.';
  }

  return { isValid, errorMessage };
};

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