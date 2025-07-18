// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return 'Email is required';
  }
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return '';
};

// Password validation
export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  // if (!/(?=.*[a-z])/.test(password)) {
  //   return 'Password must contain at least one lowercase letter';
  // }
  // if (!/(?=.*[A-Z])/.test(password)) {
  //   return 'Password must contain at least one uppercase letter';
  // }
  // if (!/(?=.*\d)/.test(password)) {
  //   return 'Password must contain at least one number';
  // }
  return '';
};

// Confirm password validation
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return '';
};

// Full name validation
export const validateFullName = (fullName) => {
  if (!fullName) {
    return 'Full name is required';
  }
  if (fullName.trim().length < 2) {
    return 'Full name must be at least 2 characters long';
  }
  // if (!/^[a-zA-Z\s]+$/.test(fullName)) {
  //   return 'Full name can only contain letters and spaces';
  // }
  return '';
};

// General form validation
export const validateForm = (formData, fields) => {
  const errors = {};
  
  fields.forEach(field => {
    switch (field) {
      case 'email':
        errors.email = validateEmail(formData.email);
        break;
      case 'password':
        errors.password = validatePassword(formData.password);
        break;
      case 'confirmPassword':
        errors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);
        break;
      case 'fullName':
        errors.fullName = validateFullName(formData.fullName);
        break;
      default:
        break;
    }
  });
  
  // Remove empty error messages
  Object.keys(errors).forEach(key => {
    if (!errors[key]) {
      delete errors[key];
    }
  });
  
  return errors;
};
