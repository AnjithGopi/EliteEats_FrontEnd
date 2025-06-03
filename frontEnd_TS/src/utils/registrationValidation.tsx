export const validateFirstname = (firstname:string) => {
  if (!firstname) {
    return "Firstname required";
  }

  if (firstname[0].toLowerCase() === firstname[0]) {
    return "Firstname should start with UpperCase";
  }

  if (firstname.includes(" ")) {
    return "Firstname should not contain empty spaces";
  }

  if (firstname.startsWith(" ")) return "Firstname cannot start with space";

  return "";
};

export const validateLastname = (lastname:string) => {
  if (!lastname) {
    return "Lastname required";
  }

  if (lastname[0].toLowerCase() === lastname[0]) {
    return "Last name should start with UpperCase";
  }

  if (lastname.includes(" ")) {
    return "Lastname should not contain empty spaces";
  }

  if (lastname.startsWith(" ")) return "Last name cannot start with space";

  return "";
};

export const validateEmail = (email:string) => {
  if (!email) {
    return "Email is required";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Please enter a valid email";
  }

  if (email.includes(" ")) {
    return "Please enter a valid email";
  }
  return "";
};

export const validateMobile = (mobile:string) => {
  if (!mobile) {
    return "Phone number is required";
  }
  if (mobile.length !== 10) {
    return "Phone number should contain  10 digits";
  }

  if (mobile.includes(" ")) {
    return "Enter a valid phone number";
  }
  return "";
};

export const validatePassword = (password:string) => {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return "Password must contain at least one special character";
  }

  if (password.includes(" ")) {
    return "Password should not contain empty spaces";
  }
  return "";
};

export const validateConfirmPassword = (password:string, confirmPass:string) => {
  if (!confirmPass) {
    return "Please confirm your password";
  }
  if (password !== confirmPass) {
    return "Passwords do not match";
  }
  return "";
};


export const validateOtp=(otp:string)=>{

  if(!otp){

    return "Enter OTP"
  }

  if(otp.length!==4){
    return "Otp should contain only 4 digits"
  }

  if(otp.includes(" ")){
    return "Otp should not contain empty spaces"
  }

  return ""
}