const validateLoginForm = (email:string, password:string) => {
  if (!email || !password) {
    return "Please Fill in all fields";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Please enter a valid email";
  }

  if (password.length < 8) {
    return "Password should contain atleast 8 characters";
  }

  return "";
};

export default validateLoginForm;
